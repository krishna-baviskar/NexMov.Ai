"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
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
} from "recharts";

const formSchema = z.object({
  currentProfile: z.string().min(1, "Please enter your current role."),
  skills: z.string().min(1, "Please list some of your skills."),
  careerInterests: z.string().min(1, "Please describe your career interests."),
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
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function CareerRoadmapPage() {
  const [roadmap, setRoadmap] = useState<GenerateCareerRoadmapOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentProfile: "",
      skills: "",
      careerInterests: "",
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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                Create Your Career Roadmap
            </h1>
            <p className="text-muted-foreground mt-2">
                Fill in your details and let our AI chart a path for your professional growth.
            </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="currentProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Role</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Junior Web Developer" {...field} />
                          </FormControl>
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
                            <Input placeholder="e.g., React, TypeScript" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="careerInterests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Career Interests</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Become a full-stack developer"
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
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
