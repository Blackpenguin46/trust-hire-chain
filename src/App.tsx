import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import ForJobSeekers from "./pages/ForJobSeekers";
import ForEmployers from "./pages/ForEmployers";
import VerifyCredentials from "./pages/VerifyCredentials";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import { PostJob } from './pages/PostJob';
import { Jobs } from './pages/Jobs';
import { EmployerJobs } from './pages/EmployerJobs';
import { JobDetails } from './pages/JobDetails';
import { EmployerApplications } from './pages/EmployerApplications';

const queryClient = new QueryClient();

export default function App() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/for-job-seekers" element={<ForJobSeekers />} />
                <Route path="/for-employers" element={<ForEmployers />} />
                <Route path="/verify-credentials" element={<VerifyCredentials />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                {/* Protected routes */}
                <Route
                  path="/dashboard/seeker"
                  element={
                    <ProtectedRoute requiredRole="job_seeker">
                      <JobSeekerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/employer"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <EmployerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/post-job"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <PostJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <EmployerJobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/applications"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <EmployerApplications />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </main>
  );
}
