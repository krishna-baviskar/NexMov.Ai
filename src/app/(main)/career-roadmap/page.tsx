"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateCareerRoadmap,
  type GenerateCareerRoadmapOutput,
} from "@/ai/flows/generate-career-roadmap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  Book,
  Target,
  Rocket,
  Lightbulb,
  CheckCircle,
  BarChart,
  PieChart as PieChartIcon,
  PartyPopper,
  DollarSign,
} from "lucide-react";
import { ThreeDLoader } from "@/components/ui/3d-loader";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as RechartsBarChart,
  LineChart,
  Line,
} from "recharts";

const careerStatuses = [
    'High School Student (10th/12th)', 'Undergraduate Student', 'Graduate Student', 'Recent Graduate', 'Working Professional', 'Career Switcher', 'Competitive Exam Aspirant', 'Freelancer', 'Entrepreneur'
];
const educationLevels = [
    '10th Grade', '12th Grade/High School', 'Diploma', "Bachelor's Degree", "Master's Degree", 'PhD/Doctorate', 'Professional Certification'
];
const fieldsOfStudy = [
    'Computer Science & IT', 'Engineering', 'Business & Management', 'Healthcare & Medicine', 'Finance & Economics', 'Marketing & Communications', 'Design & Creative Arts', 'Education', 'Law', 'Science & Research', 'Other'
];
const experienceLevels = [
    'No Experience', 'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'
];
const careerGoalOptions = [
    'Get my first job', 'Switch career paths', 'Get promoted', 'Start my own business', 'Learn new skills', 'Higher education', 'Competitive exams', 'Salary increase', 'Work-life balance', 'Remote work opportunities'
];
const interestOptions = [
    'Artificial Intelligence', 'Data Science', 'Web Development', 'Mobile Development', 'Cybersecurity', 'Digital Marketing', 'Finance', 'Healthcare', 'Education', 'Entrepreneurship', 'Design', 'Research'
];

const formSchema = z.object({
  currentStatus: z.string().min(1, "Please select your current status."),
  educationLevel: z.string().min(1, "Please select your education level."),
  fieldOfStudy: z.string().min(1, "Please select your field of study."),
  experience: z.string().min(1, "Please select your experience level."),
  skills: z.string().min(1, "Please list some of your skills."),
  careerGoals: z.array(z.string()).min(1, "Please select at least one career goal."),
  interests: z.array(z.string()).min(1, "Please select at least one interest."),
});

type FormValues = z.infer<typeof formSchema>;

const ICONS = [
  <Book className="w-6 h-6 text-primary" />,
  <Target className="w-6 h-6 text-primary" />,
  <Rocket className="w-6 h-6 text-primary" />,
  <Lightbulb className="w-6 h-6 text-primary" />,
  <CheckCircle className="w-6 h-6 text-primary" />,
];

const PIE_COLORS = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))",
];

