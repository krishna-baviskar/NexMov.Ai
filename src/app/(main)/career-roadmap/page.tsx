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
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  currentProfile: z.string().min(1, "Please enter your current role."),
  skills: z.string().min(1, "Please list some of your skills."),
  careerInterests: z.string().min(1, "Please describe your career interests."),
});

type FormValues = z.infer<typeof formSchema>;

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
      // You can add a toast notification here to inform the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Your Career Roadmap
          </h1>
          <p className="text-muted-foreground">
            Fill in your details below and let our AI chart a potential path for
            your professional growth.
          </p>
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
                        <FormLabel>Current Role / Profile</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Junior Web Developer"
                            {...field}
                          />
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
                          <Input
                            placeholder="e.g., React, TypeScript, Node.js"
                            {...field}
                          />
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
                        <FormLabel>Career Interests & Goals</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., I'm interested in becoming a full-stack developer, possibly moving into a team lead role in the future. I enjoy working on user-facing products."
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
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Roadmap
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Your AI-Generated Roadmap</CardTitle>
              <CardDescription>
                Here is a potential roadmap based on your profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {roadmap ? (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {roadmap.roadmap}
                </div>
              ) : (
                !isLoading && (
                  <div className="text-center text-muted-foreground py-16">
                    <p>Your roadmap will appear here.</p>
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
