
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  GraduationCap,
  Briefcase,
  Target,
  Calendar,
  MapPin,
  Phone,
  Check,
  AlertCircle,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
}

interface CareerInfo {
  currentStatus: string;
  educationLevel: string;
  fieldOfStudy: string;
  experience: string;
  careerGoals: string[];
  interests: string[];
}

interface AccountInfo {
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

interface FormData {
  personal: PersonalInfo;
  career: CareerInfo;
  account: AccountInfo;
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      location: ''
    },
    career: {
      currentStatus: '',
      educationLevel: '',
      fieldOfStudy: '',
      experience: '',
      careerGoals: [],
      interests: []
    },
    account: {
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      subscribeNewsletter: true
    }
  });

  const careerStatuses = [
    'High School Student (10th/12th)',
    'Undergraduate Student',
    'Graduate Student',
    'Recent Graduate',
    'Working Professional',
    'Career Switcher',
    'Competitive Exam Aspirant',
    'Freelancer',
    'Entrepreneur'
  ];

  const educationLevels = [
    '10th Grade',
    '12th Grade/High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate',
    'Professional Certification'
  ];

  const fieldsOfStudy = [
    'Computer Science & IT',
    'Engineering',
    'Business & Management',
    'Healthcare & Medicine',
    'Finance & Economics',
    'Marketing & Communications',
    'Design & Creative Arts',
    'Education',
    'Law',
    'Science & Research',
    'Other'
  ];

  const experienceLevels = [
    'No Experience',
    'Less than 1 year',
    '1-3 years',
    '3-5 years',
    '5-10 years',
    '10+ years'
  ];

  const careerGoalOptions = [
    'Get my first job',
    'Switch career paths',
    'Get promoted',
    'Start my own business',
    'Learn new skills',
    'Higher education',
    'Competitive exams',
    'Salary increase',
    'Work-life balance',
    'Remote work opportunities'
  ];

  const interestOptions = [
    'Artificial Intelligence',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'Cybersecurity',
    'Digital Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Entrepreneurship',
    'Design',
    'Research'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;
      size: number;
      pulse: number;
    }> = [];

    const colors = ['#00d4ff', '#7c3aed', '#ff006e', '#ffffff'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      if(!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        particle.pulse += 0.05;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;

        const scale = 800 / (800 + particle.z);
        const x2d = particle.x * scale + (canvas.width / 2) * (1 - scale);
        const y2d = particle.y * scale + (canvas.height / 2) * (1 - scale);
        const size = particle.size * scale * (1 + Math.sin(particle.pulse) * 0.3);
        const opacity = Math.min(scale * 2, 1) * (0.6 + Math.sin(particle.pulse) * 0.4);

        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
        gradient.addColorStop(0, particle.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, particle.color + Math.floor(opacity * 128).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, particle.color + '00');

        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        particles.slice(index + 1, index + 5).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const otherScale = 800 / (800 + other.z);
            const otherX2d = other.x * otherScale + (canvas.width / 2) * (1 - otherScale);
            const otherY2d = other.y * otherScale + (canvas.height / 2) * (1 - otherScale);
            
            const connectionOpacity = (1 - distance / 120) * 0.4 * Math.min(scale, otherScale);
            
            let connectionColor = '#7c3aed';
            if (currentStep === 1) connectionColor = '#00d4ff';
            else if (currentStep === 2) connectionColor = '#7c3aed';
            else if (currentStep === 3) connectionColor = '#ff006e';
            
            const connectionGradient = ctx.createLinearGradient(x2d, y2d, otherX2d, otherY2d);
            connectionGradient.addColorStop(0, connectionColor + Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0'));
            connectionGradient.addColorStop(1, connectionColor + '00');
            
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = connectionGradient;
            ctx.lineWidth = 2 * Math.min(scale, otherScale);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.personal.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.personal.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.personal.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personal.email)) newErrors.email = 'Invalid email format';
      if (!formData.personal.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.personal.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.personal.location.trim()) newErrors.location = 'Location is required';
    } else if (step === 2) {
      if (!formData.career.currentStatus) newErrors.currentStatus = 'Current status is required';
      if (!formData.career.educationLevel) newErrors.educationLevel = 'Education level is required';
      if (!formData.career.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
      if (!formData.career.experience) newErrors.experience = 'Experience level is required';
      if (formData.career.careerGoals.length === 0) newErrors.careerGoals = 'Select at least one career goal';
      if (formData.career.interests.length === 0) newErrors.interests = 'Select at least one interest';
    } else if (step === 3) {
      if (!formData.account.password) newErrors.password = 'Password is required';
      else if (formData.account.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.account.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.account.password !== formData.account.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.account.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.personal.email, formData.account.password);
      toast({
        title: "Account Created!",
        description: "You have successfully signed up. Welcome to Nexmov.AI!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updatePersonalData = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateCareerData = (field: keyof CareerInfo, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      career: { ...prev.career, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateAccountData = (field: keyof AccountInfo, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      account: { ...prev.account, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const getStepColor = (step: number) => {
    if (step === 1) return 'from-cyan-400 to-blue-600';
    if (step === 2) return 'from-purple-400 to-purple-600';
    return 'from-pink-400 to-red-600';
  };

  const getStepIcon = (step: number) => {
    if (step === 1) return <User className="w-6 h-6" />;
    if (step === 2) return <Target className="w-6 h-6" />;
    return <Lock className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className={`absolute inset-0 bg-gradient-radial ${
        currentStep === 1 ? 'from-cyan-500/10 via-blue-500/5' :
        currentStep === 2 ? 'from-purple-500/10 via-purple-500/5' :
        'from-pink-500/10 via-red-500/5'
      } to-transparent transition-all duration-1000 -z-5`} />

      <nav className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${getStepColor(currentStep)} rounded-xl flex items-center justify-center transition-all duration-500`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-white to-purple-600 bg-clip-text text-transparent">
              Nexmov.AI
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Already have an account? 
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-2">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-40 max-w-2xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                currentStep >= step 
                  ? `bg-gradient-to-r ${getStepColor(step)} border-transparent text-white scale-110` 
                  : 'border-gray-600 text-gray-400'
              }`}>
                {currentStep > step ? <Check className="w-6 h-6" /> : getStepIcon(step)}
              </div>
              {step < 3 && (
                <div className={`w-24 sm:w-32 h-1 mx-4 rounded-full transition-all duration-500 ${
                  currentStep > step ? `bg-gradient-to-r ${getStepColor(step)}` : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <span className={currentStep >= 1 ? 'text-cyan-400' : 'text-gray-400'}>Personal Info</span>
          <span className={currentStep >= 2 ? 'text-purple-400' : 'text-gray-400'}>Career Goals</span>
          <span className={currentStep >= 3 ? 'text-pink-400' : 'text-gray-400'}>Account Setup</span>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-280px)] p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(1)} rounded-2xl mx-auto mb-4 flex items-center justify-center transform hover:scale-110 transition-transform duration-500`}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    Personal Information
                  </h2>
                  <p className="text-gray-400">Let's start with the basics about you</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">First Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.personal.firstName}
                        onChange={(e) => updatePersonalData('firstName', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.firstName ? 'border-red-400' : 'border-white/10'
                        } rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.firstName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Last Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.personal.lastName}
                        onChange={(e) => updatePersonalData('lastName', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.lastName ? 'border-red-400' : 'border-white/10'
                        } rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.lastName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.personal.email}
                      onChange={(e) => updatePersonalData('email', e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                        errors.email ? 'border-red-400' : 'border-white/10'
                      } rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.personal.phone}
                        onChange={(e) => updatePersonalData('phone', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                          errors.phone ? 'border-red-400' : 'border-white/10'
                        } rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.personal.dateOfBirth}
                        onChange={(e) => updatePersonalData('dateOfBirth', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                          errors.dateOfBirth ? 'border-red-400' : 'border-white/10'
                        } rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all duration-300 text-white`}
                      />
                      {errors.dateOfBirth && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.dateOfBirth}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.personal.location}
                      onChange={(e) => updatePersonalData('location', e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                        errors.location ? 'border-red-400' : 'border-white/10'
                      } rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                      placeholder="City, State, Country"
                    />
                    {errors.location && (
                      <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(2)} rounded-2xl mx-auto mb-4 flex items-center justify-center transform hover:scale-110 transition-transform duration-500`}>
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Career Goals & Interests
                  </h2>
                  <p className="text-gray-400">Help us personalize your AI career guidance</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Current Status</label>
                  <div className="relative">
                    <select
                      value={formData.career.currentStatus}
                      onChange={(e) => updateCareerData('currentStatus', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border appearance-none ${
                        errors.currentStatus ? 'border-red-400' : 'border-white/10'
                      } rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300 text-white`}
                    >
                      <option value="" className="bg-gray-800">Select your current status</option>
                      {careerStatuses.map(status => (
                        <option key={status} value={status} className="bg-gray-800">{status}</option>
                      ))}
                    </select>
                    {errors.currentStatus && (
                      <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.currentStatus}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Education Level</label>
                    <div className="relative">
                      <select
                        value={formData.career.educationLevel}
                        onChange={(e) => updateCareerData('educationLevel', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border appearance-none ${
                          errors.educationLevel ? 'border-red-400' : 'border-white/10'
                        } rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300 text-white`}
                      >
                        <option value="" className="bg-gray-800">Select education level</option>
                        {educationLevels.map(level => (
                          <option key={level} value={level} className="bg-gray-800">{level}</option>
                        ))}
                      </select>
                      {errors.educationLevel && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.educationLevel}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Experience Level</label>
                    <div className="relative">
                      <select
                        value={formData.career.experience}
                        onChange={(e) => updateCareerData('experience', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border appearance-none ${
                          errors.experience ? 'border-red-400' : 'border-white/10'
                        } rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300 text-white`}
                      >
                        <option value="" className="bg-gray-800">Select experience level</option>
                        {experienceLevels.map(level => (
                          <option key={level} value={level} className="bg-gray-800">{level}</option>
                        ))}
                      </select>
                       {errors.experience && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.experience}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Field of Study/Interest</label>
                  <div className="relative">
                    <select
                      value={formData.career.fieldOfStudy}
                      onChange={(e) => updateCareerData('fieldOfStudy', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border appearance-none ${
                        errors.fieldOfStudy ? 'border-red-400' : 'border-white/10'
                      } rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300 text-white`}
                    >
                      <option value="" className="bg-gray-800">Select your field of study</option>
                      {fieldsOfStudy.map(field => (
                        <option key={field} value={field} className="bg-gray-800">{field}</option>
                      ))}
                    </select>
                     {errors.fieldOfStudy && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fieldOfStudy}</span>
                        </div>
                      )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Career Goals (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {careerGoalOptions.map(goal => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => updateCareerData('careerGoals', toggleArrayItem(formData.career.careerGoals, goal))}
                        className={`p-3 rounded-xl border transition-all duration-300 text-sm ${
                          formData.career.careerGoals.includes(goal)
                            ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/10'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                  {errors.careerGoals && (
                    <div className="flex items-center space-x-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.careerGoals}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Areas of Interest (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => updateCareerData('interests', toggleArrayItem(formData.career.interests, interest))}
                        className={`p-3 rounded-xl border transition-all duration-300 text-sm ${
                          formData.career.interests.includes(interest)
                            ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/10'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  {errors.interests && (
                    <div className="flex items-center space-x-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.interests}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(3)} rounded-2xl mx-auto mb-4 flex items-center justify-center transform hover:scale-110 transition-transform duration-500`}>
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
                    Secure Your Account
                  </h2>
                  <p className="text-gray-400">Create a strong password to protect your account</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.account.password}
                      onChange={(e) => updateAccountData('password', e.target.value)}
                      className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                        errors.password ? 'border-red-400' : 'border-white/10'
                      } rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && (
                      <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 space-y-1 pt-2">
                    <div className={`flex items-center space-x-2 ${formData.account.password.length >= 8 ? 'text-green-400' : ''}`}>
                      {formData.account.password.length >= 8 ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 border border-gray-400 rounded-full" />}
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${/[A-Z]/.test(formData.account.password) ? 'text-green-400' : ''}`}>
                      {/[A-Z]/.test(formData.account.password) ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 border border-gray-400 rounded-full" />}
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${/[0-9]/.test(formData.account.password) ? 'text-green-400' : ''}`}>
                      {/[0-9]/.test(formData.account.password) ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 border border-gray-400 rounded-full" />}
                      <span>One number</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.account.confirmPassword}
                      onChange={(e) => updateAccountData('confirmPassword', e.target.value)}
                      className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                        errors.confirmPassword ? 'border-red-400' : 'border-white/10'
                      } rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && (
                      <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={formData.account.agreeToTerms}
                      onChange={(e) => updateAccountData('agreeToTerms', e.target.checked)}
                      className={`w-5 h-5 mt-0.5 bg-white/5 border ${errors.agreeToTerms ? 'border-red-400' : 'border-white/10'} rounded focus:ring-2 focus:ring-pink-400`}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-400">
                      I agree to the{' '}
                      <button type="button" className="text-pink-400 hover:text-pink-300 transition-colors underline">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-pink-400 hover:text-pink-300 transition-colors underline">
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                   {errors.agreeToTerms && (
                    <div className="flex items-center space-x-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.agreeToTerms}</span>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="subscribeNewsletter"
                      checked={formData.account.subscribeNewsletter}
                      onChange={(e) => updateAccountData('subscribeNewsletter', e.target.checked)}
                      className="w-5 h-5 mt-0.5 bg-white/5 border border-white/10 rounded focus:ring-2 focus:ring-pink-400"
                    />
                    <label htmlFor="subscribeNewsletter" className="text-sm text-gray-400">
                      Subscribe to our newsletter for career tips, job alerts, and AI insights
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/10">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className={`flex items-center space-x-2 px-8 py-3 bg-gradient-to-r ${getStepColor(currentStep)} hover:scale-105 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-pink-400 to-red-600 hover:from-pink-500 hover:to-red-700 hover:scale-105 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Your Account</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="text-center mt-8 text-gray-400 text-sm space-y-2">
            <p>© 2025 Nexmov.AI. Your AI-Powered Career Navigator.</p>
            <p>Join thousands of professionals already accelerating their careers with AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

    