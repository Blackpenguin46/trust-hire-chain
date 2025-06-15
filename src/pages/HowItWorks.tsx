
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Zap, CheckCircle, UserCheck, Building, Wallet, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl px-4 py-2 rounded-xl">
                TrustHire Chain
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" onClick={() => window.location.href = '/'} className="text-gray-300 hover:text-white">
              Home
            </Button>
            <Button onClick={() => window.location.href = '/auth'} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Zero fraud. Full control. Experience the future of hiring with our blockchain-powered platform.
        </p>
        <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm animate-pulse text-lg px-4 py-2">
          <Shield className="w-4 h-4 mr-2" />
          Decentralized Identity Powered
        </Badge>
      </section>

      {/* Job Seekers Flow */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            For Job Seekers
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Take control of your professional identity with blockchain-verified credentials and privacy-first data management.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">DID Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center mb-4">
                Create your decentralized identity (DID) and establish ownership of your professional data.
              </CardDescription>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Secure wallet creation
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Identity verification
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Privacy settings setup
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">Credential Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center mb-4">
                Upload and verify your education, certifications, and work experience on the blockchain.
              </CardDescription>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Document upload
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Blockchain verification
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tamper-proof storage
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">Apply & Track</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center mb-4">
                Apply to jobs with one click and track your application status in real-time on the blockchain.
              </CardDescription>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  One-click applications
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Real-time tracking
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Transparent process
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl"
            onClick={() => window.location.href = '/for-job-seekers'}
          >
            Start Your Profile
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Employers Flow */}
      <section className="bg-black/20 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              For Employers
            </h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
              Access a certified candidate pool with transparent hiring processes and zero fake resumes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Company Vetting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center mb-4">
                  Complete our comprehensive vetting process to gain access to our verified talent pool.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Company verification
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Business registration check
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Compliance review
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Access Verified Talent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center mb-4">
                  Browse candidates with blockchain-verified credentials and authentic work history.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verified credentials
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Authentic profiles
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Advanced filtering
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Transparent Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center mb-4">
                  Make fair hiring decisions with immutable process tracking and justification requirements.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Immutable tracking
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Required justifications
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Audit trail
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-2xl"
              onClick={() => window.location.href = '/for-employers'}
            >
              Post Your First Job
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
