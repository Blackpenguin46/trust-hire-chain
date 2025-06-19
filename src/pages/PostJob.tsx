import { JobPostingForm } from '../components/JobPostingForm';

export function PostJob() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <JobPostingForm />
        </div>
      </div>
    </div>
  );
}

export default PostJob; 