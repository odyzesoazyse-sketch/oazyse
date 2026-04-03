import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";

// Eagerly loaded — critical path
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazily loaded — public info pages
const MethodPage = lazy(() => import('./pages/MethodPage'));
const PhilosophyPage = lazy(() => import('./pages/PhilosophyPage'));
const AboutFounderPage = lazy(() => import('./pages/AboutFounderPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const JoinPage = lazy(() => import('./pages/JoinPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const InstitutePage = lazy(() => import('./pages/InstitutePage'));
const OazysePage = lazy(() => import('./pages/OazysePage'));
const MetahumanPage = lazy(() => import('./pages/MetahumanPage'));
const ProtectedHome = lazy(() => import('./pages/ProtectedHome'));
const Admin = lazy(() => import('./pages/Admin'));
const SessionPage = lazy(() => import('./pages/SessionPage'));

// Lazily loaded — member area
const MemberDashboard = lazy(() => import('./pages/member/MemberDashboard'));
const MemberHome = lazy(() => import('./pages/member/MemberHome'));
const MemberLessons = lazy(() => import('./pages/member/MemberLessons'));
const MemberSessions = lazy(() => import('./pages/member/MemberSessions'));
const MemberCertification = lazy(() => import('./pages/member/MemberCertification'));
const MemberStats = lazy(() => import('./pages/member/MemberStats'));
const MemberProfile = lazy(() => import('./pages/member/MemberProfile'));
const MemberOasisRating = lazy(() => import('./pages/member/MemberOasisRating'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/method" element={<MethodPage />} />
                <Route path="/philosophy" element={<PhilosophyPage />} />
                <Route path="/about" element={<AboutFounderPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/institute" element={<InstitutePage />} />
                <Route path="/oazyse" element={<OazysePage />} />
                <Route path="/metahuman" element={<MetahumanPage />} />
                <Route path="/home" element={<ProtectedHome />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/session" element={<SessionPage />} />
                <Route path="/member" element={<MemberDashboard />}>
                  <Route index element={<MemberHome />} />
                  <Route path="lessons" element={<MemberLessons />} />
                  <Route path="sessions" element={<MemberSessions />} />
                  <Route path="certification" element={<MemberCertification />} />
                  <Route path="stats" element={<MemberStats />} />
                  <Route path="profile" element={<MemberProfile />} />
                  <Route path="oasis-rating" element={<MemberOasisRating />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
