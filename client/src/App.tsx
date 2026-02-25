import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import WhoWeHelp from "./pages/WhoWeHelp";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import AIDT from "./pages/AIDT";
import AIDTResults from "./pages/AIDTResults";

function Router() {
  return (
    <div className="min-h-screen bg-[#0F0F10] flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/services/half-day" component={ServiceDetail} />
          <Route path="/services/weekend-camps" component={ServiceDetail} />
          <Route path="/services/workshops" component={ServiceDetail} />
          <Route path="/about" component={About} />
          <Route path="/who-we-help" component={WhoWeHelp} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/aidt" component={AIDT} />
          <Route path="/aidt/results" component={AIDTResults} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
