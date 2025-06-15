

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield, Zap, Users, ArrowRight, Sparkles, Eye, Search } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-30 animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl px-4 py-2 rounded-xl">
                TrustHire Chain
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 animate-pulse">
              ⛓️ Blockchain Powered
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => window.location.href = '/how-it-works'} className="text-gray-300 hover:text-white">
              How It Works
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/for-job-seekers'} className="text-gray-300 hover:text-white">
              For Job Seekers
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/for-employers'} className="text-gray-300 hover:text-white">
              For Employers
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/about'} className="text-gray-300 hover:text-white">
              About
            </Button>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Revolutionary Hiring Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Centralized Hiring.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Decentralized Trust.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Connect job seekers and employers through blockchain-verified credentials, 
            transparent application tracking, and tamper-proof hiring processes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/for-job-seekers'}
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Jobs
            </Button>
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/verify-credentials'}
            >
              <Eye className="mr-2 h-5 w-5" />
              Verify a Credential
            </Button>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Built on Trust, Powered by Blockchain
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of hiring with our comprehensive blockchain-powered platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-lg">Data Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center text-sm">
                Complete control over your professional data with granular privacy settings.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Check className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-lg">VC Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center text-sm">
                Blockchain-verified credentials eliminate resume fraud permanently.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-lg">DID-Based Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center text-sm">
                Decentralized identities give you sovereignty over your professional persona.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-lg">Full Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center text-sm">
                Every hiring decision is recorded immutably with complete transparency.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="bg-black/20 backdrop-blur-sm py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            See How It Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
                For Job Seekers
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">DID Onboarding</h4>
                    <p className="text-gray-300">Create your decentralized identity and establish data ownership</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Credential Verification</h4>
                    <p className="text-gray-300">Get your education and skills verified on the blockchain</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Application Lifecycle</h4>
                    <p className="text-gray-300">Track every status change with immutable transparency</p>
                  </div>
                </div>
              </div>

              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                onClick={() => window.location.href = '/for-job-seekers'}
              >
                Learn More for Job Seekers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4"></div>
                For Employers
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Company Vetting</h4>
                    <p className="text-gray-300">Complete verification to access our certified talent pool</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Credential Integration</h4>
                    <p className="text-gray-300">Instantly verify candidate credentials with blockchain data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Justification-Required Actions</h4>
                    <p className="text-gray-300">All hiring decisions require transparent justification</p>
                  </div>
                </div>
              </div>

              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg"
                onClick={() => window.location.href = '/for-employers'}
              >
                Learn More for Employers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Ready to Transform Your Hiring Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of job seekers and employers who trust blockchain technology for fair, transparent hiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started Today
                <Sparkles className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-xl px-12 py-6 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                onClick={() => window.location.href = '/verify-credentials'}
              >
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TrustHire Chain
              </div>
              <p className="text-gray-400 mb-4">
                Blockchain-powered hiring platform for the future of work
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.href = '/for-job-seekers'}>For Job Seekers</p>
                <p className="text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.href = '/for-employers'}>For Employers</p>
                <p className="text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.href = '/verify-credentials'}>Verify Credentials</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.href = '/about'}>About Us</p>
                <p className="text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.href = '/how-it-works'}>How It Works</p>
                <p className="text-gray-400 hover:text-white cursor-pointer" onClick={() => window.location.href = '/contact'}>Contact</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-white cursor-pointer">Discord</p>
                <p className="text-gray-400 hover:text-white cursor-pointer">Twitter</p>
                <p className="text-gray-400 hover:text-white cursor-pointer">GitHub</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TrustHire Chain. Empowering talent through decentralized trust.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

