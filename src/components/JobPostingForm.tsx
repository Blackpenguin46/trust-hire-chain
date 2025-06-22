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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { supabaseAuthService } from '../services/supabaseAuth';

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
      tier: 'basic',
    },
  });

  const onSubmit = async (data: JobPostingFormData) => {
    try {
      const currentUser = await supabaseAuthService.getCurrentUser();
      if (!currentUser) {
        toast.error('You must be logged in to post a job.');
        return;
      }

      const jobData = {
        title: data.title,
        description: data.description,
        location: data.location,
        salary_range: data.salaryRange,
        employment_type: data.employmentType as any,
        application_deadline: data.applicationDeadline,
        required_skills: data.requiredSkills.split(',').map(skill => skill.trim()),
        employer_id: currentUser.id,
        is_active: true,
        tier: data.tier as any,
        is_featured: data.tier !== 'basic',
        payment_status: 'pending' as any
      };

      // Simulate payment process for premium tiers
      if (data.tier !== 'basic') {
        toast.info(`Processing payment for ${data.tier} job posting...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        jobData.payment_status = 'completed' as any;
        toast.success(`Your ${data.tier} job posting payment was successful!`);
      }

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) throw error;

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
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
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
                  <SelectItem value="basic">Basic (Free)</SelectItem>
                  <SelectItem value="featured">Featured ($10)</SelectItem>
                  <SelectItem value="premium">Premium ($25)</SelectItem>
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
