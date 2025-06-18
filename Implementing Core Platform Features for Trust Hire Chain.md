# Implementing Core Platform Features for Trust Hire Chain

This section outlines the implementation of essential core features for the Trust Hire Chain platform, focusing on job posting, application management, and user profile management for both job seekers and employers. These features will leverage the Back4app backend for data storage and retrieval, laying the groundwork for future blockchain integrations.

## 1. Job Posting (Employer Side)

Employers need a robust interface to create, manage, and publish job listings. This involves a form for inputting job details and a mechanism to display and update these listings.

### 1.1 Data Model for Job Postings

In Back4app (Parse Server), each job posting can be represented as an object in a custom class, for example, `JobPosting`. The schema for this class would include fields such as:

*   `title` (String): The job title (e.g., "Senior Blockchain Developer")
*   `description` (String): A detailed description of the job responsibilities and requirements.
*   `location` (String): The job location (e.g., "Remote", "New York, NY").
*   `salaryRange` (String): The expected salary range.
*   `employmentType` (String): Full-time, part-time, contract, etc.
*   `employer` (Pointer to `_User`): A reference to the `_User` object of the employer who posted the job.
*   `isActive` (Boolean): A flag to indicate if the job posting is currently active (default: `true`).
*   `applicationDeadline` (Date): The deadline for applications.
*   `requiredSkills` (Array of Strings): A list of skills required for the job.

### 1.2 Creating a Job Posting Form (EmployerDashboard.tsx)

Employers will access a form within their dashboard to create new job postings. This form should be intuitive and capture all necessary details.

**Example `EmployerDashboard.tsx` (simplified for job posting form):**

```typescript
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Parse from 'parse';

const EmployerDashboard = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const { toast } = useToast();

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = Parse.User.current();
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to post a job.',
        variant: 'destructive',
      });
      return;
    }

    const JobPosting = Parse.Object.extend('JobPosting');
    const jobPosting = new JobPosting();

    jobPosting.set('title', jobTitle);
    jobPosting.set('description', jobDescription);
    jobPosting.set('location', jobLocation);
    jobPosting.set('salaryRange', salaryRange);
    jobPosting.set('employmentType', employmentType);
    jobPosting.set('employer', currentUser); // Link job to current employer
    jobPosting.set('isActive', true);
    jobPosting.set('applicationDeadline', new Date(applicationDeadline));
    jobPosting.set('requiredSkills', requiredSkills.split(',').map(skill => skill.trim()));

    try {
      await jobPosting.save();
      toast({
        title: 'Success',
        description: 'Job posted successfully!',
      });
      // Clear form
      setJobTitle('');
      setJobDescription('');
      setJobLocation('');
      setSalaryRange('');
      setEmploymentType('');
      setApplicationDeadline('');
      setRequiredSkills('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to post job.',
        variant: 'destructive',
      });
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handlePostJob} className="space-y-4">
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="jobLocation">Location</Label>
          <Input id="jobLocation" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="salaryRange">Salary Range</Label>
          <Input id="salaryRange" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="employmentType">Employment Type</Label>
          <Input id="employmentType" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="applicationDeadline">Application Deadline</Label>
          <Input id="applicationDeadline" type="date" value={applicationDeadline} onChange={(e) => setApplicationDeadline(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
          <Input id="requiredSkills" value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} />
        </div>
        <Button type="submit">Post Job</Button>
      </form>
    </div>
  );
};

export default EmployerDashboard;
```

### 1.3 Displaying Employer's Job Postings

Employers should also be able to view and manage their active job postings. This involves querying Back4app for jobs posted by the current user.

**Example `EmployerDashboard.tsx` (simplified for displaying jobs):**

```typescript
import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EmployerDashboard = () => {
  const [myJobPostings, setMyJobPostings] = useState<Parse.Object[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMyJobPostings = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        toast({
          title: 'Error',
          description: 'You must be logged in to view your job postings.',
          variant: 'destructive',
        });
        return;
      }

      const JobPosting = Parse.Object.extend('JobPosting');
      const query = new Parse.Query(JobPosting);
      query.equalTo('employer', currentUser); // Filter by current employer
      query.descending('createdAt'); // Order by newest first

      try {
        const jobs = await query.find();
        setMyJobPostings(jobs);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch job postings.',
          variant: 'destructive',
        });
        console.error('Error fetching job postings:', error);
      }
    };

    fetchMyJobPostings();
  }, [toast]);

  const handleDeactivateJob = async (jobId: string) => {
    const JobPosting = Parse.Object.extend('JobPosting');
    const job = new JobPosting();
    job.id = jobId;
    job.set('isActive', false);

    try {
      await job.save();
      setMyJobPostings(prevJobs => prevJobs.filter(j => j.id !== jobId));
      toast({
        title: 'Success',
        description: 'Job deactivated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to deactivate job.',
        variant: 'destructive',
      });
      console.error('Error deactivating job:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Job Postings</h1>
      {myJobPostings.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myJobPostings.map(job => (
            <Card key={job.id} className="professional-card">
              <CardHeader>
                <CardTitle>{job.get('title')}</CardTitle>
                <CardDescription>{job.get('location')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[--color-text-secondary] line-clamp-3">{job.get('description')}</p>
                <p className="text-xs text-[--color-text-secondary] mt-2">Salary: {job.get('salaryRange')}</p>
                <p className="text-xs text-[--color-text-secondary]">Type: {job.get('employmentType')}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" onClick={() => handleDeactivateJob(job.id)}>
                  Deactivate
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
```

## 2. Job Search and Application (JobSeekerDashboard.tsx)

Job seekers need to be able to browse available jobs, view details, and apply.

### 2.1 Data Model for Applications

An `Application` class in Back4app would link a job seeker to a job posting:

*   `jobPosting` (Pointer to `JobPosting`): Reference to the job being applied for.
*   `jobSeeker` (Pointer to `_User`): Reference to the job seeker applying.
*   `status` (String): Application status (e.g., "Pending", "Reviewed", "Interview", "Rejected", "Hired").
*   `coverLetter` (String, optional): The cover letter submitted by the job seeker.
*   `resume` (File, optional): A file pointer to the uploaded resume.

### 2.2 Displaying All Job Postings (JobSeekerDashboard.tsx)

Job seekers will see a list of all active job postings.

**Example `JobSeekerDashboard.tsx` (simplified for job listing):**