export default function CareerRoadmapPage() {
  const [roadmap, setRoadmap] = useState<GenerateCareerRoadmapOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentStatus: "",
      educationLevel: "",
      fieldOfStudy: "",
      experience: "",
      skills: "",
      careerGoals: [],
      interests: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRoadmap(null);
    try {
      const result = await generateCareerRoadmap(data);
      setRoadmap(result);
    } catch (error) {
      console.error("Failed to generate career roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleArrayItem = (field: 'careerGoals' | 'interests', value: string) => {
    const currentValues = form.getValues(field);
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    form.setValue(field, newValues, { shouldValidate: true });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                Create Your Career Roadmap
            </h1>
            <p className="text-muted-foreground mt-2">
                Fill in your details and let our AI chart a path for your professional growth and salary potential.
            </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Provide details for a more accurate roadmap.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                        control={form.control}
                        name="currentStatus"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Current Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select your status" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {careerStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="educationLevel"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Education Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {educationLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fieldOfStudy"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Field of Study</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select your field" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {fieldsOfStudy.map(field => <SelectItem key={field} value={field}>{field}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {experienceLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Skills</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., React, TypeScript, SQL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="careerGoals"
                      render={() => (
                        <FormItem>
                          <FormLabel>Career Goals</FormLabel>
                          <div className="flex flex-wrap gap-2">
                            {careerGoalOptions.map(goal => (
                                <Button
                                key={goal}
                                type="button"
                                variant={form.getValues("careerGoals").includes(goal) ? "default" : "outline"}
                                onClick={() => toggleArrayItem("careerGoals", goal)}
                                >
                                {goal}
                                </Button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <FormLabel>Interests</FormLabel>
                          <div className="flex flex-wrap gap-2">
                            {interestOptions.map(interest => (
                                <Button
                                key={interest}
                                type="button"
                                variant={form.getValues("interests").includes(interest) ? "default" : "outline"}
                                onClick={() => toggleArrayItem("interests", interest)}
                                >
                                {interest}
                                </Button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <ThreeDLoader className="w-6 h-6 -ml-2 mr-2" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Generate Roadmap
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {isLoading && (
              <div className="flex justify-center items-center h-full min-h-96">
                <ThreeDLoader />
              </div>
            )}
            {roadmap ? (
              <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart/> Career Timeline</CardTitle>
                        <CardDescription>Estimated duration for each step in your roadmap.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-80">
                            <ResponsiveContainer>
                                <RechartsBarChart data={roadmap.timeline} margin={{ top: 5, right: 20, left: -10, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} tick={{ fontSize: 12 }} />
                                    <YAxis label={{ value: 'Months', angle: -90, position: 'insideLeft' }} />
                                    <RechartsTooltip />
                                    <Bar dataKey="duration" fill="hsl(var(--primary))" />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><DollarSign/> Salary Progression</CardTitle>
                        <CardDescription>Estimated annual salary based on your roadmap milestones.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-80">
                            <ResponsiveContainer>
                                <LineChart data={roadmap.salaryProgression} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="milestone" />
                                    <YAxis 
                                      label={{ value: 'Salary (USD)', angle: -90, position: 'insideLeft' }}
                                      tickFormatter={(value) => `$${(value as number / 1000)}k`} 
                                    />
                                    <RechartsTooltip formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)} />
                                    <Legend />
                                    <Line type="monotone" dataKey="estimatedSalary" stroke="hsl(var(--accent))" strokeWidth={2} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PieChartIcon/> Skill Distribution</CardTitle>
                        <CardDescription>Recommended focus areas for skill development.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="w-full h-64">
                         <ResponsiveContainer>
                            <PieChart>
                                <Pie data={roadmap.skillDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {roadmap.skillDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                         </ResponsiveContainer>
                       </div>
                    </CardContent>
                </Card>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-4">Your AI-Generated Roadmap</h2>
                  <div className="space-y-6 border-l-2 border-border pl-6">
                    {roadmap.roadmap.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-9 top-0 bg-background border-2 border-primary rounded-full p-1.5">
                            {ICONS[index % ICONS.length]}
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle>{step.title}</CardTitle>
                            <CardDescription>Est. Duration: {step.duration}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{step.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {step.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                     <div className="relative">
                        <div className="absolute -left-9 top-0 bg-background border-2 border-primary rounded-full p-1.5">
                            <PartyPopper className="w-6 h-6 text-primary" />
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Roadmap Complete!</CardTitle>
                            <CardDescription>Congratulations!</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">You've reached the end of your personalized roadmap. Keep learning and growing!</p>
                          </CardContent>
                        </Card>
                      </div>
                  </div>
                </div>

              </div>
            ) : (
              !isLoading && (
                <div className="text-center text-muted-foreground py-16 flex items-center justify-center h-full min-h-96 rounded-lg border border-dashed">
                  <p>Your roadmap and charts will appear here.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
