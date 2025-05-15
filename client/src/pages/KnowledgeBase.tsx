import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTooltip } from "@/components/TooltipContext";
import HelpTooltip from "@/components/ui/HelpTooltip";

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [helpActive, setHelpActive] = useState(true);
  
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: "kb-1",
      title: "Tribute Management Overview",
      description: "Learn how to effectively manage your tribute flows",
      category: "tribute",
      tags: ["tribute", "monetization", "flow"],
      content: `
        <h3>Understanding Tribute Management</h3>
        <p>Tribute Management allows you to control how resources and operations are tracked and monetized in your domain.</p>
        
        <h4>Available Tribute Modes:</h4>
        <ul>
          <li><strong>Symbolic Credits:</strong> Track operations without actual monetary value. Best for metrics and analysis.</li>
          <li><strong>Donation Mode:</strong> Allow users to contribute voluntarily based on value received.</li>
          <li><strong>Royalty Model:</strong> Automatically calculate percentages based on resource usage.</li>
          <li><strong>Friction Credits:</strong> Apply small costs to high-volume operations to optimize resource allocation.</li>
        </ul>
        
        <p>To change your tribute mode, visit the Tribute Management page and select from the available options. Each mode's efficiency depends on your domain's specific flow patterns and usage characteristics.</p>
      `
    },
    {
      id: "kb-2",
      title: "Running Monetization Strategy Analysis",
      description: "How to conduct an effective monetization analysis",
      category: "monetization",
      tags: ["monetization", "analysis", "strategy"],
      content: `
        <h3>Monetization Strategy Analysis Guide</h3>
        <p>The Strategy Analysis tool helps you determine the optimal tribute mode based on actual usage data and domain patterns.</p>
        
        <h4>When to Run an Analysis:</h4>
        <ul>
          <li>After significant changes to your flow patterns</li>
          <li>When resource usage profiles have shifted</li>
          <li>When considering a monetization strategy change</li>
          <li>At regular intervals (recommended: monthly)</li>
        </ul>
        
        <h4>Analysis Configuration:</h4>
        <p>For best results, analyze at least 7 days of data. Include all available data types in your analysis for the most accurate recommendations.</p>
        
        <p>The analysis engine examines flow patterns, resource usage distribution, and operation frequency to suggest the most efficient tribute mode for your specific context.</p>
      `
    },
    {
      id: "kb-3",
      title: "Interpreting Integrity Monitor Reports",
      description: "Understanding your domain integrity scores and metrics",
      category: "integrity",
      tags: ["integrity", "security", "monitoring"],
      content: `
        <h3>Integrity Monitor Explained</h3>
        <p>The Integrity Monitor ensures your domain's operations maintain sovereignty and data control across all flows.</p>
        
        <h4>Key Metrics:</h4>
        <ul>
          <li><strong>Integrity Score:</strong> Overall assessment of domain health (0-100)</li>
          <li><strong>System Integrity:</strong> Measures core system stability and resilience</li>
          <li><strong>Data Sovereignty:</strong> Evaluates control over data flows and storage</li>
          <li><strong>Resource Security:</strong> Assesses protection of computational resources</li>
          <li><strong>Access Control:</strong> Measures effectiveness of authorization systems</li>
        </ul>
        
        <p>Regular integrity checks (recommended weekly) help identify potential issues before they impact operations. A score below 90 requires attention to the specific area showing reduced performance.</p>
      `
    },
    {
      id: "kb-4",
      title: "Dashboard Visualization Guide",
      description: "How to interpret dashboard metrics and visuals",
      category: "dashboard",
      tags: ["dashboard", "metrics", "visualization"],
      content: `
        <h3>Understanding Your Dashboard</h3>
        <p>The Dashboard provides a real-time overview of your domain's performance, tribute collection, and integrity status.</p>
        
        <h4>Dashboard Components:</h4>
        <ul>
          <li><strong>Status Cards:</strong> Quick view of critical domain metrics and states</li>
          <li><strong>Activity Timeline:</strong> Recent operations and notable events</li>
          <li><strong>Resource Usage Graph:</strong> Visualizes computational resource allocation over time</li>
          <li><strong>Tribute Accumulation:</strong> Tracks credits accrued under the current tribute mode</li>
        </ul>
        
        <p>The pulse indicators show real-time activity - green for normal operations, yellow for elevated usage, and red for potential issues requiring attention.</p>
        
        <p>For detailed analysis, click on any metric to view expanded historical data and trend information.</p>
      `
    },
    {
      id: "kb-5",
      title: "Agent Configuration Best Practices",
      description: "How to optimize your domain management agents",
      category: "agents",
      tags: ["agents", "automation", "configuration"],
      content: `
        <h3>Working with Flow Land Agents</h3>
        <p>Domain management agents automate key processes and provide specialized services within your flow management system.</p>
        
        <h4>Available Agents:</h4>
        <ul>
          <li><strong>Integrity Watcher:</strong> Monitors domain health and performs security checks</li>
          <li><strong>LLM Reflexologist:</strong> Provides natural language analysis of flow patterns</li>
          <li><strong>Forensic Relay:</strong> Captures detailed operation logs for audit trails</li>
          <li><strong>Resilience Agent:</strong> Maintains system stability during high-load periods</li>
        </ul>
        
        <p>Agent states include: Active (currently running), Dormant (configured but not running), and Inactive (requires setup).</p>
        
        <p>For optimal performance, only activate the agents you need for current operations. Each agent consumes computational resources proportional to its complexity.</p>
      `
    }
  ];
  
  const filteredItems = knowledgeItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground">Learn how to optimize your Flow Land experience</p>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={helpActive ? "default" : "outline"} 
                size="sm"
                onClick={() => setHelpActive(!helpActive)}
                className="flex items-center gap-2"
              >
                <i className="fas fa-question-circle"></i>
                <span>Tooltips {helpActive ? 'Enabled' : 'Disabled'}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="max-w-xs">Toggle contextual tooltips throughout the application to learn about features</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Search Knowledge Base</CardTitle>
          <CardDescription>Find guidance, tips and best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <Input 
              className="pl-10" 
              placeholder="Search by keyword, topic or tag..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Topics</TabsTrigger>
          <TabsTrigger value="tribute">Tribute Management</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="integrity">Integrity</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(item => (
              <KnowledgeCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        
        {["tribute", "monetization", "integrity", "agents", "dashboard"].map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems
                .filter(item => item.category === category)
                .map(item => (
                  <KnowledgeCard key={item.id} item={item} />
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Contextual Help System</CardTitle>
          <CardDescription>
            The Knowledge Base integrates with the entire application to provide context-aware guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <p>
              With tooltips enabled, you'll see helpful information icons <i className="fas fa-info-circle text-blue-500"></i> throughout
              the application. Hover over these icons for quick guidance on specific features.
            </p>
            
            <div className="flex items-center gap-2 bg-muted p-4 rounded-lg">
              <i className="fas fa-lightbulb text-yellow-500 text-xl"></i>
              <div>
                <p className="font-medium">Pro Tip:</p>
                <p className="text-sm text-muted-foreground">
                  Visit the Knowledge Base regularly as new content is added based on system updates and common user questions.
                </p>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Can't find what you're looking for?</p>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                <span>Contact Support</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KnowledgeCard({ item }: { item: KnowledgeItem }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {expanded ? (
          <ScrollArea className="h-56">
            <div dangerouslySetInnerHTML={{ __html: item.content }} className="prose prose-sm max-w-none dark:prose-invert" />
          </ScrollArea>
        ) : (
          <div className="text-sm text-muted-foreground">
            Click to view detailed information about {item.title.toLowerCase()}.
          </div>
        )}
      </CardContent>
      <div className="p-4 pt-0">
        <div className="flex gap-2 mb-3 flex-wrap">
          {item.tags.map(tag => (
            <span key={tag} className="bg-muted text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'View Details'}
        </Button>
      </div>
    </Card>
  );
}