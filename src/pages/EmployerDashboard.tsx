import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Users, Building } from 'lucide-react';
import Web3Navigation from '@/components/Web3Navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import ethers for blockchain interaction
import { ethers } from 'ethers';

const EmployerDashboard = () => {
  const [myJobPostings, setMyJobPostings] = useState<Parse.Object[]>([]);
  const [myApplications, setMyApplications] = useState<Parse.Object[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Parse.Object | null>(null);
  const [isVerifyVCDialogOpen, setIsVerifyVCDialogOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const { toast } = useToast();

  // State for Job Posting Form
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [jobTier, setJobTier] = useState("Standard"); // New state for job tier

  // State for Reputation System
  const [reputationContract, setReputationContract] = useState<any>(null);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [jobSeekerToRate, setJobSeekerToRate] = useState<Parse.Object | null>(null);
  const [ratingScore, setRatingScore] = useState<number>(0);

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

      // Fetch Job Postings
      const JobPosting = Parse.Object.extend('JobPosting');
      const jobQuery = new Parse.Query(JobPosting);
      jobQuery.equalTo('employer', currentUser);
      jobQuery.descending('createdAt');

      try {
        const jobs = await jobQuery.find();
        setMyJobPostings(jobs);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch job postings.',
          variant: 'destructive',
        });
        console.error('Error fetching job postings:', error);
      }

      // Fetch Applications for my jobs
      const Application = Parse.Object.extend('Application');
      const applicationQuery = new Parse.Query(Application);
      applicationQuery.include('jobPosting'); // Include job details
      applicationQuery.include('jobSeeker'); // Include job seeker details
      
      // Get job postings IDs by the current employer
      const employerJobIds = jobs.map(job => job.id);
      if (employerJobIds.length > 0) {
        const innerJobQuery = new Parse.Query(JobPosting);
        innerJobQuery.containedIn('objectId', employerJobIds);
        applicationQuery.matchesQuery('jobPosting', innerJobQuery);
      } else {
        // If no jobs posted, no applications to fetch
        setMyApplications([]);
        return;
      }

      applicationQuery.descending('createdAt');

      try {
        const applications = await applicationQuery.find();
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

    fetchEmployerData();
  }, [toast, myJobPostings.length]); // Re-run if job postings change to update applications

  useEffect(() => {
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
      // Add new job to state
      setMyJobPostings(prev => [jobPosting, ...prev]);
      // Clear form
      setJobTitle('');
      setJobDescription('');
      setJobLocation('');
      setSalaryRange('');
      setEmploymentType('');
      setApplicationDeadline('');
      setRequiredSkills('');
      setJobTier("Standard");
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to post job.',
        variant: 'destructive',
      });
      console.error('Error posting job:', error);
    }
  };

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
            {/* Add more tabs as needed for verification, messages, settings */}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="professional-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <FileText className="h-4 w-4 text-[--color-text-secondary]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {myJobPostings.filter(j => j.get('isActive')).length}
                  </div>
                  <p className="text-xs text-[--color-text-secondary]">
                    Total active job postings
                  </p>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <Users className="h-4 w-4 text-[--color-text-secondary]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myApplications.length}</div>
                  <p className="text-xs text-[--color-text-secondary]">
                    Across all your jobs
                  </p>
                </CardContent>
              </Card>

              {/* Add more overview cards as needed */}
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest candidate applications for your jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myApplications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg border-[--border]">
                        <div>
                          <h3 className="font-semibold">{app.get('jobSeeker')?.get('username')}</h3>
                          <p className="text-sm text-[--color-text-secondary]">{app.get('jobPosting')?.get('title')}</p>
                        </div>
                        <Badge className={getStatusColor(app.get('status'))}>
                          {app.get('status')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="professional-card">
                <CardHeader>
                  <CardTitle>Your Active Job Postings</CardTitle>
                  <CardDescription>Currently active job listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myJobPostings.filter(j => j.get('isActive')).slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg border-[--border]">
                        <div>
                          <h3 className="font-semibold">{job.get('title')}</h3>
                          <p className="text-sm text-[--color-text-secondary]">{job.get('location')}</p>
                        </div>
                        <Badge className={getStatusColor(job.get('isActive') ? 'Active' : 'Closed')}>
                          {job.get('isActive') ? 'Active' : 'Closed'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="post-job">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
                <CardDescription>Fill out the form below to create a new job posting.</CardDescription>
              </CardHeader>
              <CardContent>
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

          <TabsContent value="jobs">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Job Management</CardTitle>
                <CardDescription>Create and manage your job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myJobPostings.length === 0 ? (
                    <p>You haven't posted any jobs yet.</p>
                  ) : (
                    myJobPostings.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg border-[--border]">
                        <div>
                          <h3 className="font-semibold">{job.get('title')}</h3>
                          <p className="text-sm text-[--color-text-secondary]">{job.get('location')} • Posted {new Date(job.get('createdAt')).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(job.get('isActive') ? 'Active' : 'Closed')}>
                            {job.get('isActive') ? 'Active' : 'Closed'}
                          </Badge>
                          <Button variant="destructive" size="sm" onClick={() => handleDeactivateJob(job.id)}>
                            Deactivate
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
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
                          <Button variant="outline" size="sm" onClick={() => handleRateJobSeekerClick(app.get('jobSeeker'))}>
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

          {/* Placeholder for other tabs */}
          <TabsContent value="verification">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Credential Verification</CardTitle>
                <CardDescription>Blockchain-powered credential verification system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[--color-primary]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[--color-primary]">
                    🔗
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Blockchain Verification Active</h3>
                  <p className="text-[--color-text-secondary]">All candidate credentials are automatically verified through our blockchain network</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Secure communication with candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[--color-text-secondary]">No new messages</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
                <CardDescription>Manage your company profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="primary-button">Update Company Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

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
    </div>
  );
};

export default EmployerDashboard;


