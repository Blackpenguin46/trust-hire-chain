import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import Auth from './pages/Auth';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import UserProfile from './components/UserProfile'; // Assuming UserProfile is a component
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import HowItWorks from './pages/HowItWorks';
import ForJobSeekers from './pages/ForJobSeekers';
import ForEmployers from './pages/ForEmployers';
import VerifyCredentials from './pages/VerifyCredentials';
import About from './pages/About';
import Contact from './pages/Contact';
import { PostJob } from './pages/PostJob';
import { Jobs } from './pages/Jobs';
import { EmployerJobs } from './pages/EmployerJobs';
import { JobDetails } from './pages/JobDetails';
import { EmployerApplications } from './pages/EmployerApplications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/job-seeker/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/for-job-seekers" element={<ForJobSeekers />} />
        <Route path="/for-employers" element={<ForEmployers />} />
        <Route path="/verify-credentials" element={<VerifyCredentials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/employer/jobs" element={<EmployerJobs />} />
        <Route path="/employer/applications" element={<EmployerApplications />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;


