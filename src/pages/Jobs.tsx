import { JobList } from '../components/JobList';

export function Jobs() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground mt-2">
            Browse through our curated list of job opportunities
          </p>
        </div>
        <JobList />
      </div>
    </div>
  );
}

export default Jobs; 