```typescript
import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const JobSeekerDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState<Parse.Object[]>([]);
  const [selectedJob, setSelectedJob] = useState<Parse.Object | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAvailableJobs = async () => {
      const JobPosting = Parse.Object.extend('JobPosting');
      const query = new Parse.Query(JobPosting);
      query.equalTo('isActive', true); // Only show active jobs
      query.include('employer'); // Include employer details
      query.descending('createdAt');

      try {
        const jobs = await query.find();
        setAvailableJobs(jobs);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch available jobs.',
          variant: 'destructive',
        });
        console.error('Error fetching available jobs:', error);
      }
    };

    fetchAvailableJobs();
  }, [toast]);

  const handleApplyClick = (job: Parse.Object) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedJob) return;

    const currentUser = Parse.User.current();
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to apply for a job.',
        variant: 'destructive',
      });
      return;
    }

    const Application = Parse.Object.extend('Application');
    const application = new Application();

    application.set('jobPosting', selectedJob);
    application.set('jobSeeker', currentUser);
    application.set('status', 'Pending');
    application.set('coverLetter', coverLetter);

    if (resumeFile) {
      const parseFile = new Parse.File(resumeFile.name, resumeFile);
      await parseFile.save();
      application.set('resume', parseFile);
    }

    try {
      await application.save();
      toast({
        title: 'Success',
        description: 'Application submitted successfully!',
      });
      setIsApplyDialogOpen(false);
      setCoverLetter('');
      setResumeFile(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application.',
        variant: 'destructive',
      });
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Job Postings</h1>
      {availableJobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableJobs.map(job => (
            <Card key={job.id} className="professional-card">
              <CardHeader>
                <CardTitle>{job.get('title')}</CardTitle>
                <CardDescription>{job.get('employer').get('username')} - {job.get('location')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[--color-text-secondary] line-clamp-3">{job.get('description')}</p>
                <p className="text-xs text-[--color-text-secondary] mt-2">Salary: {job.get('salaryRange')}</p>
                <p className="text-xs text-[--color-text-secondary]">Type: {job.get('employmentType')}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleApplyClick(job)}>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Apply Job Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.get('title')}</DialogTitle>
            <DialogDescription>
              Submit your application for this position.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplySubmit} className="space-y-4">
            <div>
              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
              <Textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={5} />
            </div>
            <div>
              <Label htmlFor="resume">Resume (PDF, DOCX)</Label>
              <Input id="resume" type="file" accept=".pdf,.docx" onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobSeekerDashboard;
```

### 2.3 Displaying Job Seeker's Applications

Job seekers should also be able to track the status of their applications.

**Example `JobSeekerDashboard.tsx` (simplified for displaying applications):**

```typescript
import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const JobSeekerDashboard = () => {
  const [myApplications, setMyApplications] = useState<Parse.Object[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMyApplications = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        toast({
          title: 'Error',
          description: 'You must be logged in to view your applications.',
          variant: 'destructive',
        });
        return;
      }

      const Application = Parse.Object.extend('Application');
      const query = new Parse.Query(Application);
      query.equalTo('jobSeeker', currentUser); // Filter by current job seeker
      query.include('jobPosting'); // Include job posting details
      query.descending('createdAt');

      try {
        const applications = await query.find();
        setMyApplications(applications);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch applications.',
          variant: 'destructive',
        });
        console.error('Error fetching applications:', error);
      }
    };

    fetchMyApplications();
  }, [toast]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      {myApplications.length === 0 ? (
        <p>You haven't submitted any applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myApplications.map(app => (
            <Card key={app.id} className="professional-card">
              <CardHeader>
                <CardTitle>{app.get('jobPosting').get('title')}</CardTitle>
                <CardDescription>{app.get('jobPosting').get('employer').get('username')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[--color-text-secondary] line-clamp-3">{app.get('coverLetter')}</p>
                <Badge className={`mt-2 ${app.get('status') === 'Pending' ? 'bg-yellow-500' : app.get('status') === 'Hired' ? 'bg-green-500' : 'bg-blue-500'}`}>
                  Status: {app.get('status')}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
```

## 3. User Profile Management

Both job seekers and employers should be able to view and update their profiles.

### 3.1 Updating User Profiles

Back4app's `Parse.User` object can store custom properties. When a user signs up, we already set `userType`. We can add more fields like `fullName`, `companyName`, `bio`, `profilePicture`, etc.

**Example of updating user profile (can be a separate component or part of dashboard):**

```typescript
import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setFullName(currentUser.get('fullName') || '');
      setBio(currentUser.get('bio') || '');
      setCompanyName(currentUser.get('companyName') || '');
      setIsEmployer(currentUser.get('userType') === 'employer');
    }
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = Parse.User.current();
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update your profile.',
        variant: 'destructive',
      });
      return;
    }

    currentUser.set('fullName', fullName);
    currentUser.set('bio', bio);
    if (isEmployer) {
      currentUser.set('companyName', companyName);
    }

    try {
      await currentUser.save();
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} />
        </div>
        {isEmployer && (
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
        )}
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
};

export default UserProfile;
```

## 4. Integrating into `App.tsx` and Navigation

To make these new dashboards and profile management accessible, you'll need to update your `App.tsx` routing and potentially your `Web3Navigation.tsx` component.

### 4.1 `App.tsx` Routing

