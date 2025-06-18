import { ApplicationManager } from '../components/ApplicationManager';

export function EmployerApplications() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-2">
            Manage and review job applications from candidates
          </p>
        </div>
        <ApplicationManager />
      </div>
    </div>
  );
} 