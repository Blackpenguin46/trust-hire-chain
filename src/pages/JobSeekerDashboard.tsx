import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Web3Navigation from '@/components/Web3Navigation';
import { Wallet, FileText } from 'lucide-react';

// Import ethers for blockchain interaction
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const JobSeekerDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState<Parse.Object[]>([]);
  const [myApplications, setMyApplications] = useState<Parse.Object[]>([]);
  const [selectedJob, setSelectedJob] = useState<Parse.Object | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

  // State for DID and VCs
  const [userDID, setUserDID] = useState<string | null>(null);
  const [verifiableCredentials, setVerifiableCredentials] = useState<any[]>([]); // Store VCs as objects

  // State for Reputation System
  const [reputationContract, setReputationContract] = useState<any>(null);

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

      // Fetch Available Jobs
      const JobPosting = Parse.Object.extend('JobPosting');
      const jobQuery = new Parse.Query(JobPosting);
      jobQuery.equalTo('isActive', true); // Only show active jobs
      jobQuery.include('employer'); // Include employer details
      jobQuery.descending('createdAt');

      try {
        const jobs = await jobQuery.find();
        setAvailableJobs(jobs);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch available jobs.',
          variant: 'destructive',
        });
        console.error('Error fetching available jobs:', error);
      }

      // Fetch My Applications
      const Application = Parse.Object.extend('Application');
      const applicationQuery = new Parse.Query(Application);
      applicationQuery.equalTo('jobSeeker', currentUser); // Filter by current job seeker
      applicationQuery.include('jobPosting'); // Include job posting details
      applicationQuery.include('jobPosting.employer'); // Include employer details for the job posting
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

      // Fetch User DID and VCs from Back4app
      setUserDID(currentUser.get('did') || null);
      setVerifiableCredentials(currentUser.get('verifiableCredentials') || []);
    };

    fetchJobSeekerData();
  }, [toast]);

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
      try {
        await parseFile.save();
        application.set('resume', parseFile);
      } catch (fileError: any) {
        toast({
          title: 'Error',
          description: fileError.message || 'Failed to upload resume.',
          variant: 'destructive',
        });
        console.error('Error uploading resume:', fileError);
        return;
      }
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
      // Refresh applications list
      const updatedApplications = await new Parse.Query(Application)
        .equalTo('jobSeeker', currentUser)
        .include('jobPosting')
        .include('jobPosting.employer')
        .descending('createdAt')
        .find();
      setMyApplications(updatedApplications);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application.',
        variant: 'destructive',
      });
      console.error('Error submitting application:', error);
    }
  };

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
                      <Button onClick={() => handleApplyClick(job)}>
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

      {/* Apply Job Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="professional-card">
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
              <Button type="submit" className="primary-button">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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


