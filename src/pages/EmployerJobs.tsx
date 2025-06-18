import { JobList } from '../components/JobList';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmployerJobs() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Job Postings</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your job postings
            </p>
          </div>
          <Button asChild>
            <Link to="/post-job">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>
        <JobList showEmployerJobs />
      </div>
    </div>
  );
} 