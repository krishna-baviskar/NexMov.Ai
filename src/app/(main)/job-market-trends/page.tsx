
'use client';

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  analyzeJobMarketTrends,
  type AnalyzeJobMarketTrendsOutput,
} from "@/ai/flows/analyze-job-market-trends";
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
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Cpu, MapPin, DollarSign, BrainCircuit, Building } from "lucide-react";
import { ThreeDLoader } from "@/components/ui/3d-loader";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  domain: z.string().min(1, "Please enter a job domain."),
  location: z.string().min(1, "Please enter a location."),
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--muted))"];

export default function JobMarketTrendsPage() {
  const [user] = useAuthState(auth);
  const [trends, setTrends] = useState<AnalyzeJobMarketTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      location: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setTrends(null);
    try {
      const result = await analyzeJobMarketTrends(data);
      setTrends(result);
    } catch (error) {
      console.error("Failed to analyze job market trends:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pieData = trends
    ? [
        { name: "Domain Demand", value: trends.demandPercentage },
        { name: "Other", value: 100 - trends.demandPercentage },
      ]
    : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              {user ? `Hello ${user.displayName}, Welcome to Job Market Trends` : "Job Market Trends"}
            </h1>
            <p className="text-muted-foreground mt-2">
                Get AI-powered insights into the job market for any domain and location.
            </p>
        </div>

        <Card>
          <CardContent className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
              >
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Domain</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineering" {...field} />
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
                        <Input placeholder="e.g., Remote" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:col-span-2 lg:col-span-1">
                  {isLoading ? (
                    <ThreeDLoader className="w-6 h-6 -ml-2 mr-2" />
                  ) : (
                    <BarChart3 className="mr-2 h-4 w-4" />
                  )}
                  Analyze Trends
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <ThreeDLoader />
          </div>
        )}

        {trends ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp/> Domain Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          name === 'Domain Demand' ? `${(percent * 100).toFixed(0)}%` : ''
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value, name) => [`${value}%`, name]}/>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3/> Trending Role Demand</CardTitle>
                    <CardDescription>Demand score for top roles in the domain.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[350px]">
                        <ResponsiveContainer>
                            <RechartsBarChart data={trends.trendingRoles} layout="vertical" margin={{ top: 5, right: 20, left: 150, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0,100]} />
                                <YAxis dataKey="name" type="category" width={150} interval={0} />
                                <RechartsTooltip />
                                <Bar dataKey="demand" fill="hsl(var(--primary))" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign/> Salary Ranges</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{trends.salaryRanges}</p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin/> Location Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{trends.locationBasedOpportunities}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Cpu/> Emerging Technologies</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {trends.emergingTechnologies.map((tech, i) => <Badge key={i} variant="secondary">{tech}</Badge>)}
              </CardContent>
            </Card>

            <Card className="md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit/> Key Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {trends.keySkills.map((skill, i) => <Badge key={i} variant="outline">{skill}</Badge>)}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building/> Top Companies Hiring</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {trends.topCompanies.map((company, i) => <Badge key={i}>{company}</Badge>)}
              </CardContent>
            </Card>

          </div>
        ) : (
          !isLoading && <div className="text-center text-muted-foreground py-16 flex items-center justify-center h-full min-h-96 rounded-lg border border-dashed"><p>Your trend analysis will appear here.</p></div>
        )}
      </div>
    </div>
  );
}