Ensure your `App.tsx` includes routes for `EmployerDashboard`, `JobSeekerDashboard`, and potentially a `UserProfile` page.

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import UserProfile from './components/UserProfile'; // Assuming UserProfile is a component
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard/employer" element={<EmployerDashboard />} />
        <Route path="/dashboard/seeker" element={<JobSeekerDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
```

### 4.2 `Web3Navigation.tsx` Updates

Your navigation component should dynamically show links based on whether a user is logged in and their `userType`. You can use `Parse.User.current()` to check the current user and their properties.

```typescript
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';

const Web3Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUser(Parse.User.current());
  }, []);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to log out.',
        variant: 'destructive',
      });
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[--color-background]/95 backdrop-blur-xl border-b border-[--border]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-xl font-semibold text-[--color-text-primary] cursor-pointer">
                TrustHire Chain
              </div>
            </Link>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:space-x-8 items-center">
            <Link to="/for-employers" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">For Employers</Link>
            <Link to="/for-job-seekers" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">For Job Seekers</Link>
            <Link to="/how-it-works" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">How It Works</Link>
            <Link to="/about" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link to="/contact" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            
            {currentUser ? (
              <>
                {currentUser.get('userType') === 'employer' && (
                  <Link to="/dashboard/employer" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Employer Dashboard</Link>
                )}
                {currentUser.get('userType') === 'seeker' && (
                  <Link to="/dashboard/seeker" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Job Seeker Dashboard</Link>
                )}
                <Link to="/profile" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                <Button onClick={handleLogout} variant="outline" className="text-[--color-primary] border-[--color-primary] hover:bg-[--color-primary] hover:text-white">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} className="primary-button">
                Sign In / Sign Up
              </Button>
            )}
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--color-primary]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[--border] bg-[--color-background]/98 backdrop-blur-xl slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/for-employers" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">For Employers</Link>
            <Link to="/for-job-seekers" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">For Job Seekers</Link>
            <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">How It Works</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Contact</Link>
            
            {currentUser ? (
              <>
                {currentUser.get('userType') === 'employer' && (
                  <Link to="/dashboard/employer" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Employer Dashboard</Link>
                )}
                {currentUser.get('userType') === 'seeker' && (
                  <Link to="/dashboard/seeker" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Job Seeker Dashboard</Link>
                )}
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Profile</Link>
                <Button onClick={handleLogout} variant="outline" className="w-full mt-2 text-[--color-primary] border-[--color-primary] hover:bg-[--color-primary] hover:text-white">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} className="w-full mt-2 primary-button">
                Sign In / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Web3Navigation;
```

## 5. Next Steps

With these core features outlined, the next steps involve:

1.  **Creating the new component files:** `EmployerDashboard.tsx`, `JobSeekerDashboard.tsx`, and `UserProfile.tsx` in `src/pages` (or `src/components` for `UserProfile` if preferred).
2.  **Populating these files** with the provided example code.
3.  **Ensuring all necessary UI components** (like `Card`, `Dialog`, `Textarea`, `Badge` etc.) from `@/components/ui` are correctly imported and used.
4.  **Verifying the routing** in `App.tsx` and updating `Web3Navigation.tsx` to reflect the new dashboard and profile links.

Once these core features are implemented and tested, we can move on to integrating blockchain functionalities, starting with Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs).



# Integrating Blockchain Features: Decentralized Identity (DID) and Verifiable Credentials (VCs)

To truly leverage blockchain for Trust Hire Chain, we will integrate Decentralized Identity (DID) and Verifiable Credentials (VCs). This will allow job seekers to own and control their professional data, and employers to verify credentials with unprecedented trust and efficiency. SKALE Network, being EVM-compatible and gas-free, is an excellent choice for deploying the necessary smart contracts.

## 1. Understanding Decentralized Identity (DID) and Verifiable Credentials (VCs)

**Decentralized Identity (DID)** provides a new type of identifier that is globally unique, cryptographically verifiable, and controlled by the individual, not by any centralized authority. This means users have self-sovereign control over their identity.

**Verifiable Credentials (VCs)** are tamper-proof digital credentials that can be issued by an issuer (e.g., a university, a previous employer) to a holder (the job seeker). These VCs can then be presented by the holder to a verifier (e.g., a potential employer) who can cryptographically verify their authenticity and integrity.

Together, DIDs and VCs form the foundation of a trustless and transparent identity system on the blockchain.

## 2. Choosing a DID Method for SKALE (EVM-Compatible)

Since SKALE is EVM-compatible, we can utilize DID methods designed for Ethereum. A common and well-supported method is `did:ethr`. This method uses an Ethereum address as the DID, and the associated DID document (which contains public keys and service endpoints) is stored on-chain or referenced from an off-chain location, with its integrity secured by the blockchain.

**Key Components:**

*   **DID Registry Smart Contract:** A smart contract deployed on the SKALE chain that maps DIDs (Ethereum addresses) to their DID documents or pointers to them. This contract allows DID owners to update their DID documents.
*   **Ethereum Wallet:** Users will need an Ethereum-compatible wallet (like MetaMask) to manage their DIDs and interact with the DID Registry.

## 3. Implementing Verifiable Credentials Flow

The VC flow involves three main roles: Issuer, Holder, and Verifier.

### 3.1 Issuer (e.g., University, Previous Employer, Trust Hire Chain itself)

Issuers are entities that attest to certain claims about a holder (e.g., a degree, work experience). They cryptographically sign the VC.

**Steps for an Issuer:**

1.  **Define Credential Schema:** Create a JSON schema that defines the structure of the credential (e.g., for a 


degree, `degreeName`, `university`, `graduationDate`).
2.  **Generate VC:** The issuer generates a VC, which is essentially a JSON object containing the claims, the holder's DID, and metadata. This VC is then cryptographically signed by the issuer's private key.
3.  **Issue VC:** The signed VC is then given to the holder. This can be done off-chain (e.g., via email, a QR code) or on-chain (e.g., by storing a hash of the VC on-chain and the VC itself off-chain).

### 3.2 Holder (Job Seeker)

The job seeker receives and stores their VCs, typically in a digital wallet. They control when and to whom they present these credentials.

**Steps for a Holder:**

1.  **Create DID:** The job seeker generates a DID (an Ethereum address on SKALE). This can be done by simply creating a new wallet address.
2.  **Receive and Store VCs:** The job seeker receives VCs from various issuers and stores them securely in their local storage or a decentralized storage solution (e.g., IPFS) linked to their DID.
3.  **Create Verifiable Presentation (VP):** When a job seeker wants to prove a claim (e.g., their degree) to an employer, they create a Verifiable Presentation. A VP is a collection of one or more VCs, cryptographically signed by the holder to prove they own the VCs.
4.  **Present VP:** The job seeker presents the VP to the verifier.

### 3.3 Verifier (Employer)

Verifiers receive VPs from holders and cryptographically verify their authenticity and integrity, ensuring the claims are true and haven't been tampered with.

**Steps for a Verifier:**

1.  **Receive VP:** The employer receives a VP from a job seeker.
2.  **Verify VP:** The employer verifies the VP by:
    *   Checking the holder's signature on the VP.
    *   Checking the issuer's signature on each VC within the VP.
    *   Checking the status of the VC (e.g., has it been revoked?).
    *   Checking the claims within the VC against their requirements.

## 4. Smart Contract for DID Registry and Credential Status

We will need a simple smart contract on SKALE to manage DIDs and potentially track the revocation status of credentials. This contract will be EVM-compatible and written in Solidity.

**`DIDRegistry.sol` (Simplified Example):**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDRegistry {
    mapping(address => string) public didDocuments; // Maps DID (Ethereum address) to DID Document URI/Hash
    mapping(bytes32 => bool) public revokedCredentials; // Maps credential hash to revocation status

    event DIDDocumentUpdated(address indexed did, string newDidDocumentUri);
    event CredentialRevoked(bytes32 indexed credentialHash);

    function setDIDDocument(string memory _newDidDocumentUri) public {
        didDocuments[msg.sender] = _newDidDocumentUri;
        emit DIDDocumentUpdated(msg.sender, _newDidDocumentUri);
    }

    function getDIDDocument(address _did) public view returns (string memory) {
        return didDocuments[_did];
    }

    function revokeCredential(bytes32 _credentialHash) public {
        // Only the issuer of the credential should be able to revoke it.
        // For simplicity, this example allows anyone to revoke, but in a real system,
        // you'd need to verify the caller's identity and their right to revoke.
        revokedCredentials[_credentialHash] = true;
        emit CredentialRevoked(_credentialHash);
    }

    function isCredentialRevoked(bytes32 _credentialHash) public view returns (bool) {
        return revokedCredentials[_credentialHash];
    }
}
```

**Deployment on SKALE:**

To deploy this contract on SKALE, you would typically use tools like Hardhat or Truffle, configured to connect to a SKALE chain. You would need to fund your deploying address with a small amount of SKALE (or the native token of the specific SKALE chain) for gas, although SKALE is gas-free for users, deployment still requires some transaction cost.

## 5. Frontend Integration for DID and VCs

### 5.1 Job Seeker: Generating DID and Managing Credentials

We can add a 


section in the `JobSeekerDashboard.tsx` or a dedicated `UserProfile.tsx` to allow users to:

*   **Connect Wallet/Generate DID:** Prompt users to connect their MetaMask wallet. Their connected Ethereum address will serve as their DID. We can store this DID in their Back4app `_User` object.
*   **View/Manage VCs:** Display a list of their verifiable credentials. Initially, these might be mock credentials or credentials they manually upload (e.g., a JSON file representing a VC). In a more advanced setup, they would receive these from issuers.
*   **Create Verifiable Presentations (VPs):** Allow users to select specific VCs and generate a VP to share with an employer.

**Example `JobSeekerDashboard.tsx` (simplified for DID/VC management tab):**

```typescript
import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Web3Navigation from '@/components/Web3Navigation';
import { Wallet, FileText } from 'lucide-react';

// Assuming you have a web3 provider like MetaMask injected
declare global {
  interface Window {
    ethereum?: any;
  }
}

const JobSeekerDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState<Parse.Object[]>([]);
  const [myApplications, setMyApplications] = useState<Parse.Object[]>([]);
  const [userDID, setUserDID] = useState<string | null>(null);
  const [verifiableCredentials, setVerifiableCredentials] = useState<any[]>([]); // Store VCs as objects
  const { toast } = useToast();

  useEffect(() => {
    const fetchJobSeekerData = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        toast({
          title: 'Error',
          description: 'You must be logged in to view your dashboard.',
          variant: 'destructive',
        });
        return;
      }

      // Fetch Available Jobs (existing logic)
      const JobPosting = Parse.Object.extend('JobPosting');
      const jobQuery = new Parse.Query(JobPosting);
      jobQuery.equalTo('isActive', true);
      jobQuery.include('employer');
      jobQuery.descending('createdAt');
      try {
        const jobs = await jobQuery.find();
        setAvailableJobs(jobs);
      } catch (error: any) {
        console.error('Error fetching available jobs:', error);
      }

      // Fetch My Applications (existing logic)
      const Application = Parse.Object.extend('Application');
      const applicationQuery = new Parse.Query(Application);
      applicationQuery.equalTo('jobSeeker', currentUser);
      applicationQuery.include('jobPosting');
      applicationQuery.include('jobPosting.employer');
      applicationQuery.descending('createdAt');
      try {
        const applications = await applicationQuery.find();
        setMyApplications(applications);
      } catch (error: any) {
        console.error('Error fetching applications:', error);
      }

      // Fetch User DID and VCs from Back4app
      setUserDID(currentUser.get('did') || null);
      setVerifiableCredentials(currentUser.get('verifiableCredentials') || []);
    };

    fetchJobSeekerData();
  }, [toast]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const connectedDID = accounts[0];
        const currentUser = Parse.User.current();
        if (currentUser) {
          currentUser.set('did', connectedDID);
          await currentUser.save();
          setUserDID(connectedDID);
          toast({
            title: 'Wallet Connected',
            description: `Your DID: ${connectedDID}`,
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to connect wallet.',
          variant: 'destructive',
        });
        console.error('Error connecting wallet:', error);
      }
    } else {
      toast({
        title: 'MetaMask Not Found',
        description: 'Please install MetaMask to connect your wallet.',
        variant: 'destructive',
      });
    }
  };

  const handleUploadVC = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileContent = await file.text();
        const vc = JSON.parse(fileContent);
        // Basic validation for VC structure (e.g., check for @context, type, credentialSubject, issuer, issuanceDate)
        if (!vc['@context'] || !vc.type || !vc.credentialSubject || !vc.issuer) {
          throw new Error('Invalid Verifiable Credential format.');
        }

        const currentUser = Parse.User.current();
        if (currentUser) {
          const currentVCs = currentUser.get('verifiableCredentials') || [];
          currentUser.set('verifiableCredentials', [...currentVCs, vc]);
          await currentUser.save();
          setVerifiableCredentials(prevVCs => [...prevVCs, vc]);
          toast({
            title: 'Success',
            description: 'Verifiable Credential uploaded and saved!',
          });
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to upload VC. Please ensure it is a valid JSON file.',
          variant: 'destructive',
        });
        console.error('Error uploading VC:', error);
      }
    }
  };

  const handlePresentVC = async (vc: any) => {
    // This is a simplified example. In a real scenario, this would involve:
    // 1. Signing the VC with the user's DID private key to create a Verifiable Presentation (VP).
    // 2. Sending the VP to the employer (e.g., as part of a job application).
    // For now, we'll just simulate presentation.
    toast({
      title: 'VC Presented',
      description: `Simulating presentation of credential: ${vc.type[1] || vc.type[0]}`,
    });
    console.log('Simulating VC Presentation:', vc);
    // You would typically send this VP to a backend endpoint for the employer to verify
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500';
      case 'Reviewed': return 'bg-blue-500';
      case 'Interview': return 'bg-purple-500';
      case 'Rejected': return 'bg-red-500';
      case 'Hired': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[--color-text-primary] mb-2">Job Seeker Dashboard</h1>
          <p className="text-[--color-text-secondary]">Find jobs and track your applications</p>
        </div>

        <Tabs defaultValue="available-jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="available-jobs">Available Jobs</TabsTrigger>
            <TabsTrigger value="my-applications">My Applications</TabsTrigger>
            <TabsTrigger value="wallet">My Wallet</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Existing Tabs Content (Available Jobs, My Applications) */}
          <TabsContent value="available-jobs">
            <h2 className="text-2xl font-bold mb-4">Available Job Postings</h2>
            {availableJobs.length === 0 ? (
              <p>No jobs available at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableJobs.map(job => (
                  <Card key={job.id} className="professional-card">
                    <CardHeader>
                      <CardTitle>{job.get('title')}</CardTitle>
                      <CardDescription>{job.get('employer')?.get('companyName') || job.get('employer')?.get('username')} - {job.get('location')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[--color-text-secondary] line-clamp-3">{job.get('description')}</p>
                      <p className="text-xs text-[--color-text-secondary] mt-2">Salary: {job.get('salaryRange')}</p>
                      <p className="text-xs text-[--color-text-secondary]">Type: {job.get('employmentType')}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => console.log('Apply for', job.id)}>
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-applications">
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            {myApplications.length === 0 ? (
              <p>You haven't submitted any applications yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myApplications.map(app => (
                  <Card key={app.id} className="professional-card">
                    <CardHeader>
                      <CardTitle>{app.get('jobPosting')?.get('title')}</CardTitle>
                      <CardDescription>{app.get('jobPosting')?.get('employer')?.get('companyName') || app.get('jobPosting')?.get('employer')?.get('username')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[--color-text-secondary] line-clamp-3">{app.get('coverLetter')}</p>
                      <Badge className={`mt-2 ${getStatusColor(app.get('status'))}`}>
                        Status: {app.get('status')}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* New Wallet Tab Content */}
          <TabsContent value="wallet">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Digital Credential Wallet</CardTitle>
                <CardDescription>Manage your Decentralized Identity and Verifiable Credentials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Decentralized ID (DID)</h3>
                  {userDID ? (
                    <p className="text-[--color-text-secondary] break-all">DID: {userDID}</p>
                  ) : (
                    <Button onClick={connectWallet} className="primary-button">
                      Connect Wallet to Get DID
                    </Button>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Verifiable Credentials</h3>
                  <Input type="file" accept=".json" onChange={handleUploadVC} className="mb-4" />
                  {verifiableCredentials.length === 0 ? (
                    <p className="text-[--color-text-secondary]">No verifiable credentials uploaded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {verifiableCredentials.map((vc, index) => (
                        <Card key={index} className="professional-card border-[--border]">
                          <CardContent className="p-4">
                            <h4 className="font-semibold">{vc.type[1] || vc.type[0]}</h4>
                            <p className="text-sm text-[--color-text-secondary]">Issuer: {vc.issuer.name || vc.issuer}</p>
                            <p className="text-sm text-[--color-text-secondary]">Issued: {new Date(vc.issuanceDate).toLocaleDateString()}</p>
                            <Button variant="outline" size="sm" className="mt-2" onClick={() => handlePresentVC(vc)}>
                              Present Credential
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Existing Profile Tab Content */}
          <TabsContent value="profile">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>Update your professional information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
```

### 5.2 Employer: Verifying Credentials

Employers will need a way to request and verify credentials from job seekers. This could be integrated into the application review process.

**Example `EmployerDashboard.tsx` (simplified for application review with VC verification):**

```typescript
import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Web3Navigation from '@/components/Web3Navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const EmployerDashboard = () => {
  const [myJobPostings, setMyJobPostings] = useState<Parse.Object[]>([]);
  const [myApplications, setMyApplications] = useState<Parse.Object[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Parse.Object | null>(null);
  const [isVerifyVCDialogOpen, setIsVerifyVCDialogOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployerData = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        toast({
          title: 'Error',
          description: 'You must be logged in to view your dashboard.',
          variant: 'destructive',
        });
        return;
      }

      // Fetch Job Postings (existing logic)
      const JobPosting = Parse.Object.extend('JobPosting');
      const jobQuery = new Parse.Query(JobPosting);
      jobQuery.equalTo('employer', currentUser);
      jobQuery.descending('createdAt');
      try {
        const jobs = await jobQuery.find();
        setMyJobPostings(jobs);
      } catch (error: any) {
        console.error('Error fetching job postings:', error);
      }

      // Fetch Applications for my jobs (existing logic)
      const Application = Parse.Object.extend('Application');
      const applicationQuery = new Parse.Query(Application);
      applicationQuery.include('jobPosting');
      applicationQuery.include('jobSeeker');
      applicationQuery.descending('createdAt');

      // Filter applications by jobs posted by the current employer
      const employerJobIds = jobs.map(job => job.id);
      if (employerJobIds.length > 0) {
        const innerJobQuery = new Parse.Query(JobPosting);
        innerJobQuery.containedIn('objectId', employerJobIds);
        applicationQuery.matchesQuery('jobPosting', innerJobQuery);
      } else {
        setMyApplications([]);
        return;
      }

      try {
        const applications = await applicationQuery.find();
        setMyApplications(applications);
      } catch (error: any) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchEmployerData();
  }, [toast]);

  const handleVerifyVC = async (application: Parse.Object) => {
    setSelectedApplication(application);
    setIsVerifyVCDialogOpen(true);
    setVerificationResult(null);

    const jobSeekerVCs = application.get('jobSeeker')?.get('verifiableCredentials') || [];
    if (jobSeekerVCs.length === 0) {
      setVerificationResult('No verifiable credentials found for this job seeker.');
      return;
    }

    // Simulate VC verification. In a real system, this would involve:
    // 1. Receiving a Verifiable Presentation (VP) from the job seeker.
    // 2. Using a DID/VC library (e.g., `did-jwt-vc`, `vc-js`) to cryptographically verify the VP and its contained VCs.
    // 3. Checking the revocation status of the VCs against the DIDRegistry smart contract on SKALE.
    // For this example, we'll just check if any VCs exist.

    try {
      // Example: Check if a 'UniversityDegreeCredential' exists and is not revoked
      const degreeVC = jobSeekerVCs.find((vc: any) => vc.type.includes('UniversityDegreeCredential'));

      if (degreeVC) {
        // Simulate checking revocation status on-chain
        // const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(degreeVC)));
        // const isRevoked = await didRegistryContract.isCredentialRevoked(credentialHash);
        // if (isRevoked) {
        //   setVerificationResult('University Degree Credential is revoked.');
        // } else {
        //   setVerificationResult('University Degree Credential verified successfully!');
        // }
        setVerificationResult('Verifiable Credential found. (Simulated verification success)');
      } else {
        setVerificationResult('No relevant verifiable credentials found for verification.');
      }

    } catch (error: any) {
      setVerificationResult(`Verification failed: ${error.message}`);
      console.error('VC Verification Error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Closed': return 'bg-gray-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Reviewed': return 'bg-blue-500';
      case 'Interview': return 'bg-purple-500';
      case 'Rejected': return 'bg-red-500';
      case 'Hired': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[--color-text-primary] mb-2">Employer Dashboard</h1>
            <p className="text-[--color-text-secondary]">Manage your job postings and applications</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="post-job">Post Job</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          {/* Existing Tabs Content (Overview, Post Job, My Jobs) */}
          <TabsContent value="overview">
            {/* ... (Overview content) ... */}
          </TabsContent>

          <TabsContent value="post-job">
            {/* ... (Post Job content) ... */}
          </TabsContent>

          <TabsContent value="jobs">
            {/* ... (My Jobs content) ... */}
          </TabsContent>

          <TabsContent value="applications">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Application Review</CardTitle>
                <CardDescription>Review and manage candidate applications for your jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myApplications.length === 0 ? (
                    <p>No applications received yet.</p>
                  ) : (
                    myApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg border-[--border]">
                        <div>
                          <h3 className="font-semibold">{app.get('jobSeeker')?.get('username')}</h3>
                          <p className="text-sm text-[--color-text-secondary]">{app.get('jobPosting')?.get('title')} • Applied {new Date(app.get('createdAt')).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(app.get('status'))}>
                            {app.get('status')}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleVerifyVC(app)}>
                            Verify Credentials
                          </Button>
                          <Button variant="outline" size="sm">Review</Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New VC Verification Dialog */}
          <Dialog open={isVerifyVCDialogOpen} onOpenChange={setIsVerifyVCDialogOpen}>
            <DialogContent className="professional-card">
              <DialogHeader>
                <DialogTitle>Verify Credentials for {selectedApplication?.get('jobSeeker')?.get('username')}</DialogTitle>
                <DialogDescription>
                  Attempting to verify verifiable credentials for this candidate.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {verificationResult ? (
                  <p className="text-[--color-text-primary]">{verificationResult}</p>
                ) : (
                  <p className="text-[--color-text-secondary]">Verifying credentials...</p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setIsVerifyVCDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
```

## 6. Considerations for Full Implementation

Implementing a full DID and VC system is complex and involves several advanced topics:

*   **DID Resolver:** A service that can resolve a DID into its DID Document. This is crucial for verifying the authenticity of the DID and retrieving associated public keys.
*   **VC Libraries:** Using established libraries (e.g., `did-jwt-vc`, `vc-js` in JavaScript) for creating, signing, and verifying VCs and VPs. These libraries handle the cryptographic operations and adherence to W3C standards.
*   **Off-chain Storage for VCs:** While hashes of VCs can be stored on-chain, the full VC data is often stored off-chain (e.g., IPFS, decentralized storage networks) for privacy and cost efficiency. The DID Document would contain pointers to these off-chain locations.
*   **Revocation Mechanisms:** Implementing robust mechanisms for issuers to revoke VCs if necessary (e.g., a degree is found to be fraudulent). Our `DIDRegistry` contract has a basic `revokeCredential` function, but a real-world system would need more sophisticated logic.
*   **User Experience:** Designing a seamless user experience for wallet connection, VC management, and presentation, especially for users new to Web3.
*   **Smart Contract Security:** Thorough auditing of all smart contracts is paramount to prevent vulnerabilities.

For a fully functioning system, you would need to:

1.  **Set up a local development environment for Solidity** (Hardhat/Truffle) to compile and deploy the `DIDRegistry.sol` contract to a SKALE testnet.
2.  **Integrate a Web3 library** (e.g., `ethers.js` or `web3.js`) into your React frontend to interact with the deployed smart contract.
3.  **Implement the actual cryptographic signing and verification** of VCs and VPs using appropriate JavaScript libraries.
4.  **Consider a decentralized storage solution** for VCs if they are not stored directly in Back4app.

This guide provides the foundational steps and conceptual framework for integrating DIDs and VCs. The actual implementation will require deeper dives into Web3 development and smart contract interactions.





## 7. Integrating Blockchain Features: Smart Contracts & Reputation System

Building upon Decentralized Identities (DIDs) and Verifiable Credentials (VCs), the next crucial step in leveraging blockchain for Trust Hire Chain is to implement a robust reputation system. This system will enhance trust and transparency by allowing participants to rate each other based on interactions, with these ratings immutably recorded on the SKALE blockchain.

### 7.1 Overview of a Blockchain-Based Reputation System

A blockchain-based reputation system provides a decentralized and tamper-proof record of interactions between users. In Trust Hire Chain, this can manifest as:

*   **Employer Ratings of Job Seekers:** After a successful hire or project completion, employers can rate job seekers on aspects like skill proficiency, professionalism, and reliability.
*   **Job Seeker Ratings of Employers:** After an interview or job experience, job seekers can rate employers on aspects like communication, fairness, and work environment.

These ratings, once recorded on the blockchain, are transparent and cannot be altered, providing a reliable source of truth for future interactions.

### 7.2 Smart Contract for Reputation System

We will design a Solidity smart contract to manage these reputation scores. This contract will store ratings and ensure their immutability. For simplicity, we can start with a basic rating mechanism.

**`ReputationSystem.sol` (Simplified Example):**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    // Mapping from entity being rated (address) to mapping of rater (address) to their rating
    mapping(address => mapping(address => uint256)) public ratings;
    // Mapping from entity being rated (address) to total score and number of ratings
    mapping(address => uint256) public totalScore;
    mapping(address => uint256) public numRatings;

    event Rated(address indexed ratedEntity, address indexed rater, uint256 score);

    // Function to submit a rating
    // _ratedEntity: The address of the job seeker or employer being rated
    // _score: The rating given (e.g., 1 to 5)
    function submitRating(address _ratedEntity, uint256 _score) public {
        require(_ratedEntity != address(0), "Cannot rate zero address");
        require(_ratedEntity != msg.sender, "Cannot rate yourself");
        require(_score >= 1 && _score <= 5, "Score must be between 1 and 5");

        // Prevent multiple ratings from the same rater to the same entity (optional, for simplicity not enforced here)
        // if (ratings[_ratedEntity][msg.sender] != 0) {
        //     revert("Already rated this entity");
        // }

        ratings[_ratedEntity][msg.sender] = _score;
        totalScore[_ratedEntity] += _score;
        numRatings[_ratedEntity]++;

        emit Rated(_ratedEntity, msg.sender, _score);
    }

    // Function to get the average rating of an entity
    function getAverageRating(address _entity) public view returns (uint256) {
        if (numRatings[_entity] == 0) {
            return 0;
        }
        return totalScore[_entity] / numRatings[_entity];
    }

    // Function to get the number of ratings for an entity
    function getNumRatings(address _entity) public view returns (uint256) {
        return numRatings[_entity];
    }
}
```

**Deployment on SKALE:**

Similar to the `DIDRegistry` contract, this `ReputationSystem.sol` contract would be compiled and deployed to your chosen SKALE chain using development tools like Hardhat or Truffle. You would interact with it from your frontend using a Web3 library (e.g., `ethers.js`).

### 7.3 Integration with Platform Frontend

#### 7.3.1 Job Seeker Dashboard: Displaying Employer Reputation

In the `JobSeekerDashboard.tsx`, when displaying available job postings, we can fetch and display the average reputation of the employer who posted the job. This would require the employer to have their DID (Ethereum address) associated with their Back4app user profile.

**Example `JobSeekerDashboard.tsx` (modifications for displaying employer reputation):**

```typescript
// ... (existing imports and state)

