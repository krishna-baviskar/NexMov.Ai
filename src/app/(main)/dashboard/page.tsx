import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCommit, Compass, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Career Roadmap",
    description: "Generate a personalized career roadmap with AI-driven insights and salary projections.",
    href: "/career-roadmap",
    icon: <GitCommit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Skill Gap Analysis",
    description: "Identify skill gaps for your desired career path and get learning suggestions.",
    href: "/skill-gap-analysis",
    icon: <Compass className="w-8 h-8 text-primary" />,
  },
  {
    title: "Job Market Trends",
    description: "Analyze current job market trends, salaries, and in-demand skills.",
    href: "/job-market-trends",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Welcome to <span className="text-primary">NexMov.AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered co-pilot for navigating your career path. Explore our tools to unlock your potential.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.href}
              className="hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">{feature.icon}</div>
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{feature.description}</CardDescription>
                <Link href={feature.href}>
                  <Button variant="outline" className="w-full">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-12 bg-secondary/10">
          <CardHeader>
            <CardTitle>Networking & Experience</CardTitle>
            <CardDescription>Discover opportunities to grow your network and gain experience.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-semibold mb-1">AI in Tech Summit</h4>
              <p className="text-sm text-muted-foreground">Join industry leaders to discuss the future of AI. San Francisco, CA.</p>
            </div>
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-semibold mb-1">React Developers Community</h4>
              <p className="text-sm text-muted-foreground">An online community to share, learn, and network with React experts.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
