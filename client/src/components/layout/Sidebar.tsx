import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

type MenuItem = {
  path: string;
  label: string;
  icon: string;
  status?: {
    label: string;
    color: string;
  };
};

type MenuCategory = {
  category: string;
  items: MenuItem[];
};

type SidebarProps = {
  currentPath: string;
};

export default function Sidebar({ currentPath }: SidebarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuItems: MenuCategory[] = [
    { 
      category: "Control Center", 
      items: [
        { path: "/", label: "Dashboard", icon: "fa-tachometer-alt" },
        { path: "/tribute", label: "Tribute Management", icon: "fa-hand-holding-usd" },
        { path: "/integrity", label: "Integrity Monitor", icon: "fa-shield-virus" },
        { path: "/rituals", label: "Monetization Rituals", icon: "fa-sync" },
      ]
    },
    {
      category: "Agents",
      items: [
        { 
          path: "/reflexologist", 
          label: "LLM Reflexologist", 
          icon: "fa-brain",
          status: { label: "Dormant", color: "gray" } 
        },
        { 
          path: "/forensic", 
          label: "Forensic Relay", 
          icon: "fa-microscope",
          status: { label: "Inactive", color: "gray" } 
        },
        { 
          path: "/resilience", 
          label: "Resilience Agent", 
          icon: "fa-heartbeat",
          status: { label: "Active", color: "green" } 
        },
      ]
    },
    {
      category: "System",
      items: [
        { path: "/settings", label: "Settings", icon: "fa-cog" },
        { path: "/mirrors", label: "Account Mirrors", icon: "fa-sync-alt" },
      ]
    }
  ];

  return (
    <aside className="w-full md:w-64 bg-sidebar dark:bg-sidebar shadow-lg dark:shadow-none md:h-screen md:sticky md:top-0 text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-sidebar-primary rounded-lg p-1.5 text-sidebar-primary-foreground">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h1 className="text-xl font-bold">Flow Land</h1>
        </div>
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-sidebar-border"
          >
            <i className="fas fa-bars"></i>
          </Button>
        </div>
      </div>
      
      <nav id="sidebarMenu" className={`p-4 space-y-6 ${showMobileMenu ? 'block' : 'hidden md:block'}`}>
        {menuItems.map((category) => (
          <div key={category.category}>
            <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 font-semibold">
              {category.category}
            </p>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className={`flex items-center justify-between p-2 rounded-md ${
                      currentPath === item.path 
                        ? "bg-sidebar-primary/10 dark:bg-sidebar-primary/20 text-sidebar-primary dark:text-sidebar-primary-foreground font-medium" 
                        : "hover:bg-gray-100 dark:hover:bg-sidebar-border/10"
                    }`}>
                    <div className="flex items-center space-x-2">
                      <i className={`fas ${item.icon} w-5 text-center`}></i>
                      <span>{item.label}</span>
                    </div>
                    {item.status && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status.color === 'green' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {item.status.label}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      
      <div className="p-4 mt-auto border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse"></div>
            <span className="text-sm">Local Mode Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-sidebar-border/10"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-sidebar-border/10"
            >
              <i className="fas fa-power-off text-red-500"></i>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