// Add a new state for the ReputationSystem contract instance
const [reputationContract, setReputationContract] = useState<any>(null);

useEffect(() => {
  // ... (existing fetchJobSeekerData logic)

  // Initialize Web3 provider and ReputationSystem contract
  const initWeb3 = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // Replace with your deployed ReputationSystem contract address and ABI
        const reputationSystemAddress = "YOUR_REPUTATION_SYSTEM_CONTRACT_ADDRESS"; 
        const reputationSystemABI = [
          // ABI of your ReputationSystem.sol contract
          "function getAverageRating(address _entity) view returns (uint256)",
          "function getNumRatings(address _entity) view returns (uint256)",
          "function submitRating(address _ratedEntity, uint256 _score)"
        ];
        const contract = new ethers.Contract(reputationSystemAddress, reputationSystemABI, signer);
        setReputationContract(contract);
      } catch (error) {
        console.error("Error initializing Web3 for reputation system:", error);
        toast({
          title: "Error",
          description: "Failed to connect to blockchain for reputation system.",
          variant: "destructive",
        });
      }
    }
  };
  initWeb3();

}, [toast]);

// ... (existing handleApplyClick, handleApplySubmit, getStatusColor functions)

return (
  <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
    <Web3Navigation />
    <div className="container mx-auto px-4 py-8">
      {/* ... (existing dashboard header and tabs) ... */}

      <TabsContent value="available-jobs">
        <h2 className="text-2xl font-bold mb-4">Available Job Postings</h2>
        {availableJobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableJobs.map(job => (
              <Card key={job.id} className="professional-card">
                <CardHeader>
                  <CardTitle>{job.get("title")}</CardTitle>
                  <CardDescription>
                    {job.get("employer")?.get("companyName") || job.get("employer")?.get("username")} - {job.get("location")}
                    {/* Display Employer Reputation */}
                    {job.get("employer")?.get("did") && reputationContract && (
                      <EmployerReputationDisplay employerDID={job.get("employer").get("did")} reputationContract={reputationContract} />
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[--color-text-secondary] line-clamp-3">{job.get("description")}</p>
                  <p className="text-xs text-[--color-text-secondary] mt-2">Salary: {job.get("salaryRange")}</p>
                  <p className="text-xs text-[--color-text-secondary]">Type: {job.get("employmentType")}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => console.log("Apply for", job.id)}>
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      {/* ... (other tabs and dialogs) ... */}
    </div>
  );
};

// New component to display employer reputation
const EmployerReputationDisplay = ({ employerDID, reputationContract }: { employerDID: string, reputationContract: any }) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [numRatings, setNumRatings] = useState<number>(0);

  useEffect(() => {
    const fetchReputation = async () => {
      if (reputationContract && employerDID) {
        try {
          const avg = await reputationContract.getAverageRating(employerDID);
          const num = await reputationContract.getNumRatings(employerDID);
          setAverageRating(avg.toNumber());
          setNumRatings(num.toNumber());
        } catch (error) {
          console.error("Error fetching employer reputation:", error);
        }
      }
    };
    fetchReputation();
  }, [employerDID, reputationContract]);

  if (numRatings === 0) {
    return <p className="text-xs text-[--color-text-secondary] mt-1">No ratings yet.</p>;
  }

  return (
    <p className="text-xs text-[--color-text-secondary] mt-1">
      Reputation: {averageRating.toFixed(1)}/5 ({numRatings} ratings)
    </p>
  );
};

export default JobSeekerDashboard;
```

#### 7.3.2 Employer Dashboard: Rating Job Seekers

In the `EmployerDashboard.tsx`, after reviewing an application or a successful hire, employers can submit a rating for the job seeker. This would require the job seeker to have their DID associated with their Back4app user profile.

**Example `EmployerDashboard.tsx` (modifications for rating job seekers):**

```typescript
// ... (existing imports and state)

// Add a new state for the ReputationSystem contract instance
const [reputationContract, setReputationContract] = useState<any>(null);
const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
const [jobSeekerToRate, setJobSeekerToRate] = useState<Parse.Object | null>(null);
const [ratingScore, setRatingScore] = useState<number>(0);

useEffect(() => {
  // ... (existing fetchEmployerData logic)

  // Initialize Web3 provider and ReputationSystem contract
  const initWeb3 = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // Replace with your deployed ReputationSystem contract address and ABI
        const reputationSystemAddress = "YOUR_REPUTATION_SYSTEM_CONTRACT_ADDRESS"; 
        const reputationSystemABI = [
          // ABI of your ReputationSystem.sol contract
          "function getAverageRating(address _entity) view returns (uint256)",
          "function getNumRatings(address _entity) view returns (uint256)",
          "function submitRating(address _ratedEntity, uint256 _score)"
        ];
        const contract = new ethers.Contract(reputationSystemAddress, reputationSystemABI, signer);
        setReputationContract(contract);
      } catch (error) {
        console.error("Error initializing Web3 for reputation system:", error);
        toast({
          title: "Error",
          description: "Failed to connect to blockchain for reputation system.",
          variant: "destructive",
        });
      }
    }
  };
  initWeb3();

}, [toast]);

