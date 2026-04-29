import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Business = lazy(() => import("./pages/Business"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Donation = lazy(() => import("./pages/Donation"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const FinancialReport = lazy(() => import("./pages/FinancialReport"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Location = lazy(() => import("./pages/Location"));
const CopyrightPage = lazy(() => import("./pages/Copyright"));
const EmailRefusal = lazy(() => import("./pages/EmailRefusal"));
const Stone = lazy(() => import("./pages/Stone"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/business" element={<Business />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/financial-report" element={<FinancialReport />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/location" element={<Location />} />
                <Route path="/copyright" element={<CopyrightPage />} />
                <Route path="/email-refusal" element={<EmailRefusal />} />
                <Route path="/stone" element={<Stone />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
