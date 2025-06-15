
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield, Zap, Users, ArrowRight, Sparkles, Eye, Search, Lock, Globe, Coins } from 'lucide-react';
import Web3Navigation from '@/components/Web3Navigation';
import DIDAvatar from '@/components/DIDAvatar';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Sovereign Identity",
      description: "Complete control over your professional data with granular privacy settings.",
      gradient: "from-[#00FFD1] to-[#6B46FF]"
    },
    {
      icon: Check,
      title: "Immutable Verification",
      description: "Blockchain-verified credentials eliminate resume fraud permanently.",
      gradient: "from-[#6B46FF] to-[#FF6B35]"
    },
    {
      icon: Users,
      title: "Decentralized Hiring",
      description: "DID-based identities give you sovereignty over your professional persona.",
      gradient: "from-[#FF6B35] to-[#00FFD1]"
    },
    {
      icon: Zap,
      title: "Zero-Knowledge Proofs",
      description: "Every hiring decision is recorded immutably with complete transparency.",
      gradient: "from-[#00FFD1] via-[#6B46FF] to-[#FF6B35]"
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
    <div className="min-h-screen bg-gradient-to-br from-[#0B1B2B] via-[#1A1A1A] to-[#0B1B2B] text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FFD1] rounded-full verified-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#6B46FF] rounded-full verified-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#FF6B35] rounded-full verified-pulse opacity-30" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#00FFD1] rounded-full verified-pulse opacity-50" style={{animationDelay: '3s'}}></div>
      </div>

      <Web3Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 inline-flex items-center space-x-3 cyber-card px-6 py-3 border-gradient">
              <Sparkles className="h-5 w-5 text-[#00FFD1]" />
              <span className="text-sm font-medium">Revolutionary Web3 Hiring Protocol</span>
              <Lock className="h-4 w-4 text-[#6B46FF]" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight slide-in">
              <span className="text-white">
                Centralized Hiring.
              </span>
              <br />
              <span className="text-gradient floating">
                Decentralized Trust.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto slide-in" style={{animationDelay: '0.2s'}}>
              The first blockchain-powered hiring platform where talent owns their data, 
              credentials are immutable, and every decision is transparent.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center slide-in" style={{animationDelay: '0.4s'}}>
              <Button 
                size="lg" 
                className="cyber-button text-lg px-10 py-6"
                onClick={() => window.location.href = '/for-job-seekers'}
              >
                <Search className="mr-3 h-6 w-6" />
                Explore Opportunities
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1]/10 text-lg px-10 py-6 rounded-lg transition-all duration-300 neon-glow"
                onClick={() => window.location.href = '/verify-credentials'}
              >
                <Eye className="mr-3 h-6 w-6" />
                Live Verification Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                <div className="text-sm text-gray-400">Fraud Prevention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">∞</div>
                <div className="text-sm text-gray-400">Data Sovereignty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">0</div>
                <div className="text-sm text-gray-400">Trust Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Built on Web3 Principles
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of hiring with our comprehensive blockchain-powered protocol.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="cyber-card hover:neon-glow transition-all duration-500 group floating" style={{animationDelay: `${index * 0.2}s`}}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-[#0B1B2B]" />
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-[#00FFD1] transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B1B2B]/50 to-[#1A1A1A]/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            Trusted by Web3 Natives
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="cyber-card p-8 hover:neon-glow transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <DIDAvatar 
                    name={testimonial.name}
                    avatar={testimonial.avatar}
                    didVerified={true}
                    credentials={testimonial.credentials}
                    size="lg"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-[#00FFD1] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            The Protocol in Action
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00FFD1] to-[#6B46FF] rounded-full mr-4"></div>
                For Talent
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "DID Onboarding", desc: "Create your sovereign identity on-chain" },
                  { title: "Credential Minting", desc: "Transform achievements into verifiable credentials" },
                  { title: "Privacy Controls", desc: "Granular data sharing with zero-knowledge proofs" },
                  { title: "Reputation Building", desc: "Immutable track record across all platforms" }
                ].map((step, index) => (
                  <div key={step.title} className="flex items-start space-x-4 group hover:bg-[#00FFD1]/5 p-4 rounded-lg transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00FFD1] to-[#6B46FF] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4 text-[#0B1B2B]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-[#00FFD1] transition-colors">{step.title}</h4>
                      <p className="text-gray-300 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="cyber-button"
                onClick={() => window.location.href = '/for-job-seekers'}
              >
                Start Your Web3 Career
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#6B46FF] to-[#FF6B35] rounded-full mr-4"></div>
                For Organizations
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "Entity Verification", desc: "Prove organizational legitimacy on-chain" },
                  { title: "Smart Contracts", desc: "Automated, transparent hiring processes" },
                  { title: "Credential Analysis", desc: "AI-powered verification of candidate claims" },
                  { title: "Compliance Automation", desc: "Built-in regulatory compliance and reporting" }
                ].map((step, index) => (
                  <div key={step.title} className="flex items-start space-x-4 group hover:bg-[#6B46FF]/5 p-4 rounded-lg transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#6B46FF] to-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-[#6B46FF] transition-colors">{step.title}</h4>
                      <p className="text-gray-300 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="bg-gradient-to-r from-[#6B46FF] to-[#FF6B35] text-white hover:shadow-lg hover:shadow-[#6B46FF]/25 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
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
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="cyber-card p-12 border-gradient neon-glow">
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <Globe className="h-8 w-8 text-[#00FFD1]" />
                  <Coins className="h-8 w-8 text-[#6B46FF]" />
                  <Shield className="h-8 w-8 text-[#FF6B35]" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Join the Decentralized Workforce Revolution
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Where talent sovereignty meets organizational transparency. 
                Built on blockchain, powered by community, secured by cryptography.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="cyber-button text-xl px-12 py-6"
                  onClick={() => window.location.href = '/auth'}
                >
                  Launch Protocol
                  <Sparkles className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-transparent border-2 border-[#6B46FF] text-[#6B46FF] hover:bg-[#6B46FF]/10 text-xl px-12 py-6 rounded-lg transition-all duration-300"
                  onClick={() => window.location.href = '/verify-credentials'}
                >
                  Experience Verification
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#0B1B2B]/80 to-[#1A1A1A]/80 backdrop-blur-sm py-16 border-t border-gray-700/30 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-3xl mb-4 text-gradient">
                TrustHire Chain
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The sovereign hiring protocol for the decentralized workforce
              </p>
              <Badge className="bg-gradient-to-r from-[#00FFD1]/20 to-[#6B46FF]/20 text-[#00FFD1] border border-[#00FFD1]/30">
                Web3 Native
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Protocol</h4>
              <div className="space-y-3">
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors" onClick={() => window.location.href = '/for-job-seekers'}>For Talent</p>
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors" onClick={() => window.location.href = '/for-employers'}>For Organizations</p>
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors" onClick={() => window.location.href = '/verify-credentials'}>Verify Credentials</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Foundation</h4>
              <div className="space-y-3">
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors" onClick={() => window.location.href = '/about'}>Mission</p>
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors" onClick={() => window.location.href = '/how-it-works'}>Architecture</p>
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors" onClick={() => window.location.href = '/contact'}>Community</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Ecosystem</h4>
              <div className="space-y-3">
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors">Discord</p>
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors">GitHub</p>
                <p className="text-gray-400 hover:text-[#00FFD1] cursor-pointer transition-colors">Documentation</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700/30 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TrustHire Chain Protocol. Empowering sovereign talent through decentralized trust.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