// ... (existing handlePostJob, handleDeactivateJob, getStatusColor functions)

const handleRateJobSeekerClick = (jobSeeker: Parse.Object) => {
  setJobSeekerToRate(jobSeeker);
  setIsRatingDialogOpen(true);
  setRatingScore(0); // Reset score
};

const handleSubmitRating = async () => {
  if (!jobSeekerToRate || !reputationContract || !jobSeekerToRate.get("did")) {
    toast({
      title: "Error",
      description: "Cannot submit rating. Missing job seeker DID or contract.",
      variant: "destructive",
    });
    return;
  }

  try {
    const tx = await reputationContract.submitRating(jobSeekerToRate.get("did"), ratingScore);
    await tx.wait(); // Wait for the transaction to be mined
    toast({
      title: "Success",
      description: `Rating of ${ratingScore} submitted for ${jobSeekerToRate.get("username") || jobSeekerToRate.get("fullName")}.`,
    });
    setIsRatingDialogOpen(false);
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to submit rating.",
      variant: "destructive",
    });
    console.error("Error submitting rating:", error);
  }
};

return (
  <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
    <Web3Navigation />
    <div className="container mx-auto px-4 py-8">
      {/* ... (existing dashboard header and tabs) ... */}

      <TabsContent value="applications">
        <Card className="professional-card">
          <CardHeader>
            <CardTitle>Application Review</CardTitle>
            <CardDescription>Review and manage candidate applications for your jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myApplications.length === 0 ? (
                <p>No applications received yet.</p>
              ) : (
                myApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg border-[--border]">
                    <div>
                      <h3 className="font-semibold">{app.get("jobSeeker")?.get("username")}</h3>
                      <p className="text-sm text-[--color-text-secondary]">{app.get("jobPosting")?.get("title")} • Applied {new Date(app.get("createdAt")).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(app.get("status"))}>
                        {app.get("status")}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleRateJobSeekerClick(app.get("jobSeeker"))}>
                        Rate Candidate
                      </Button>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="professional-card">
          <DialogHeader>
            <DialogTitle>Rate {jobSeekerToRate?.get("username") || "Candidate"}</DialogTitle>
            <DialogDescription>
              Provide a rating for this job seeker (1-5).
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={ratingScore}
              onChange={(e) => setRatingScore(parseInt(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitRating} className="primary-button">Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ... (other tabs and dialogs) ... */}
    </div>
  );
};

