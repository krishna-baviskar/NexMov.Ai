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
import { Badge } from "@/components/ui/badge";
import { Loader2, Compass } from "lucide-react";

const formSchema = z.object({
  currentSkills: z.string().min(1, "Please list your current skills."),
  desiredCareerPath: z.string().min(1, "Please enter your desired career."),
  jobDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SkillGapAnalysisPage() {
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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-muted-foreground">
            Discover the skills you need to achieve your career goals.
          </p>
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

        <div className="space-y-4">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Identified skill gaps and suggested learning paths.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {analysis ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Skill Gaps</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skillGaps.split(",").map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Suggested Learning</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                      {analysis.suggestedLearningPaths}
                    </div>
                  </div>
                </div>
              ) : (
                !isLoading && (
                  <div className="text-center text-muted-foreground py-16">
                    <p>Your analysis will appear here.</p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
