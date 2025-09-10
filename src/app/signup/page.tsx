
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
  Calendar,
  MapPin,
  Phone,
  Check,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Logo } from '@/components/icons';


interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
}

interface AccountInfo {
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

interface FormData {
  personal: PersonalInfo;
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
    account: {
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      subscribeNewsletter: true
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Get computed styles for CSS variables
    const computedStyle = getComputedStyle(document.body);
    const primaryColor = computedStyle.getPropertyValue('--primary').trim();
    const secondaryColor = computedStyle.getPropertyValue('--secondary').trim();
    const accentColor = computedStyle.getPropertyValue('--accent').trim();
    const whiteColor = '#ffffff';

    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      s /= 100;
      l /= 100;
      const k = (n: number) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
      return [255 * f(0), 255 * f(8), 255 * f(4)];
    };
    
    const parseHsl = (hslStr: string): string => {
        if (hslStr.startsWith('#')) return hslStr;
        const [h, s, l] = hslStr.split(' ').map(parseFloat);
        const [r, g, b] = hslToRgb(h, s, l);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const colors = [
        parseHsl(primaryColor), 
        parseHsl(secondaryColor),
        parseHsl(accentColor),
        whiteColor
    ].filter(c => c);


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

    const colorWithOpacity = (color: string, alpha: number) => {
        if (color.startsWith('rgb')) {
            return color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        }
        return color;
    };

    const animate = () => {
      if(!ctx) return;
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
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
        gradient.addColorStop(0, colorWithOpacity(particle.color, opacity));
        gradient.addColorStop(0.5, colorWithOpacity(particle.color, opacity * 0.5));
        gradient.addColorStop(1, colorWithOpacity(particle.color, 0));

        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = colorWithOpacity(particle.color, opacity);
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
            
            let connectionColor = parseHsl(secondaryColor);
            if (currentStep === 1) connectionColor = parseHsl(primaryColor);
            else if (currentStep === 2) connectionColor = parseHsl(accentColor);
            
            const connectionGradient = ctx.createLinearGradient(x2d, y2d, otherX2d, otherY2d);
            connectionGradient.addColorStop(0, colorWithOpacity(connectionColor, connectionOpacity));
            connectionGradient.addColorStop(1, colorWithOpacity(connectionColor, 0));
            
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
      setCurrentStep(prev => Math.min(prev + 1, 2));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.personal.email, formData.account.password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${formData.personal.firstName} ${formData.personal.lastName}`,
        });
      }
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

  const updateAccountData = (field: keyof AccountInfo, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      account: { ...prev.account, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStepColor = (step: number) => {
    if (step === 1) return 'from-primary to-secondary';
    return 'from-accent to-pink-500';
  };

  const getFocusRingColor = (step: number) => {
    if (step === 1) return 'focus:ring-primary';
    return 'focus:ring-accent';
  };

  const getStepIcon = (step: number) => {
    if (step === 1) return <User className="w-6 h-6" />;
    return <Lock className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className={`absolute inset-0 bg-gradient-radial ${
        currentStep === 1 ? 'from-primary/10 via-secondary/5' :
        'from-accent/10 via-pink-500/5'
      } to-transparent transition-all duration-1000 -z-5`} />

      <nav className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3">
            <Logo/>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
              Nexmov.AI
            </span>
          </Link>
          <div className="text-sm text-gray-400">
            Already have an account? 
            <Link href="/login" className="text-primary hover:text-primary/80 transition-colors ml-2">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-40 max-w-lg mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          {[1, 2].map(step => (
            <React.Fragment key={step}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                currentStep >= step 
                  ? `bg-gradient-to-r ${getStepColor(step)} border-transparent text-white scale-110` 
                  : 'border-gray-600 text-gray-400'
              }`}>
                {currentStep > step ? <Check className="w-6 h-6" /> : getStepIcon(step)}
              </div>
              {step < 2 && (
                <div className={`w-full h-1 mx-4 rounded-full transition-all duration-500 ${
                  currentStep > step ? `bg-gradient-to-r ${getStepColor(step)}` : 'bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <span className={currentStep >= 1 ? 'text-primary' : 'text-gray-400'}>Personal Info</span>
          <span className={currentStep >= 2 ? 'text-accent' : 'text-gray-400'}>Account Setup</span>
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
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
                        } rounded-xl focus:ring-2 ${getFocusRingColor(1)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                        } rounded-xl focus:ring-2 ${getFocusRingColor(1)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                      } rounded-xl focus:ring-2 ${getFocusRingColor(1)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                        } rounded-xl focus:ring-2 ${getFocusRingColor(1)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                        } rounded-xl focus:ring-2 ${getFocusRingColor(1)} focus:border-transparent outline-none transition-all duration-300 text-white`}
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
                      } rounded-xl focus:ring-2 ${getFocusRingColor(1)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent">
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
                      } rounded-xl focus:ring-2 ${getFocusRingColor(2)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                      } rounded-xl focus:ring-2 ${getFocusRingColor(2)} focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400`}
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
                      className={`w-5 h-5 mt-0.5 bg-white/5 border ${errors.agreeToTerms ? 'border-red-400' : 'border-white/10'} rounded focus:ring-2 ${getFocusRingColor(2)}`}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-400">
                      I agree to the{' '}
                      <button type="button" className="text-accent hover:text-accent/80 transition-colors underline">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-accent hover:text-accent/80 transition-colors underline">
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
                      className={`w-5 h-5 mt-0.5 bg-white/5 border border-white/10 rounded focus:ring-2 ${getFocusRingColor(2)}`}
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

              {currentStep < 2 ? (
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
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-accent to-pink-500 hover:from-accent/80 hover:to-pink-600 hover:scale-105 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