export default EmployerDashboard;
```

### 7.4 Considerations for a Robust Reputation System

*   **Preventing Abuse:**
    *   **Sybil Attacks:** Preventing a single entity from creating multiple identities to manipulate ratings. This can be partially mitigated by linking DIDs to real-world identities (e.g., through KYC, though this introduces centralization) or by implementing reputation decay mechanisms.
    *   **Collusion:** Detecting and mitigating groups of users colluding to give false ratings.
    *   **Malicious Ratings:** Implementing dispute resolution mechanisms for unfair ratings.
*   **Weighting Ratings:** Not all ratings might be equal. Ratings from highly reputable users or those with more verified interactions might carry more weight.
*   **Privacy:** While ratings are public, the specific details of an interaction (e.g., why a low rating was given) might need to remain private or be aggregated.
*   **Off-chain Data:** For more detailed feedback, consider storing qualitative feedback off-chain (e.g., in Back4app) and linking it to the on-chain rating.
*   **User Interface:** Designing a clear and intuitive UI for displaying and understanding reputation scores.

This reputation system, combined with DIDs and VCs, forms a powerful framework for building trust and transparency in the Trust Hire Chain platform. The next phase will focus on implementing a monetization strategy.



## 8. Implementing Monetization Strategy

To make Trust Hire Chain a sustainable and profitable platform, a well-defined monetization strategy is essential. Leveraging the unique aspects of a blockchain-powered platform, we can introduce several revenue streams that align with the value proposition of transparency, trust, and efficiency.

### 8.1 Potential Monetization Models

Here are several models that can be implemented, either individually or in combination:

1.  **Premium Job Postings (Employer-Side):**
    *   **Concept:** Offer different tiers of job postings with varying levels of visibility, features, and duration. Basic postings could be free or low-cost, while premium options provide enhanced exposure, featured placement, or access to advanced analytics.
    *   **Implementation:** This would involve adding a `tier` field to the `JobPosting` class in Back4app and modifying the job posting form to allow employers to select a tier. Payment integration (e.g., Stripe, PayPal) would be required to process payments for premium tiers.

2.  **Verified Credential Issuance/Verification Fees (Hybrid):**
    *   **Concept:** While the core idea of DIDs and VCs is self-sovereignty, there could be a small fee associated with the *issuance* of certain high-value credentials by the platform itself (if Trust Hire Chain acts as an issuer for some credentials) or for *advanced verification services* that go beyond basic on-chain checks (e.g., human-assisted verification for complex cases).
    *   **Implementation:** This would involve integrating a payment gateway and linking it to the credential issuance or verification workflow. For on-chain verification, a small gas fee (though minimal on SKALE) might be incurred by the verifier, which could be offset or managed by the platform.

3.  **Subscription Models (Employer-Side):**
    *   **Concept:** Offer subscription plans for employers to access a suite of advanced features, such as:
        *   Unlimited job postings.
        *   Access to advanced candidate search filters.
        *   Detailed analytics on job posting performance and application trends.
        *   Priority support.
        *   Access to a larger pool of pre-verified candidates.
    *   **Implementation:** This requires a subscription management system (e.g., Stripe Subscriptions) integrated with Back4app to track employer subscriptions and control access to features based on their plan.

4.  **Transaction Fees / Micro-payments (Blockchain-Native):**
    *   **Concept:** For certain on-chain interactions, a very small transaction fee could be charged in a native token (if Trust Hire Chain introduces one) or a stablecoin. For example, a small fee for each successful credential verification or for accessing certain premium blockchain-related data.
    *   **Implementation:** This would involve smart contract logic to collect these fees and integration with a Web3 wallet (like MetaMask) for users to approve these micro-payments.

### 8.2 Focus for Initial Implementation: Premium Job Postings

For an initial monetization strategy, **Premium Job Postings** offer a straightforward and easily implementable approach that directly adds value to employers. This can be expanded upon later with more complex blockchain-native monetization.

#### 8.2.1 Data Model for Premium Job Postings

We can extend the `JobPosting` class in Back4app:

*   `tier` (String): e.g., "Standard", "Featured", "Premium". Default to "Standard".
*   `isFeatured` (Boolean): A flag for featured jobs (derived from `tier`).
*   `paymentStatus` (String): e.g., "Pending", "Paid", "Failed".

#### 8.2.2 Modifying the Job Posting Form (`EmployerDashboard.tsx`)

We will add a selection for the job posting tier and a simulated payment process.

```typescript
// ... (existing imports)
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EmployerDashboard = () => {
  // ... (existing states)
  const [jobTier, setJobTier] = useState("Standard"); // New state for job tier

  // ... (existing handlePostJob function)
  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = Parse.User.current();
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to post a job.',
        variant: 'destructive',
      });
      return;
    }

    const JobPosting = Parse.Object.extend('JobPosting');
    const jobPosting = new JobPosting();

    jobPosting.set('title', jobTitle);
    jobPosting.set('description', jobDescription);
    jobPosting.set('location', jobLocation);
    jobPosting.set('salaryRange', salaryRange);
    jobPosting.set('employmentType', employmentType);
    jobPosting.set('employer', currentUser);
    jobPosting.set('isActive', true);
    jobPosting.set('applicationDeadline', new Date(applicationDeadline));
    jobPosting.set('requiredSkills', requiredSkills.split(',').map(skill => skill.trim()));
    jobPosting.set('tier', jobTier); // Set the selected tier
    jobPosting.set('isFeatured', jobTier !== "Standard"); // Mark as featured if not standard
    jobPosting.set('paymentStatus', 'Pending'); // Initial payment status

    try {
      // Simulate payment process for premium tiers
      if (jobTier !== "Standard") {
        // In a real application, this would integrate with a payment gateway (e.g., Stripe)
        // For now, we'll simulate success after a delay.
        toast({
          title: "Processing Payment",
          description: `Processing payment for ${jobTier} job posting...`,
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
        jobPosting.set('paymentStatus', 'Paid');
        toast({
          title: "Payment Successful",
          description: `Your ${jobTier} job posting payment was successful!`, 
        });
      }

      await jobPosting.save();
      toast({
        title: 'Success',
        description: 'Job posted successfully!',
      });
      // Clear form and update state
      setJobTitle('');
      setJobDescription('');
      setJobLocation('');
      setSalaryRange('');
      setEmploymentType('');
      setApplicationDeadline('');
      setRequiredSkills('');
      setJobTier("Standard");
      setMyJobPostings(prev => [jobPosting, ...prev]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to post job.',
        variant: 'destructive',
      });
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* ... (existing dashboard header and tabs) ... */}

        <TabsContent value="post-job">
          <Card className="professional-card">
            <CardHeader>
              <CardTitle>Post a New Job</CardTitle>
              <CardDescription>Fill out the form below to create a new job posting.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostJob} className="space-y-4">
                {/* ... (existing job posting fields) ... */}
                <div>
                  <Label htmlFor="jobTier">Job Posting Tier</Label>
                  <Select value={jobTier} onValueChange={setJobTier}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard (Free)</SelectItem>
                      <SelectItem value="Featured">Featured ($10)</SelectItem>
                      <SelectItem value="Premium">Premium ($25)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="primary-button">Post Job</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ... (other tabs) ... */}
      </div>
    </div>
  );
};

