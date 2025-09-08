import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, TrendingUp, Wand2, Bot, Linkedin, Twitter, Github, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';

const features = [
    {
        title: 'Career Growth Planner',
        description: 'Generate 3-5 year career roadmaps with skill gap analysis, salary projections, and personalized AI advisor guidance for your dream job.',
        icon: <GraduationCap className="h-10 w-10" />,
    },
    {
        title: 'Job Trend Insights',
        description: 'Real-time insights on job demand, salary ranges by sector, and growth charts highlighting emerging and fading industries.',
        icon: <TrendingUp className="h-10 w-10" />,
    },
    {
        title: 'AI Course Advisor',
        description: 'Personalized course recommendations, certification paths, and structured learning journeys from beginner to expert level.',
        icon: <Wand2 className="h-10 w-10" />,
    },
    {
        title: 'Floating AI Chatbot',
        description: '24/7 career guidance with instant answers, integrated with roadmaps, job trends, and course recommendations.',
        icon: <Bot className="h-10 w-10" />,
    },
];

export default function LandingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-background text-foreground">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-background via-black/80 to-background opacity-90"></div>
            <div 
              className="absolute -z-10 -top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.2),transparent)] blur-3xl"
              style={{ animation: 'hero-float 8s ease-in-out infinite' }}
            ></div>
            <div 
              className="absolute -z-10 -bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--secondary)/0.2),transparent)] blur-3xl"
              style={{ animation: 'hero-float 10s ease-in-out infinite 2s' }}
            ></div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md">
                <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                        <Logo />
                        <span className="text-2xl font-bold gradient-text">Nexmov.AI</span>
                    </Link>
                    <nav className="hidden items-center gap-2 md:flex">
                        <Link href="#features"><Button variant="ghost">Features</Button></Link>
                        <Link href="#about"><Button variant="ghost">About</Button></Link>
                        <Link href="#contact"><Button variant="ghost">Contact</Button></Link>
                    </nav>
                     <div className="flex items-center gap-2">
                        <Link href="/login">
                          <Button variant="outline" className="border-primary/50 bg-primary/10 hover:bg-primary/20">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-primary/80 text-primary-foreground hover:bg-primary">
                                Get Started <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section id="hero" className="container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center">
                    <div className="max-w-4xl" style={{ animation: 'hero-float 6s ease-in-out infinite' }}>
                        <h1 className="text-4xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl" style={{ animation: 'subtle-glow 4s ease-in-out infinite' }}>
                            Navigate Your Career with <span className="gradient-text">AI Precision</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            Nexmov.AI is designed for students, job seekers, and professionals. Generate personalized career paths, discover skills, track job trends, and get curated news — all in one dashboard.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link href="/signup">
                                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                                    Find Your Nex Mov
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 sm:py-32">
                    <div className="container mx-auto max-w-5xl px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">What is Nexmov.AI?</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Nexmov.AI is a next-generation career navigation platform that adapts to your education, interests, and goals. It transforms complex career data into a clear, visual, and guided experience.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-8 md:grid-cols-2">
                             <div className="card-3d gradient-border-card">
                                <h3 className="gradient-text text-2xl font-bold">Our Mission</h3>
                                <p className="mt-2 text-muted-foreground">To make career guidance personalized, data-driven, and accessible to all, regardless of background.</p>
                             </div>
                             <div className="card-3d gradient-border-card">
                                <h3 className="gradient-text text-2xl font-bold">Our Vision</h3>
                                <p className="mt-2 text-muted-foreground">To create a world where every learner and professional has a personal AI mentor for navigating their future.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 sm:py-32">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Core Features</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Our powerful, AI-driven tools are designed to guide you at every stage of your career.
                            </p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                            {features.map((feature) => (
                                <div key={feature.title} className="card-3d gradient-border-card text-center items-center flex flex-col">
                                    <div className="mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-4 text-secondary">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                                    <p className="mt-2 flex-grow text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Contact Section */}
                <section id="contact" className="py-20 text-center sm:py-32">
                    <div className="container mx-auto max-w-2xl px-4">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Ready to Shape Your Future?</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           Join thousands of users building their dream careers with the power of AI. Your journey starts now.
                        </p>
                        <div className="mt-8">
                            <Link href="/signup">
                                 <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                                    Get Started for Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-white/10 bg-black/30 py-8 backdrop-blur-lg">
                <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                         <Logo />
                         <span className="font-semibold text-white">Nexmov.AI</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <Link href="#features" className="transition-colors hover:text-white">Features</Link>
                        <Link href="#about" className="transition-colors hover:text-white">About</Link>
                        <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
                        <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
                    </div>
                     <div className="flex gap-4">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-white"><Linkedin className="h-5 w-5"/></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-white"><Twitter className="h-5 w-5"/></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-white"><Github className="h-5 w-5"/></a>
                    </div>
                </div>
                 <div className="container mx-auto mt-6 text-center text-xs text-muted-foreground px-4">
                    © {new Date().getFullYear()} Nexmov.AI. All rights reserved.
                </div>
            </footer>
        </div>
    );
}