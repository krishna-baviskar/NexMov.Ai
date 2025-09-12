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
  Briefcase,
  Quote,
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
  TooltipProps,
  LabelList,
} from "recharts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useIsMobile } from "@/hooks/use-mobile";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

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
  customCareerGoal: z.string().optional(),
  interests: z.array(z.string()).min(1, "Please select at least one interest."),
  customInterest: z.string().optional(),
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

const CURRENCY_RATES = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.78,
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

type Currency = keyof typeof CURRENCY_RATES;

const CustomTooltip = ({ active, payload, label, currency }: TooltipProps<ValueType, NameType> & { currency: Currency }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-sm">{data.milestone}</span>
            <span className="font-bold text-lg">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(data.estimatedSalary)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Custom Tooltip for Career Timeline
const CareerTimelineTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-sm max-w-[200px] sm:max-w-[250px]">
        <div className="flex flex-col space-y-1">
          {/* First line: Step name */}
          <span className="font-medium text-sm leading-tight break-words">
            {data.name}
          </span>
          {/* Second line: Duration */}
          <span className="text-muted-foreground text-xs">
            Duration: {payload[0].value} Months
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CareerRoadmapPage() {
  const [user] = useAuthState(auth);
  const [roadmap, setRoadmap] = useState<GenerateCareerRoadmapOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("INR");
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentStatus: "",
      educationLevel: "",
      fieldOfStudy: "",
      experience: "",
      skills: "",
      careerGoals: [],
      customCareerGoal: "",
      interests: [],
      customInterest: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRoadmap(null);

    const combinedGoals = [...data.careerGoals];
    if (data.customCareerGoal) {
      combinedGoals.push(data.customCareerGoal);
    }

    const combinedInterests = [...data.interests];
    if (data.customInterest) {
      combinedInterests.push(data.customInterest);
    }

    try {
      const result = await generateCareerRoadmap({
        ...data,
        careerGoals: combinedGoals,
        interests: combinedInterests,
      });
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

  const convertedSalaryProgression = roadmap?.salaryProgression.map(item => ({
    ...item,
    estimatedSalary: item.estimatedSalary * CURRENCY_RATES[selectedCurrency],
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatAxis = (value: number) => {
    const symbol = CURRENCY_SYMBOLS[selectedCurrency];
    if (value >= 10000000) return `${symbol}${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${symbol}${(value / 100000).toFixed(0)}L`;
    if (value >= 1000) return `${symbol}${(value / 1000).toFixed(0)}k`;
    return `${symbol}${value}`;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                {user ? `Hello!! ${user.displayName}, Welcome to Your Career Roadmap` : "Create Your Career Roadmap"}
            </h1>
            <p className="text-muted-foreground mt-2">
                Fill in your details and let our AI chart a path for your professional growth and salary potential.
            </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
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
                                size="sm"
                                className="text-xs"
                                >
                                {goal}
                                </Button>
                            ))}
                          </div>
                           <FormField
                            control={form.control}
                            name="customCareerGoal"
                            render={({ field }) => (
                              <FormItem className="mt-2">
                                <FormControl>
                                  <Input placeholder="Or type a custom goal..." {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
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
                                size="sm"
                                className="text-xs"
                                >
                                {interest}
                                </Button>
                            ))}
                          </div>
                          <FormField
                            control={form.control}
                            name="customInterest"
                            render={({ field }) => (
                              <FormItem className="mt-2">
                                <FormControl>
                                  <Input placeholder="Or type a custom interest..." {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading} className="w-full">
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Roadmap
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
            {isLoading && (
              <div className="flex justify-center items-center h-full min-h-96">
                <ThreeDLoader />
              </div>
            )}
            {roadmap ? (
              <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase/> Suggested Career Options</CardTitle>
                        <CardDescription>Based on your profile, here are some roles you could explore.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {roadmap.careerOptions.map((option, index) => (
                            <div key={index} className="p-4 rounded-lg border bg-secondary/10">
                                <h4 className="font-bold text-lg">{option.role}</h4>
                                <p className="text-muted-foreground">{option.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* UPDATED CAREER TIMELINE CHART */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart/> Career Timeline</CardTitle>
                        <CardDescription>Estimated duration for each step in your roadmap.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-[350px] sm:h-[450px] md:h-[550px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={roadmap.timeline} margin={{ top: 30, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />

                                    {/* UPDATED TOOLTIP - Mobile Responsive with Custom Content */}
                                    <RechartsTooltip content={<CareerTimelineTooltip />} />

                                    {/* Bar component */}
                                    <Bar dataKey="duration" fill="hsl(var(--accent))">
                                        <LabelList
                                            dataKey="duration"
                                            position="top"
                                            formatter={(value: number, props: any) => {
                                                if (props && props.payload) {
                                                    const stepName = props.payload.name;
                                                    // For mobile, show shorter labels on bars
                                                    return isMobile ? `${value}M` : `${stepName}: ${value} Months`;
                                                }
                                                return `${value} Months`;
                                            }}
                                            style={{ 
                                                fontSize: isMobile ? 8 : 10, 
                                                fill: 'hsl(var(--foreground))' 
                                            }}
                                        />
                                    </Bar>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                {/* END UPDATED CAREER TIMELINE CHART */}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle className="flex items-center gap-2"><DollarSign/> Salary Progression</CardTitle>
                                <CardDescription>Estimated annual salary based on your roadmap milestones.</CardDescription>
                            </div>
                            <Select onValueChange={(value) => setSelectedCurrency(value as Currency)} defaultValue={selectedCurrency}>
                                <SelectTrigger className="w-full sm:w-[100px]">
                                    <SelectValue placeholder="Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(CURRENCY_RATES).map(currency => (
                                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-[450px]">
                            <ResponsiveContainer>
                                <LineChart data={convertedSalaryProgression} margin={{ top: 5, right: 30, left: 20, bottom: 110 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="milestone"
                                      interval={0}
                                      angle={-45}
                                      textAnchor="end"
                                      height={120}
                                      tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                      label={{ value: `Salary (${selectedCurrency})`, angle: -90, position: 'insideLeft', offset: -15 }}
                                      tickFormatter={formatAxis}
                                      tick={{ fontSize: 12 }}
                                      width={80}
                                    />
                                    <RechartsTooltip content={<CustomTooltip currency={selectedCurrency} />} />
                                    <Legend verticalAlign="top" wrapperStyle={{paddingBottom: '1rem'}} />
                                    <Line type="monotone" dataKey="estimatedSalary" name="Estimated Salary" stroke="hsl(var(--accent))" strokeWidth={2} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-muted-foreground text-center italic mt-2">
                            Note: Salary projections are estimates and may vary based on company, location, and individual skills.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PieChartIcon/> Skill Distribution</CardTitle>
                        <CardDescription>Recommended focus areas for skill development.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="w-full h-[350px] sm:h-96">
                         <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={roadmap.skillDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={isMobile ? 80 : 100}
                                    label
                                >
                                {roadmap.skillDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend
                                    layout={isMobile ? 'horizontal' : 'vertical'}
                                    verticalAlign={isMobile ? 'bottom' : 'middle'}
                                    align={isMobile ? 'center' : 'right'}
                                    wrapperStyle={
                                        isMobile
                                        ? { paddingTop: '20px', fontSize: '12px' }
                                        : { paddingLeft: '1rem', flexWrap: 'wrap', maxWidth: 150 }
                                    }
                                />
                            </PieChart>
                         </ResponsiveContainer>
                       </div>
                    </CardContent>
                </Card>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-4">Your AI-Generated Roadmap</h2>
                  <div className="space-y-6 border-l-2 border-border pl-6 md:pl-8">
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
                            <Quote className="w-6 h-6 text-primary" />
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Final Advice</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground italic">"{roadmap.finalAdvice}"</p>
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
