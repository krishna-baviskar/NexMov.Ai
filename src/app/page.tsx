
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase, TrendingUp, Bot, GraduationCap, ChevronRight, Linkedin, Twitter, Github } from 'lucide-react';
import { Logo } from '@/components/icons';
import Image from 'next/image';

const features = [
    {
        id: 'career_growth_planner',
        title: 'Career Growth Planner + AI Advisor',
        description: 'Visualize a 3-5 year roadmap tailored to your profile. Identify skill gaps, salary projections, and milestones. Get AI-driven advice and Q&A support directly inside the planner.',
        icon: <GraduationCap className="w-8 h-8 text-primary" />,
    },
    {
        id: 'job_trends',
        title: 'Job Trend Insights',
        description: 'Stay updated on real-time job demand, salaries, and emerging roles across industries. Gemini analyzes market data and aligns it with your skills and interests.',
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
        id: 'course_advisor',
        title: 'AI Course Advisor',
        description: 'Discover structured learning paths with recommended courses, certifications, and projects. Gemini curates resources based on your goals and missing skills.',
        icon: <Briefcase className="w-8 h-8 text-primary" />,
    },
    {
        id: 'career_news',
        title: 'AI-Curated Career News',
        description: 'Access daily AI-curated news cards about skill trends, career shifts, and exam updates. Personalized feeds help you stay ahead in your chosen field.',
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
        id: 'chatbot',
        title: 'Floating AI Chatbot',
        description: 'Ask any career-related question and get instant, structured responses. The chatbot integrates all modules, delivering answers with visual insights.',
        icon: <Bot className="w-8 h-8 text-primary" />,
    },
];

const whyChooseUsPoints = [
    'Tailored for everyone: 10th/12th pass students, graduates, job switchers, and exam aspirants.',
    'Powered by Google Gemini API for real-time, AI-driven insights.',
    'Engaging dashboards with timelines, charts, news cards, and advisors.',
    'Independent modules that can work standalone or in combination.',
    'Seamless user experience with a floating AI assistant.',
];

const userTypes = [
    {
        type: '10th/12th Pass',
        value: 'Guidance on higher education, entrance exams, and career paths.',
    },
    {
        type: 'Undergraduate Students',
        value: 'Roadmaps for internships, skill-building, and project portfolios.',
    },
    {
        type: 'Job Switchers',
        value: 'Skill gap analysis, salary projections, and new role recommendations.',
    },
    {
        type: 'Competitive Exam Aspirants',
        value: 'Exam preparation news, study paths, and AI-curated resources.',
    },
];

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground" style={{backgroundImage: "url('https://picsum.photos/1920/1080')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-bold">Nexmov.AI</span>
                    </Link>
                    <nav className="hidden items-center gap-4 md:flex">
                        <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Features
                        </Link>
                        <Link href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            About
                        </Link>
                        <Link href="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Docs
                        </Link>
                    </nav>
                    <Link href="/dashboard">
                        <Button>
                            Find Your Nex Mov <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 bg-black/50">
                {/* Hero Section */}
                <section className="container grid items-center gap-6 pt-12 pb-12 md:grid-cols-2 lg:pt-24 lg:pb-24">
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                            AI-Driven Career Guidance for Every Step of Your Journey
                        </h1>
                        <p className="max-w-[700px] text-lg text-gray-200 sm:text-xl">
                            From high school students to job switchers, Nexmov.AI helps you plan, learn, and grow with real-time AI insights.
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg">Find Your Nex Mov</Button>
                        </Link>
                    </div>
                    <div>
                        <Image 
                            src="https://picsum.photos/600/401" 
                            alt="AI-driven career growth illustration"
                            width={600}
                            height={401} 
                            className="rounded-lg shadow-2xl"
                            data-ai-hint="career growth technology"
                        />
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 bg-secondary/90">
                    <div className="container max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">What is Nexmov.AI?</h2>
                        <p className="text-muted-foreground text-lg">
                            Nexmov.AI is a next-generation AI-powered career guidance platform. It personalizes career planning, learning paths, and industry insights using Google Gemini AI. Whether you’re a 10th pass student exploring higher studies, a graduate aiming for internships, a job switcher planning growth, or a competitive exam aspirant, Nexmov.AI adapts to your needs and gives you a clear, visual roadmap.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="container py-24">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Powerful Features to Guide Your Career</h2>
                        <p className="text-gray-300 mt-2">Everything you need to plan your next move and achieve your professional goals.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.id} className="flex flex-col bg-secondary/90">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">{feature.icon}</div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-24 bg-secondary/90">
                    <div className="container grid gap-12 md:grid-cols-2 items-center">
                        <div>
                             <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Nexmov.AI?</h2>
                             <ul className="space-y-4">
                                {whyChooseUsPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <span className="text-muted-foreground">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <Image 
                                src="https://picsum.photos/500/500" 
                                alt="Dashboard interface"
                                width={500}
                                height={500} 
                                className="rounded-lg shadow-2xl"
                                data-ai-hint="dashboard interface"
                            />
                        </div>
                    </div>
                </section>

                {/* User Types Section */}
                <section className="py-24">
                    <div className="container">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-white">Who Can Use Nexmov.AI?</h2>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {userTypes.map((user) => (
                                <Card key={user.type} className="bg-secondary/90">
                                    <CardHeader>
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
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to shape your future with AI?</h2>
                        <Link href="/dashboard">
                            <Button variant="secondary" size="lg">
                                Find Your Nex Mov <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>

            <footer className="bg-secondary text-secondary-foreground py-8">
                <div className="container flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                         <Logo />
                         <span className="font-semibold">Nexmov.AI</span>
                    </div>
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <Link href="/docs" className="text-sm hover:underline">Documentation</Link>
                        <Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm hover:underline">Terms of Use</Link>
                        <Link href="/contact" className="text-sm hover:underline">Contact Us</Link>
                    </div>
                     <div className="flex gap-4">
                        <a href="https://linkedin.com/company/nexmov-ai" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5"/></a>
                        <a href="https://twitter.com/nexmov_ai" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5"/></a>
                        <a href="https://github.com/nexmov-ai" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5"/></a>
                    </div>
                </div>
                 <div className="container text-center mt-6 text-xs text-muted-foreground">
                    © 2025 Nexmov.AI. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
