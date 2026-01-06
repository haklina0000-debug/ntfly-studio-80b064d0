import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { GuestGuard } from "@/components/guards/GuestGuard";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Builder from "./pages/Builder";
import Templates from "./pages/Templates";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/templates" element={<Templates />} />
              
              {/* Guest Only Routes */}
              <Route 
                path="/auth" 
                element={
                  <GuestGuard>
                    <Auth />
                  </GuestGuard>
                } 
              />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/builder" 
                element={
                  <AuthGuard>
                    <Builder />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/preview/:projectId" 
                element={
                  <AuthGuard>
                    <Preview />
                  </AuthGuard>
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <AuthGuard requireAdmin>
                    <AdminDashboard />
                  </AuthGuard>
                } 
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
