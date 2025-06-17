import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import HowItWorks from "./pages/HowItWorks";
import ForJobSeekers from "./pages/ForJobSeekers";
import ForEmployers from "./pages/ForEmployers";
import VerifyCredentials from "./pages/VerifyCredentials";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
                <Route path="/" element={
                  <>
                    <Helmet>
                      <title>TrustHire Chain - Centralized Hiring. Decentralized Trust.</title>
                      <meta name="description" content="Blockchain-powered hiring platform connecting job seekers and employers through verified credentials and transparent processes." />
                      <meta property="og:title" content="TrustHire Chain - Revolutionary Blockchain Hiring Platform" />
                      <meta property="og:description" content="Experience the future of hiring with blockchain-verified credentials, transparent application tracking, and decentralized trust." />
                      <meta property="og:type" content="website" />
                      <meta name="twitter:card" content="summary_large_image" />
                      <meta name="twitter:title" content="TrustHire Chain - Blockchain Hiring Platform" />
                      <meta name="twitter:description" content="Centralized Hiring. Decentralized Trust. Join the future of transparent, fraud-free hiring." />
                    </Helmet>
                    <LandingPage />
                  </>
                } />
                <Route path="/how-it-works" element={
                  <>
                    <Helmet>
                      <title>How It Works - TrustHire Chain</title>
                      <meta name="description" content="Learn how our blockchain-powered hiring platform works for job seekers and employers with DID onboarding and credential verification." />
                    </Helmet>
                    <HowItWorks />
                  </>
                } />
                <Route path="/for-job-seekers" element={
                  <>
                    <Helmet>
                      <title>For Job Seekers - TrustHire Chain</title>
                      <meta name="description" content="Take control of your career with blockchain-verified credentials, privacy-first job searching, and transparent application tracking." />
                    </Helmet>
                    <ForJobSeekers />
                  </>
                } />
                <Route path="/for-employers" element={
                  <>
                    <Helmet>
                      <title>For Employers - TrustHire Chain</title>
                      <meta name="description" content="Hire with confidence using our certified talent pool, zero fake resumes, and transparent blockchain-powered hiring processes." />
                    </Helmet>
                    <ForEmployers />
                  </>
                } />
                <Route path="/verify-credentials" element={
                  <>
                    <Helmet>
                      <title>Verify Credentials Instantly - TrustHire Chain</title>
                      <meta name="description" content="Experience real blockchain credential verification. Paste a credential ID or connect your wallet to see our system in action." />
                    </Helmet>
                    <VerifyCredentials />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <Helmet>
                      <title>About Us - TrustHire Chain</title>
                      <meta name="description" content="Learn about our mission to empower talent, decentralize access, and restore fairness to hiring through blockchain technology." />
                    </Helmet>
                    <About />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <Helmet>
                      <title>Contact & Support - TrustHire Chain</title>
                      <meta name="description" content="Get in touch with our team, join our community, or find answers to frequently asked questions about our platform." />
                    </Helmet>
                    <Contact />
                  </>
                } />
                <Route path="/auth" element={
                  <>
                    <Helmet>
                      <title>Sign In / Sign Up - TrustHire Chain</title>
                      <meta name="description" content="Join TrustHire Chain as a job seeker or employer. Create your account to access blockchain-powered hiring features." />
                    </Helmet>
                    <Auth />
                  </>
                } />
                <Route path="/dashboard/seeker" element={
                  <>
                    <Helmet>
                      <title>Job Seeker Dashboard - TrustHire Chain</title>
                      <meta name="description" content="Manage your profile, track applications, and control your verified credentials in your secure job seeker dashboard." />
                    </Helmet>
                    <ProtectedRoute requiredRole="job_seeker">
                      <JobSeekerDashboard />
                    </ProtectedRoute>
                  </>
                } />
                <Route path="/dashboard/employer" element={
                  <>
                    <Helmet>
                      <title>Employer Dashboard - TrustHire Chain</title>
                      <meta name="description" content="Post jobs, review applications, and verify candidate credentials in your comprehensive employer dashboard." />
                    </Helmet>
                    <ProtectedRoute requiredRole="employer">
                      <EmployerDashboard />
                    </ProtectedRoute>
                  </>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </main>
  );
}
