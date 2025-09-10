
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  performSkillGapAnalysis,
  type PerformSkillGapAnalysisOutput,
} from "@/ai/flows/perform-skill-gap-analysis";
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
import {
  Compass,
  BookOpen,
  Codepen,
  FileText,
  HelpCircle,
  BarChart,
  Radar,
  Star,
  Link as LinkIcon,
  Video,
} from "lucide-react";
import { ThreeDLoader } from "@/components/ui/3d-loader";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar as RechartsBar,
} from "recharts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  currentSkills: z.string().min(1, "Please list your current skills."),
  desiredCareerPath: z.string().min(1, "Please enter your desired career."),
  jobDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RESOURCE_ICONS = {
  "Online Course": <Video className="w-4 h-4 text-accent" />,
  "Book": <BookOpen className="w-4 h-4 text-accent" />,
  "Project": <Codepen className="w-4 h-4 text-accent" />,
  "Article": <FileText className="w-4 h-4 text-accent" />,
  "Other": <HelpCircle className="w-4 h-4 text-accent" />,
};

export default function SkillGapAnalysisPage() {
  const [user] = useAuthState(auth);
  const [analysis, setAnalysis] =
    useState<PerformSkillGapAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSkills: "",
      desiredCareerPath: "",
      jobDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await performSkillGapAnalysis(data);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to perform skill gap analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const radarData = analysis?.requiredSkills.map(skill => {
    const currentUserSkill = analysis.currentSkills.find(s => s.name === skill.name);
    return {
      skill: skill.name,
      required: skill.level,
      current: currentUserSkill ? currentUserSkill.level : 0,
    };
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                {user ? `Hello ${user.displayName}, Welcome to Your Skill Gap Analysis` : "Skill Gap Analysis"}
            </h1>
            <p className="text-muted-foreground mt-2">
                Discover the skills you need to achieve your career goals with AI-driven insights.
            </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Input</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="currentSkills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Current Skills</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Python, SQL, Data Analysis"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="desiredCareerPath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Career Path</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Data Scientist"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Example Job Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste a job description for a more accurate analysis."
                              className="min-h-32"
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
                        <Compass className="mr-2 h-4 w-4" />
                      )}
                      Analyze Skills
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {isLoading && (
              <div className="flex justify-center items-center h-full min-h-96">
                <ThreeDLoader />
              </div>
            )}
            {analysis ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Radar /> Skill Comparison
                    </CardTitle>
                    <CardDescription>
                      Your current skill levels vs. required levels for your target role.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-80">
                      <ResponsiveContainer>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <RechartsRadar name="Required" dataKey="required" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                          <RechartsRadar name="Current" dataKey="current" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
                          <Legend />
                          <RechartsTooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart /> Skill Gap Importance
                    </CardTitle>
                    <CardDescription>
                      The importance of the skills you need to develop.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <RechartsBarChart data={analysis.skillGaps} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0,5]} ticks={[1,2,3,4,5]}/>
                                <YAxis dataKey="name" type="category" width={100} />
                                <RechartsTooltip />
                                <RechartsBar dataKey="importance" fill="hsl(var(--accent))" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                 <Card>
                  <CardHeader>
                    <CardTitle>Suggested Learning Resources</CardTitle>
                    <CardDescription>
                      Curated resources to help you bridge your skill gaps.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {analysis.suggestedLearningResources.map((resource, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-lg border bg-secondary/50">
                           <div className="flex-shrink-0">
                                {RESOURCE_ICONS[resource.category] || <HelpCircle className="w-4 h-4 text-accent" />}
                           </div>
                           <div className="flex-1">
                                <h4 className="font-semibold">{resource.title}</h4>
                                <p className="text-sm text-muted-foreground">{resource.category}</p>
                           </div>
                           <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="icon">
                                    <LinkIcon className="w-4 h-4" />
                                </Button>
                           </a>
                        </div>
                     ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              !isLoading && (
                <div className="text-center text-muted-foreground py-16 flex items-center justify-center h-full min-h-96 rounded-lg border border-dashed">
                  <p>Your analysis and charts will appear here.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