export default EmployerDashboard;
```

#### 8.2.3 Displaying Premium Jobs (`JobSeekerDashboard.tsx`)

Job seekers can see which jobs are featured or premium, potentially with different styling.

```typescript
// ... (existing imports)

const JobSeekerDashboard = () => {
  // ... (existing states and useEffect)

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* ... (existing dashboard header and tabs) ... */}

        <TabsContent value="available-jobs">
          <h2 className="text-2xl font-bold mb-4">Available Job Postings</h2>
          {availableJobs.length === 0 ? (
            <p>No jobs available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableJobs.map(job => (
                <Card key={job.id} className={`professional-card ${job.get("isFeatured") ? "border-[--color-primary] border-2 shadow-lg" : ""}`}>
                  <CardHeader>
                    <CardTitle>{job.get("title")}</CardTitle>
                    <CardDescription>
                      {job.get("employer")?.get("companyName") || job.get("employer")?.get("username")} - {job.get("location")}
                      {job.get("isFeatured") && <Badge className="ml-2 bg-[--color-primary]">Featured</Badge>}
                      {/* Display Employer Reputation */}
                      {job.get("employer")?.get("did") && reputationContract && (
                        <EmployerReputationDisplay employerDID={job.get("employer").get("did")} reputationContract={reputationContract} />
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[--color-text-secondary] line-clamp-3">{job.get("description")}</p>
                    <p className="text-xs text-[--color-text-secondary] mt-2">Salary: {job.get("salaryRange")}</p>
                    <p className="text-xs text-[--color-text-secondary]">Type: {job.get("employmentType")}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={() => console.log("Apply for", job.id)}>
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ... (other tabs and dialogs) ... */}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
```

### 8.3 Future Monetization Expansion

Once the premium job posting model is stable, you can gradually introduce other monetization strategies:

*   **Subscription Management:** Integrate a full-fledged subscription service (e.g., Stripe Billing) to manage recurring payments for employer plans.
*   **On-chain Micro-payments:** If a native token is introduced, smart contracts can be developed to handle micro-payments for specific blockchain interactions, such as advanced credential verification or access to exclusive data.
*   **Advertising:** Contextual advertising for relevant services or products.

This phased approach allows for testing and refinement of each monetization model, ensuring a sustainable growth path for Trust Hire Chain.

