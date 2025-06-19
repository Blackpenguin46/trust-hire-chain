import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Job } from '../services/back4app';
import Parse from '../services/back4app';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Loader2, ArrowLeft, Calendar, MapPin, Briefcase, DollarSign, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../services/auth';
import { blockchainService } from '../services/blockchain';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employerReputation, setEmployerReputation] = useState<number | null>(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const query = new Parse.Query(Job);
      const jobDetails = await query.get(id!);
      setJob(jobDetails);

      // Fetch employer's reputation score if they have a wallet address
      const employer = jobDetails.get('employer');
      const employerWalletAddress = employer.get('walletAddress');
      if (employerWalletAddress) {
        try {
          const score = await blockchainService.getReputationScore(employerWalletAddress);
          setEmployerReputation(score);
        } catch (error) {
          console.error('Error fetching employer reputation:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Failed to load job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!authService.isAuthenticated()) {
      toast.error('You must be logged in to apply for jobs');
      navigate('/auth');
      return;
    }

    setIsApplyDialogOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Resume file size must be less than 5MB');
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmitApplication = async () => {
    if (!job || !coverLetter.trim()) {
      toast.error('Please provide a cover letter');
      return;
    }

    setIsSubmitting(true);
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error('You must be logged in to apply for jobs');
      }

      // Create application object
      const Application = Parse.Object.extend('Application');
      const application = new Application();

      application.set('jobPosting', job);
      application.set('jobSeeker', currentUser);
      application.set('status', 'Pending');
      application.set('coverLetter', coverLetter);

      // Upload resume if provided
      if (resumeFile) {
        const parseFile = new Parse.File(resumeFile.name, resumeFile);
        await parseFile.save();
        application.set('resume', parseFile);
      }

      // Save application to Back4App
      await application.save();

      // Submit application to blockchain if job is verified
      if (job.get('isVerified')) {
        await blockchainService.applyForJob(parseInt(job.id));
      }

      toast.success('Application submitted successfully!');
      setIsApplyDialogOpen(false);
      setCoverLetter('');
      setResumeFile(null);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate('/jobs')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.employmentType}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salaryRange}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {job.isFeatured && (
                <Badge variant="secondary">Featured</Badge>
              )}
              {job.isVerified && (
                <Badge variant="default">Verified</Badge>
              )}
            </div>
          </div>

          {employerReputation !== null && (
            <Card>
              <CardHeader>
                <CardTitle>Employer Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Score: {employerReputation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Deadline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleApply}>
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Please provide your cover letter and resume to complete your application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Explain why you're a good fit for this position..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF or Word)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                {resumeFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {resumeFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApplyDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitApplication}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default JobDetails; 