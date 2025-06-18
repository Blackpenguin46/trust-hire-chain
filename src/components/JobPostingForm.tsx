import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Job } from '../services/back4app';
import Parse from 'parse/dist/parse.min.js';
import { toast } from 'sonner';

const jobPostingSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  salaryRange: z.string().min(1, 'Salary range is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  applicationDeadline: z.string().min(1, 'Application deadline is required'),
  requiredSkills: z.string().min(1, 'Required skills are required'),
  tier: z.string().min(1, 'Job tier is required'),
});

type JobPostingFormData = z.infer<typeof jobPostingSchema>;

export function JobPostingForm() {
  const form = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salaryRange: '',
      employmentType: '',
      applicationDeadline: '',
      requiredSkills: '',
      tier: 'Standard',
    },
  });

  const onSubmit = async (data: JobPostingFormData) => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        toast.error('You must be logged in to post a job.');
        return;
      }

      const job = new Job();
      job.title = data.title;
      job.description = data.description;
      job.location = data.location;
      job.salaryRange = data.salaryRange;
      job.employmentType = data.employmentType;
      job.applicationDeadline = new Date(data.applicationDeadline);
      job.requiredSkills = data.requiredSkills.split(',').map(skill => skill.trim());
      job.employer = currentUser;
      job.isActive = true;
      job.tier = data.tier;
      job.isFeatured = data.tier !== 'Standard';
      job.paymentStatus = 'Pending';

      // Simulate payment process for premium tiers
      if (data.tier !== 'Standard') {
        toast.info(`Processing payment for ${data.tier} job posting...`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
        job.paymentStatus = 'Paid';
        toast.success(`Your ${data.tier} job posting payment was successful!`);
      }

      await job.save();
      toast.success('Job posted successfully!');
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to post job.');
      console.error('Error posting job:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed job description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter job location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salaryRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Range</FormLabel>
              <FormControl>
                <Input placeholder="Enter salary range" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applicationDeadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requiredSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter required skills separated by commas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Posting Tier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Standard">Standard (Free)</SelectItem>
                  <SelectItem value="Featured">Featured ($10)</SelectItem>
                  <SelectItem value="Premium">Premium ($25)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Post Job
        </Button>
      </form>
    </Form>
  );
}