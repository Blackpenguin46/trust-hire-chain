
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield, Zap, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-blue-600">TrustHire Chain</div>
            <Badge variant="secondary">🔗 Blockchain Powered</Badge>
          </div>
          <Button onClick={() => window.location.href = '/auth'}>
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Future of Hiring is
            <span className="text-blue-600"> Decentralized</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect job seekers and employers through blockchain-verified credentials, 
            transparent application tracking, and tamper-proof hiring processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => window.location.href = '/auth'}>
              Find Your Dream Job
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => window.location.href = '/auth'}>
              Hire Top Talent
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose TrustHire Chain?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built on blockchain technology to ensure transparency, security, and trust in every hiring decision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Verified Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All education and certification claims are blockchain-verified, eliminating resume fraud and ensuring authentic qualifications.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Transparent Process</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Every application status change is recorded on-chain with required justifications, providing complete transparency to all parties.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Data Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Job seekers control their data with granular privacy settings, sharing only what they choose with specific employers.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Job Seekers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Create Your Digital Identity</h4>
                    <p className="text-gray-600">Set up your decentralized profile with blockchain-verified credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Apply with One Click</h4>
                    <p className="text-gray-600">Use your verified profile to apply instantly to relevant positions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Track Transparently</h4>
                    <p className="text-gray-600">See real-time application status with blockchain-recorded updates</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Employers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Verify Company Status</h4>
                    <p className="text-gray-600">Complete our vetting process to access the talent pool</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Access Verified Talent</h4>
                    <p className="text-gray-600">Review candidates with blockchain-verified credentials and skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Transparent Hiring</h4>
                    <p className="text-gray-600">Make fair hiring decisions with immutable process tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Hiring Experience?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of job seekers and employers who trust blockchain technology for fair, transparent hiring.
          </p>
          <Button size="lg" className="text-lg px-8" onClick={() => window.location.href = '/auth'}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="font-bold text-xl mb-4">TrustHire Chain</div>
            <p className="text-gray-400">
              Blockchain-powered hiring platform for the future of work
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
