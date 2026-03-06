import { Suspense, lazy } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const Account = lazy(() => import("./pages/Account"));
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const WhoWeHelp = lazy(() => import("./pages/WhoWeHelp"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const AIDT = lazy(() => import("./pages/AIDT"));
const AIDTResults = lazy(() => import("./pages/AIDTResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  const [location] = useLocation();
  const isAuthRoute =
    location === "/auth" ||
    location.startsWith("/auth/") ||
    location === "/account" ||
    location.startsWith("/account/");

  return (
    <div className="min-h-screen bg-[#0F0F10] flex flex-col">
      {!isAuthRoute && <Navigation />}
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#A7A7A9]">
              Loading...
            </div>
          }
        >
          <Switch>
            <Route path="/auth">{() => <Auth />}</Route>
            <Route path="/auth/:path">{params => <Auth path={params.path} />}</Route>
            <Route path="/account">{() => <Account />}</Route>
            <Route path="/account/:path">
              {params => <Account path={params.path} />}
            </Route>
            <Route path="/">{() => <Home />}</Route>
            <Route path="/services">{() => <Services />}</Route>
            <Route path="/services/half-day">{() => <ServiceDetail />}</Route>
            <Route path="/services/weekend-camps">{() => <ServiceDetail />}</Route>
            <Route path="/services/workshops">{() => <ServiceDetail />}</Route>
            <Route path="/about">{() => <About />}</Route>
            <Route path="/who-we-help">{() => <WhoWeHelp />}</Route>
            <Route path="/pricing">{() => <Pricing />}</Route>
            <Route path="/testimonials">{() => <Testimonials />}</Route>
            <Route path="/faq">{() => <FAQ />}</Route>
            <Route path="/contact">{() => <Contact />}</Route>
            <Route path="/aidt">{() => <AIDT />}</Route>
            <Route path="/aidt/results">{() => <AIDTResults />}</Route>
            <Route path="/404">{() => <NotFound />}</Route>
            <Route>{() => <NotFound />}</Route>
          </Switch>
        </Suspense>
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
