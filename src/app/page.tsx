import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    GraduationCap, 
    TrendingUp, 
    Wand2, 
    Bot, 
    Users, 
    CheckCircle,
    Mail,
    Phone,
    MapPin,
    Heart,
    Linkedin, 
    Twitter, 
    Github, 
    ChevronRight,
    Target
} from 'lucide-react';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const features = [
    {
        title: 'Career Growth Planner + AI Advisor',
        description: 'Generates 3-5 year career roadmaps with skill gap analysis, salary projections, and a real-time AI advisor to answer your career questions.',
        icon: <Target className="h-10 w-10" />,
    },
    {
        title: 'Job Trend Insights',
        description: 'Get real-time insights on job demand, salary ranges by sector, and growth charts highlighting emerging and fading industries.',
        icon: <TrendingUp className="h-10 w-10" />,
    },
    {
        title: 'AI Course Advisor',
        description: 'Receive personalized course recommendations, certification paths, and structured learning journeys from beginner to expert level.',
        icon: <Wand2 className="h-10 w-10" />,
    },
    {
        title: 'AI-Curated Career News',
        description: 'Get daily updates on career skills, industry trends, exam news, and scholarship opportunities tailored to your profile.',
        icon: <GraduationCap className="h-10 w-10" />,
    },
    {
        title: 'Floating AI Chatbot',
        description: 'An always-on assistant to answer complex career questions instantly, integrated with all platform data.',
        icon: <Bot className="h-10 w-10" />,
    },
     {
        title: 'Why Choose Nexmov.AI?',
        description: 'A visual-first, modular platform that works for students, graduates, and professionals, powered by cutting-edge AI.',
        icon: <CheckCircle className="h-10 w-10" />,
    },
];

const whoCanUse = [
    {
        title: '10th / 12th Pass Students',
        description: 'Explore higher education options and future-proof career pathways.',
        icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
        title: 'Undergraduates & Graduates',
        description: 'Plan internships, projects, and crucial skill upgrades to build a powerful profile.',
        icon: <GraduationCap className="h-8 w-8 text-primary" />,
    },
    {
        title: 'Job Switchers',
        description: 'Identify new roles, analyze salary ranges, and map out your future career path confidently.',
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
    },
    {
        title: 'Competitive Exam Aspirants',
        description: 'Track exam news, important updates, and get AI-driven preparation strategies.',
        icon: <Wand2 className="h-8 w-8 text-primary" />,
    },
]

export default function LandingPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-background via-black/80 to-background opacity-90"></div>
            <div 
              className="absolute -z-10 -top-1/4 left-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.15),transparent)] blur-3xl md:h-[500px] md:w-[500px]"
              style={{ animation: 'hero-float 8s ease-in-out infinite' }}
            ></div>
            <div 
              className="absolute -z-10 -bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--secondary)/0.15),transparent)] blur-3xl md:h-[500px] md:w-[500px]"
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
                        <Link href="#about"><Button variant="ghost">About</Button></Link>
                        <Link href="#features"><Button variant="ghost">Features</Button></Link>
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

            <main className="flex-1 z-10 w-full flex flex-col">
                {/* Hero Section */}
                <section id="hero" className="container relative z-10 flex min-h-[calc(80vh)] flex-col items-center justify-center text-center py-12 md:py-20">
                     <div className="max-w-4xl" style={{ animation: 'hero-float 6s ease-in-out infinite' }}>
                        <div className="mb-4 text-primary font-bold tracking-wider">Your AI-Powered Career Navigator</div>
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animation: 'subtle-glow 4s ease-in-out infinite' }}>
                           Navigate Your Career with AI-Powered Precision
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
                            From university to the C-suite, get a personalized, data-driven roadmap to achieve your professional goals faster. Nexmov.AI is your dedicated co-pilot for smarter career decisions.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                                    Start Your Journey
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 sm:py-24 w-full">
                    <div className="container mx-auto max-w-5xl px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">What is Nexmov.AI?</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                Nexmov.AI is a next-generation AI-powered career navigation platform that adapts to your education level, interests, and goals. It generates personalized roadmaps, skill-building advice, market insights, and curated news in real time.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
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
                <section id="features" className="py-16 sm:py-24 w-full">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Everything You Need to Succeed</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                               Our powerful, AI-driven features are designed to guide your career at every stage.
                            </p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.title} className="card-3d gradient-border-card text-center items-center flex flex-col">
                                    <div className="mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-4 text-primary">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                                    <p className="mt-2 flex-grow text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Who It's For Section */}
                <section id="who-is-it-for" className="py-16 sm:py-24 w-full">
                    <div className="container mx-auto max-w-6xl px-4">
                         <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Tailored for Every Ambition</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                No matter where you are in your career journey, Nexmov.AI has a plan for you.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {whoCanUse.map((item) => (
                                <Card key={item.title} className="bg-card/50 backdrop-blur-sm border-primary/20 text-center p-6">
                                    <div className="flex justify-center mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                 {/* Founder Section */}
                <section id="founder" className="py-16 sm:py-24 w-full">
                    <div className="container mx-auto max-w-4xl px-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">About Our Founder</h2>
                        <div className="mt-8 card-3d gradient-border-card">
                            <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
                                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0 border-2 border-primary">
                                  <Heart className="w-16 h-16 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg text-muted-foreground italic">
                                        "Nexmov.AI was created because we saw students and professionals struggle with uncertainty in their next step. With AI, we wanted to create clarity, confidence, and a visual roadmap for everyone."
                                    </p>
                                    <p className="mt-4 font-bold text-white text-lg">
                                       Founder & CEO
                                    </p>
                                     <p className="text-muted-foreground">
                                        Experts in AI, EdTech, and Career Guidance solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Contact Section */}
                <section id="contact" className="py-16 sm:py-24 w-full">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Get in Touch</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Have questions? We'd love to hear from you.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 text-primary" />
                                    <div>
                                        <h4 className="font-bold text-white">General Inquiries</h4>
                                        <a href="mailto:support@nexmov.ai" className="text-muted-foreground hover:text-primary">support@nexmov.ai</a>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <Wand2 className="w-6 h-6 text-primary" />
                                    <div>
                                        <h4 className="font-bold text-white">Partnerships & Business</h4>
                                        <a href="mailto:partners@nexmov.ai" className="text-muted-foreground hover:text-primary">partners@nexmov.ai</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-6 h-6 text-primary" />
                                     <div>
                                        <h4 className="font-bold text-white">Phone</h4>
                                        <p className="text-muted-foreground">+91-XXXXXXXXXX</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-6 h-6 text-primary" />
                                    <div>
                                        <h4 className="font-bold text-white">Office Address</h4>
                                        <p className="text-muted-foreground">[Insert Full Address Here]</p>
                                    </div>
                                </div>
                            </div>
                            <form className="space-y-4">
                                 <Input type="text" placeholder="Full Name" required className="bg-background/50" />
                                 <Input type="email" placeholder="Email Address" required className="bg-background/50" />
                                 <Input type="text" placeholder="Subject" required className="bg-background/50" />
                                 <Textarea placeholder="Your Message" required className="bg-background/50 min-h-32" />
                                 <Button type="submit" className="w-full bg-primary/80 text-primary-foreground hover:bg-primary">Send Message</Button>
                            </form>
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
                        <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="transition-colors hover:text-white">Terms of Use</Link>
                        <Link href="/careers" className="transition-colors hover:text-white">Careers</Link>
                        <Link href="#contact" className="transition-colors hover:text-white">Contact</Link>
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
