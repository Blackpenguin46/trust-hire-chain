import { useState, useEffect } from 'react';
import Parse from '../services/back4app';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Loader2, FileText, Calendar, User, MessageSquare, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface Application {
  id: string;
  jobPosting: Parse.Object;
  jobSeeker: Parse.Object;
  status: string;
  coverLetter: string;
  resume?: Parse.File;
  createdAt: Date;
  interviewDate?: Date;
  notes?: string;
}

export function ApplicationManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewNotes, setInterviewNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error('You must be logged in to view applications');
      }

      // Get all job postings by the current employer
      const JobPosting = Parse.Object.extend('JobPosting');
      const jobQuery = new Parse.Query(JobPosting);
      jobQuery.equalTo('employer', currentUser);
      const employerJobs = await jobQuery.find();
      const jobIds = employerJobs.map(job => job.id);

      // Get all applications for these jobs
      const Application = Parse.Object.extend('Application');
      const applicationQuery = new Parse.Query(Application);
      const innerJobQuery = new Parse.Query(JobPosting);
      innerJobQuery.containedIn('objectId', jobIds);
      applicationQuery.matchesQuery('jobPosting', innerJobQuery);
      applicationQuery.include('jobPosting');
      applicationQuery.include('jobSeeker');
      applicationQuery.descending('createdAt');

      const results = await applicationQuery.find();
      setApplications(results.map(app => ({
        id: app.id,
        jobPosting: app.get('jobPosting'),
        jobSeeker: app.get('jobSeeker'),
        status: app.get('status'),
        coverLetter: app.get('coverLetter'),
        resume: app.get('resume'),
        createdAt: app.createdAt,
        interviewDate: app.get('interviewDate'),
        notes: app.get('notes')
      })));
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const Application = Parse.Object.extend('Application');
      const query = new Parse.Query(Application);
      const application = await query.get(applicationId);
      
      application.set('status', newStatus);
      await application.save();

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));

      toast.success('Application status updated');
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const handleScheduleInterview = async () => {
    if (!selectedApplication || !interviewDate) {
      toast.error('Please select a date for the interview');
      return;
    }

    try {
      const Application = Parse.Object.extend('Application');
      const query = new Parse.Query(Application);
      const application = await query.get(selectedApplication.id);
      
      application.set('status', 'Interview Scheduled');
      application.set('interviewDate', new Date(interviewDate));
      application.set('notes', interviewNotes);
      await application.save();

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id ? {
          ...app,
          status: 'Interview Scheduled',
          interviewDate: new Date(interviewDate),
          notes: interviewNotes
        } : app
      ));

      toast.success('Interview scheduled successfully');
      setIsInterviewDialogOpen(false);
      setInterviewDate('');
      setInterviewNotes('');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast.error('Failed to schedule interview');
    }
  };

  const getStatusColor = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'Pending':
        return 'default';
      case 'Interview Scheduled':
        return 'secondary';
      case 'Accepted':
        return 'outline';
      case 'Rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const filteredApplications = statusFilter === 'all'
    ? applications
    : applications.filter(app => app.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Applications</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {application.jobPosting.get('title')}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {application.jobSeeker.get('username')}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Applied {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                    {application.interviewDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Interview: {new Date(application.interviewDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Cover Letter</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {application.coverLetter}
                  </p>
                </div>
                {application.resume && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <a
                      href={application.resume.url()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                )}
                {application.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-muted-foreground">{application.notes}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {application.status === 'Pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedApplication(application);
                          setIsInterviewDialogOpen(true);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Schedule Interview
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(application.id, 'Accepted')}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(application.id, 'Rejected')}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isInterviewDialogOpen} onOpenChange={setIsInterviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Set up an interview with {selectedApplication?.jobSeeker.get('username')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="interviewDate">Interview Date</Label>
              <Input
                id="interviewDate"
                type="datetime-local"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interviewNotes">Notes</Label>
              <Textarea
                id="interviewNotes"
                placeholder="Add any additional notes or instructions for the interview..."
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInterviewDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleScheduleInterview}>
              Schedule Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 