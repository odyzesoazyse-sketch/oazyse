import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ProtectedHome from "./pages/ProtectedHome";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import OazysePage from "./pages/OazysePage";
import InstitutePage from "./pages/InstitutePage";
import MetahumanPage from "./pages/MetahumanPage";
import AboutFounderPage from "./pages/AboutFounderPage";
import MethodPage from "./pages/MethodPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import ProjectsPage from "./pages/ProjectsPage";
import JoinPage from "./pages/JoinPage";
import GlossaryPage from "./pages/GlossaryPage";
import NotFound from "./pages/NotFound";
import TestLanding from "./pages/TestLanding";
import MemberDashboard from "./pages/member/MemberDashboard";
import MemberHome from "./pages/member/MemberHome";
import MemberLessons from "./pages/member/MemberLessons";
import MemberSessions from "./pages/member/MemberSessions";
import MemberCertification from "./pages/member/MemberCertification";
import MemberStats from "./pages/member/MemberStats";
import MemberProfile from "./pages/member/MemberProfile";
import MemberOasisRating from "./pages/member/MemberOasisRating";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<ProtectedHome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/oazyse" element={<OazysePage />} />
              <Route path="/institute" element={<InstitutePage />} />
              <Route path="/metahuman" element={<MetahumanPage />} />
              <Route path="/about" element={<AboutFounderPage />} />
              <Route path="/method" element={<MethodPage />} />
              <Route path="/philosophy" element={<PhilosophyPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/member" element={<MemberDashboard />}>
                <Route index element={<MemberHome />} />
                <Route path="lessons" element={<MemberLessons />} />
                <Route path="sessions" element={<MemberSessions />} />
                <Route path="certification" element={<MemberCertification />} />
                <Route path="stats" element={<MemberStats />} />
                <Route path="profile" element={<MemberProfile />} />
                <Route path="oasis-rating" element={<MemberOasisRating />} />
              </Route>
              <Route path="/landing" element={<TestLanding />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
