import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Tribute from "@/pages/Tribute";
import Integrity from "@/pages/Integrity";
import Rituals from "@/pages/Rituals";
import Reflexologist from "@/pages/Reflexologist";
import Forensic from "@/pages/Forensic";
import Resilience from "@/pages/Resilience";
import Settings from "@/pages/Settings";
import Mirrors from "@/pages/Mirrors";
import Sidebar from "@/components/layout/Sidebar";

function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar currentPath={location} />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/tribute" component={Tribute} />
          <Route path="/integrity" component={Integrity} />
          <Route path="/rituals" component={Rituals} />
          <Route path="/reflexologist" component={Reflexologist} />
          <Route path="/forensic" component={Forensic} />
          <Route path="/resilience" component={Resilience} />
          <Route path="/settings" component={Settings} />
          <Route path="/mirrors" component={Mirrors} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="flow-land-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
