import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Shield, Users, ArrowRight, Search, Lock, Globe, TrendingUp, CheckCircle2, Briefcase } from 'lucide-react';
import Web3Navigation from '@/components/Web3Navigation';
import DIDAvatar from '@/components/DIDAvatar';

export function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: "Sovereign Identity",
      description: "Complete control over your professional data with granular privacy settings."
    },
    {
      icon: CheckCircle2,
      title: "Immutable Verification",
      description: "Blockchain-verified credentials eliminate resume fraud permanently."
    },
    {
      icon: Users,
      title: "Decentralized Hiring",
      description: "DID-based identities give you sovereignty over your professional persona."
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Proofs",
      description: "Every hiring decision is recorded immutably with complete transparency."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      avatar: "/placeholder.svg",
      credentials: ["MIT Computer Science", "Google Cloud Certified", "Ethereum Developer"],
      quote: "Finally, a platform where my skills speak louder than corporate bias."
    },
    {
      name: "Marcus Johnson",
      role: "Talent Acquisition Lead",
      avatar: "/placeholder.svg", 
      credentials: ["HR Certification", "Blockchain Verified", "5+ Years Experience"],
      quote: "Zero fake resumes, 100% verified talent pool."
    }
  ];

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 inline-flex items-center space-x-3 professional-card px-6 py-3">
              <div className="w-2 h-2 bg-[--color-primary] rounded-full"></div>
              <span className="text-sm font-medium text-[--color-text-primary]/80">Revolutionary Web3 Hiring Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-[--color-text-primary]">Centralized Hiring.</span>
              <br />
              <span className="text-[--color-primary]">Decentralized</span> <span className="text-[--color-text-primary]">Trust.</span>
            </h1>
            
            <p className="text-xl text-[--color-text-primary]/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              The first blockchain-powered hiring platform where talent owns their data, 
              credentials are immutable, and every decision is transparent.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="primary-button text-lg px-10 py-6"
                onClick={() => window.location.href = '/jobs'}
              >
                <Search className="mr-3 h-5 w-5" />
                Explore Opportunities
              </Button>
              <Button 
                size="lg" 
                className="secondary-button text-lg px-10 py-6"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started
              </Button>
            </div>

            {/* Clean metrics section */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[--color-primary]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[--color-primary]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[--color-text-primary] mb-2">100%</div>
                <div className="text-sm text-[--color-text-secondary]/60">Fraud Prevention</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[--color-primary]/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[--color-primary]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[--color-text-primary] mb-2">∞</div>
                <div className="text-sm text-[--color-text-secondary]/60">Data Sovereignty</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[--color-primary]/10 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-[--color-primary]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[--color-text-primary] mb-2">0</div>
                <div className="text-sm text-[--color-text-secondary]/60">Trust Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built on <span className="text-[--color-primary]">Web3</span> Principles
            </h2>
            <p className="text-xl text-[--color-text-secondary]/70 max-w-3xl mx-auto">
              Experience the next generation of hiring with our comprehensive blockchain-powered protocol.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="professional-card hover:border-[--color-primary]/30 transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-[--color-primary]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[--color-primary]/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-[--color-primary]" />
                  </div>
                  <CardTitle className="text-[--color-text-primary] text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[--color-text-secondary]/70 text-center text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[--color-secondary]/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Trusted by <span className="text-[--color-primary]">Web3</span> Natives
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="professional-card p-8 hover:border-[--color-primary]/20 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <DIDAvatar 
                    name={testimonial.name}
                    avatar={testimonial.avatar}
                    didVerified={true}
                    credentials={testimonial.credentials}
                    size="lg"
                  />
                  <div>
                    <h4 className="font-semibold text-[--color-text-primary]">{testimonial.name}</h4>
                    <p className="text-[--color-primary] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-[--color-text-secondary]/80 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            The <span className="text-[--color-primary]">Protocol</span> in Action
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary] mb-8 flex items-center">
                <div className="w-10 h-10 bg-[--color-primary]/10 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-[--color-primary]" />
                </div>
                For Talent
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "DID Onboarding", desc: "Create your sovereign identity on-chain" },
                  { title: "Credential Minting", desc: "Transform achievements into verifiable credentials" },
                  { title: "Privacy Controls", desc: "Granular data sharing with zero-knowledge proofs" },
                  { title: "Reputation Building", desc: "Immutable track record across all platforms" }
                ].map((step) => (
                  <div key={step.title} className="flex items-start space-x-4 p-6 professional-card hover:border-[--color-primary]/20 transition-all duration-300">
                    <div className="w-8 h-8 bg-[--color-primary] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-[--color-background]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[--color-text-primary] mb-1">{step.title}</h4>
                      <p className="text-[--color-text-secondary]/70 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="primary-button"
                onClick={() => window.location.href = '/jobs'}
              >
                Start Your Web3 Career
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary] mb-8 flex items-center">
                <div className="w-10 h-10 bg-[--color-primary]/10 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-[--color-primary]" />
                </div>
                For Organizations
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "Entity Verification", desc: "Prove organizational legitimacy on-chain" },
                  { title: "Smart Contracts", desc: "Automated, transparent hiring processes" },
                  { title: "Credential Analysis", desc: "AI-powered verification of candidate claims" },
                  { title: "Compliance Automation", desc: "Built-in regulatory compliance and reporting" }
                ].map((step) => (
                  <div key={step.title} className="flex items-start space-x-4 p-6 professional-card hover:border-[--color-primary]/20 transition-all duration-300">
                    <div className="w-8 h-8 bg-[--color-primary] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-[--color-background]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[--color-text-primary] mb-1">{step.title}</h4>
                      <p className="text-[--color-text-secondary]/70 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="primary-button"
                onClick={() => window.location.href = '/employer/jobs'}
              >
                Post a Job
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
