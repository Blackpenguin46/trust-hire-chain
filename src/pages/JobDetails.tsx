
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Building, 
  Clock, 
  Users, 
  ArrowLeft,
  Send,
  Upload
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  applicants: number;
}

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);

  // Sample job data - in a real app, this would be fetched based on the ID
  const job: Job = {
    id: id || '1',
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA (Remote)",
    salary: "$90,000 - $130,000",
    type: "Full-time",
    description: `We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining user-facing web applications using modern JavaScript frameworks and libraries.

This role offers the opportunity to work on cutting-edge projects with a talented team of developers, designers, and product managers. You'll have the chance to influence technical decisions and mentor junior developers while working in a collaborative, agile environment.`,
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React, TypeScript, and modern JavaScript",
      "Experience with state management libraries (Redux, Zustand, etc.)",
      "Strong understanding of HTML5, CSS3, and responsive design",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Familiarity with build tools and bundlers (Webpack, Vite)",
      "Knowledge of version control systems (Git)",
      "Strong problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible working hours and remote work options",
      "Professional development budget ($2,000/year)",
      "Generous PTO and paid holidays",
      "401(k) matching up to 4%",
      "Modern equipment and home office setup allowance",
      "Team building events and company retreats"
    ],
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    applicants: 24
  };

  const handleApply = async (formData: FormData) => {
    setIsApplying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsApplying(false);
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent successfully. We'll be in touch soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                    <CardDescription className="text-lg flex items-center gap-2 mt-2">
                      <Building className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Posted {job.postedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {job.applicants} applicants
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
                <CardDescription>
                  Join our team and make an impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  Application deadline: {job.applicationDeadline}
                </div>
                
                <Separator />
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to submit your application
                      </DialogDescription>
                    </DialogHeader>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleApply(formData);
                      }}
                      className="space-y-4 mt-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea
                          id="coverLetter"
                          name="coverLetter"
                          placeholder="Tell us why you're interested in this position..."
                          className="min-h-[100px]"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume</Label>
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isApplying}
                      >
                        {isApplying ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">{job.company}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      A leading technology company focused on building innovative solutions 
                      for the modern workplace.
                    </p>
                  </div>
                  <Separator />
                  <div className="text-sm text-gray-600">
                    <p>Industry: Technology</p>
                    <p>Company Size: 50-200 employees</p>
                    <p>Founded: 2018</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <h4 className="font-medium text-sm">Frontend Developer</h4>
                    <p className="text-xs text-gray-600">StartupXYZ • Remote</p>
                  </div>
                  <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <h4 className="font-medium text-sm">React Developer</h4>
                    <p className="text-xs text-gray-600">TechFlow • New York</p>
                  </div>
                  <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <h4 className="font-medium text-sm">Full Stack Engineer</h4>
                    <p className="text-xs text-gray-600">DevCorp • San Francisco</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}

export default JobDetails; 
=======
};
>>>>>>> 1c7fb8b1e8b240f30edde2e7822dc9487cc15a9a
