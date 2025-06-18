import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./pages/LandingPage";
import Auth from "./pages/Auth";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import HowItWorks from "./pages/HowItWorks";
import ForJobSeekers from "./pages/ForJobSeekers";
import ForEmployers from "./pages/ForEmployers";
import VerifyCredentials from "./pages/VerifyCredentials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { PostJob } from './pages/PostJob';
import { Jobs } from './pages/Jobs';
import { EmployerJobs } from './pages/EmployerJobs';
import { JobDetails } from './pages/JobDetails';
import { EmployerApplications } from './pages/EmployerApplications';

const queryClient = new QueryClient();

export default function App() {
  return <div style={{ color: 'lime', fontSize: 32 }}>APP IS MOUNTED</div>;
}
