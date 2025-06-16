import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Shield, Users, ArrowRight, Search, Lock, Globe, TrendingUp, CheckCircle2, Briefcase } from 'lucide-react';
import Web3Navigation from '@/components/Web3Navigation';
import DIDAvatar from '@/components/DIDAvatar';

const LandingPage = () => {
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
      quote: "Zero fake resumes, 100% verified talent. This is the future of hiring."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#EDEEF2]">
      <Web3Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 inline-flex items-center space-x-3 professional-card px-6 py-3">
              <div className="w-2 h-2 bg-[#36B4A5] rounded-full"></div>
              <span className="text-sm font-medium text-[#EDEEF2]/80">Revolutionary Web3 Hiring Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-[#EDEEF2]">Centralized Hiring.</span>
              <br />
              <span className="text-[#36B4A5]">Decentralized</span> <span className="text-[#EDEEF2]">Trust.</span>
            </h1>
            
            <p className="text-xl text-[#EDEEF2]/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              The first blockchain-powered hiring platform where talent owns their data, 
              credentials are immutable, and every decision is transparent.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="primary-button text-lg px-10 py-6"
                onClick={() => window.location.href = '/for-job-seekers'}
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
                  <div className="w-12 h-12 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#36B4A5]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#EDEEF2] mb-2">100%</div>
                <div className="text-sm text-[#EDEEF2]/60">Fraud Prevention</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#36B4A5]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#EDEEF2] mb-2">∞</div>
                <div className="text-sm text-[#EDEEF2]/60">Data Sovereignty</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-[#36B4A5]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#EDEEF2] mb-2">0</div>
                <div className="text-sm text-[#EDEEF2]/60">Trust Required</div>
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
              Built on <span className="text-[#36B4A5]">Web3</span> Principles
            </h2>
            <p className="text-xl text-[#EDEEF2]/70 max-w-3xl mx-auto">
              Experience the next generation of hiring with our comprehensive blockchain-powered protocol.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="professional-card hover:border-[#36B4A5]/30 transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#36B4A5]/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-[#36B4A5]" />
                  </div>
                  <CardTitle className="text-[#EDEEF2] text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#EDEEF2]/70 text-center text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#161B22]/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Trusted by <span className="text-[#36B4A5]">Web3</span> Natives
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="professional-card p-8 hover:border-[#36B4A5]/20 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <DIDAvatar 
                    name={testimonial.name}
                    avatar={testimonial.avatar}
                    didVerified={true}
                    credentials={testimonial.credentials}
                    size="lg"
                  />
                  <div>
                    <h4 className="font-semibold text-[#EDEEF2]">{testimonial.name}</h4>
                    <p className="text-[#36B4A5] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-[#EDEEF2]/80 italic leading-relaxed">
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
            The <span className="text-[#36B4A5]">Protocol</span> in Action
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[#EDEEF2] mb-8 flex items-center">
                <div className="w-10 h-10 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-[#36B4A5]" />
                </div>
                For Talent
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "DID Onboarding", desc: "Create your sovereign identity on-chain" },
                  { title: "Credential Minting", desc: "Transform achievements into verifiable credentials" },
                  { title: "Privacy Controls", desc: "Granular data sharing with zero-knowledge proofs" },
                  { title: "Reputation Building", desc: "Immutable track record across all platforms" }
                ].map((step, index) => (
                  <div key={step.title} className="flex items-start space-x-4 p-6 professional-card hover:border-[#36B4A5]/20 transition-all duration-300">
                    <div className="w-8 h-8 bg-[#36B4A5] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-[#0D1117]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#EDEEF2] mb-1">{step.title}</h4>
                      <p className="text-[#EDEEF2]/70 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="primary-button"
                onClick={() => window.location.href = '/for-job-seekers'}
              >
                Start Your Web3 Career
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[#EDEEF2] mb-8 flex items-center">
                <div className="w-10 h-10 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-[#36B4A5]" />
                </div>
                For Organizations
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "Entity Verification", desc: "Prove organizational legitimacy on-chain" },
                  { title: "Smart Contracts", desc: "Automated, transparent hiring processes" },
                  { title: "Credential Analysis", desc: "AI-powered verification of candidate claims" },
                  { title: "Compliance Automation", desc: "Built-in regulatory compliance and reporting" }
                ].map((step, index) => (
                  <div key={step.title} className="flex items-start space-x-4 p-6 professional-card hover:border-[#36B4A5]/20 transition-all duration-300">
                    <div className="w-8 h-8 bg-[#36B4A5] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-[#0D1117]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#EDEEF2] mb-1">{step.title}</h4>
                      <p className="text-[#EDEEF2]/70 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="primary-button"
                onClick={() => window.location.href = '/for-employers'}
              >
                Deploy Your Protocol
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="professional-card p-12">
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-[#36B4A5]" />
                  </div>
                  <div className="w-12 h-12 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#36B4A5]" />
                  </div>
                  <div className="w-12 h-12 bg-[#36B4A5]/10 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-[#36B4A5]" />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Join the Decentralized <span className="text-[#36B4A5]">Workforce</span> Revolution
              </h2>
              <p className="text-xl text-[#EDEEF2]/70 mb-10 leading-relaxed">
                Where talent sovereignty meets organizational transparency. 
                Built on blockchain, powered by community, secured by cryptography.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="primary-button text-xl px-12 py-6"
                  onClick={() => window.location.href = '/auth'}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  className="secondary-button text-xl px-12 py-6"
                  onClick={() => window.location.href = '/verify-credentials'}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#161B22]/50 py-16 border-t border-[#21262D]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4 text-[#EDEEF2]">
                TrustHire <span className="text-[#36B4A5]">Chain</span>
              </div>
              <p className="text-[#EDEEF2]/60 mb-6 leading-relaxed">
                The sovereign hiring protocol for the decentralized workforce
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#36B4A5]/10 text-[#36B4A5] text-sm font-medium">
                Web3 Native
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#EDEEF2] mb-6">Protocol</h4>
              <div className="space-y-3">
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors" onClick={() => window.location.href = '/for-job-seekers'}>For Talent</p>
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors" onClick={() => window.location.href = '/for-employers'}>For Organizations</p>
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors" onClick={() => window.location.href = '/verify-credentials'}>Verify Credentials</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#EDEEF2] mb-6">Foundation</h4>
              <div className="space-y-3">
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors" onClick={() => window.location.href = '/about'}>Mission</p>
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors" onClick={() => window.location.href = '/how-it-works'}>Architecture</p>
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors" onClick={() => window.location.href = '/contact'}>Community</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#EDEEF2] mb-6">Ecosystem</h4>
              <div className="space-y-3">
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors">Discord</p>
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors">GitHub</p>
                <p className="text-[#EDEEF2]/60 hover:text-[#36B4A5] cursor-pointer transition-colors">Documentation</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#21262D] mt-12 pt-8 text-center">
            <p className="text-[#EDEEF2]/60">
              © 2024 TrustHire Chain Protocol. Empowering sovereign talent through decentralized trust.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
