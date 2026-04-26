import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const InstitutePage = lazy(() => import('./pages/InstitutePage'));
const Admin = lazy(() => import('./pages/Admin'));
const SessionPage = lazy(() => import('./pages/SessionPage'));

// Lazily loaded — member area
const MemberDashboard = lazy(() => import('./pages/member/MemberDashboard'));
const MemberHome = lazy(() => import('./pages/member/MemberHome'));
const MemberSessions = lazy(() => import('./pages/member/MemberSessions'));
const MemberProfile = lazy(() => import('./pages/member/MemberProfile'));

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
                <Route path="/news" element={<NewsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/join" element={<Navigate to="/auth" replace />} />
                <Route path="/glossary" element={<Navigate to="/method" replace />} />
                <Route path="/institute" element={<InstitutePage />} />
                <Route path="/oazyse" element={<Navigate to="/" replace />} />
                <Route path="/metahuman" element={<Navigate to="/session" replace />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/session" element={<SessionPage />} />
                <Route path="/member" element={<MemberDashboard />}>
                  <Route index element={<MemberHome />} />
                  <Route path="sessions" element={<MemberSessions />} />
                  <Route path="profile" element={<MemberProfile />} />
                  <Route path="lessons" element={<Navigate to="/member" replace />} />
                  <Route path="certification" element={<Navigate to="/member" replace />} />
                  <Route path="stats" element={<Navigate to="/member" replace />} />
                  <Route path="oasis-rating" element={<Navigate to="/member" replace />} />
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
