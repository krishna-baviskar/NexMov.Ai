
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase, TrendingUp, Bot, GraduationCap, ChevronRight, Linkedin, Twitter, Github, Wand2, Users, Rocket } from 'lucide-react';
import { Logo } from '@/components/icons';
import Image from 'next/image';
import { ThreeDLoader } from '@/components/ui/3d-loader';

const features = [
    {
        id: 'career_growth_planner',
        title: 'AI Career Planner',
        description: 'Visualize a 5-year roadmap with AI-driven advice on skill gaps, salary projections, and key milestones.',
        icon: <GraduationCap className="w-8 h-8 text-primary" />,
    },
    {
        id: 'job_trends',
        title: 'Real-Time Job Insights',
        description: 'Stay ahead with live data on job demand, salaries, and emerging roles, tailored to your interests.',
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
        id: 'course_advisor',
        title: 'Personalized Learning Paths',
        description: 'Receive curated courses, certifications, and projects to bridge your skill gaps effectively.',
        icon: <Wand2 className="w-8 h-8 text-primary" />,
    },
    {
        id: 'chatbot',
        title: '24/7 AI Career Advisor',
        description: 'Your on-demand AI assistant for instant, structured answers to all your career questions.',
        icon: <Bot className="w-8 h-8 text-primary" />,
    },
];

const whyChooseUsPoints = [
    'Personalized guidance for students, graduates, and job switchers.',
    'Powered by cutting-edge Google Gemini for unparalleled insights.',
    'Interactive dashboards with timelines, charts, and news.',
    'Modular tools that work together or standalone.',
    'Seamless experience with an always-on AI assistant.',
];

const userTypes = [
    {
        type: 'Students (10th/12th)',
        value: 'Guidance on higher education, entrance exams, and future-proof career paths.',
        icon: <GraduationCap className="w-6 h-6 text-accent" />
    },
    {
        type: 'Undergraduates',
        value: 'Roadmaps for internships, skill-building, and creating a strong project portfolio.',
        icon: <Briefcase className="w-6 h-6 text-accent" />
    },
    {
        type: 'Job Switchers',
        value: 'In-depth skill gap analysis, salary projections, and new role recommendations.',
        icon: <Users className="w-6 h-6 text-accent" />
    },
    {
        type: 'Exam Aspirants',
        value: 'Personalized study paths, AI-curated resources, and timely exam updates.',
        icon: <Rocket className="w-6 h-6 text-accent" />
    },
];

export default function LandingPage() {
    return (
        <div className="relative flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
            <Image
                src="https://picsum.photos/1920/1280"
                alt="Abstract AI background"
                fill
                className="object-cover"
                data-ai-hint="abstract technology"
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-bold">Nexmov.AI</span>
                    </Link>
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Features
                        </Link>
                        <Link href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            About
                        </Link>
                        <Link href="#who" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                           Who It's For
                        </Link>
                    </nav>
                     <div className="flex items-center gap-2">
                        <Link href="/login">
                          <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button>
                                Get Started <ChevronRight className="ml-1 h-4 w-4 hidden sm:inline" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 z-10">
                {/* Hero Section */}
                <section className="container grid lg:grid-cols-2 place-items-center gap-12 px-4 py-20 text-center lg:text-left sm:py-32">
                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                           Navigate Your Future with <span className='text-primary'>AI-Powered</span> Career Guidance
                        </h1>
                        <p className="max-w-2xl text-lg text-gray-300 sm:text-xl">
                            From high school students to seasoned professionals, Nexmov.AI helps you plan, learn, and grow with real-time, personalized AI insights.
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg" className="mt-4">
                                Find Your Next Move <Rocket className="ml-2"/>
                            </Button>
                        </Link>
                    </div>
                    <div className="w-full max-w-sm lg:max-w-none h-64 lg:h-96">
                        <ThreeDLoader/>
                    </div>
                </section>
                

                {/* About Section */}
                <section id="about" className="py-20 sm:py-28 bg-secondary/80 backdrop-blur-md">
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What is Nexmov.AI?</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                            Nexmov.AI is a next-generation, AI-powered career guidance platform. It personalizes career planning, learning paths, and industry insights using Google Gemini. Whether you’re a student exploring higher studies, a graduate aiming for internships, or a professional planning your growth, Nexmov.AI adapts to your needs and provides a clear, visual roadmap to success.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="container py-20 sm:py-28 px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything You Need to Succeed</h2>
                        <p className="text-gray-300 mt-2 text-lg">Our powerful, AI-driven features are designed to guide your career at every stage.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        {features.map((feature) => (
                            <Card key={feature.id} className="flex flex-col bg-secondary/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105 duration-300">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">{feature.icon}</div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-secondary/80 backdrop-blur-md sm:py-28">
                    <div className="container grid gap-12 px-4 md:grid-cols-2 items-center">
                        <div className="relative w-full h-80 rounded-lg overflow-hidden">
                           <Image 
                                src="https://picsum.photos/600/400" 
                                alt="Professional working on a laptop"
                                fill
                                className="object-cover"
                                data-ai-hint="professional development"
                            />
                        </div>
                        <div>
                             <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">Why Choose Nexmov.AI?</h2>
                             <ul className="space-y-4">
                                {whyChooseUsPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <span className="text-muted-foreground">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Who It's For Section */}
                <section id="who" className="py-20 sm:py-28">
                    <div className="container px-4">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tailored for Every Ambition</h2>
                             <p className="text-gray-300 mt-2 text-lg">No matter where you are in your career journey, Nexmov.AI has a plan for you.</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {userTypes.map((user) => (
                                <Card key={user.type} className="bg-secondary/50 backdrop-blur-sm border-primary/10 text-center flex flex-col items-center">
                                    <CardHeader>
                                        <div className='mx-auto bg-accent/10 p-3 rounded-full mb-2'>{user.icon}</div>
                                        <CardTitle>{user.type}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{user.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="py-20 bg-primary/90 text-primary-foreground">
                    <div className="container text-center px-4">
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to Shape Your Future?</h2>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">Join thousands of users who are building their dream careers with the power of AI. Your journey starts now.</p>
                        <Link href="/dashboard">
                            <Button variant="secondary" size="lg" className="text-lg">
                                Find Your Nex Mov <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>

            <footer className="z-10 bg-secondary/80 backdrop-blur-md text-secondary-foreground py-8">
                <div className="container flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                         <Logo />
                         <span className="font-semibold">Nexmov.AI</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-sm mb-4 md:mb-0">
                        <Link href="#features" className="hover:underline">Features</Link>
                        <Link href="#about" className="hover:underline">About</Link>
                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="hover:underline">Terms of Use</Link>
                    </div>
                     <div className="flex gap-4">
                        <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 hover:text-primary transition-colors"/></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 hover:text-primary transition-colors"/></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 hover:text-primary transition-colors"/></a>
                    </div>
                </div>
                 <div className="container text-center mt-6 text-xs text-muted-foreground px-4">
                    © 2024 Nexmov.AI. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
