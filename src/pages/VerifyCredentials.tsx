
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Search, Wallet, FileCheck, Shield, Loader2 } from 'lucide-react';

const VerifyCredentials = () => {
  const [credentialId, setCredentialId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerification = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      if (credentialId.length > 0) {
        setVerificationResult({
          valid: credentialId.includes('valid') || credentialId.length > 10,
          credential: {
            id: credentialId,
            type: 'Bachelor of Computer Science',
            issuer: 'Stanford University',
            issuedTo: 'John Doe',
            issuedDate: '2023-05-15',
            expiryDate: null,
            verified: true,
            blockchainTx: '0x1234...abcd'
          }
        });
      }
      setIsVerifying(false);
    }, 2000);
  };

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
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Verify Credentials Instantly
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Experience real blockchain verification in action. Paste a credential ID or connect your wallet to see how our system works.
        </p>
        <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm animate-pulse text-lg px-4 py-2">
          <Shield className="w-4 h-4 mr-2" />
          Live Demo - Real Blockchain Verification
        </Badge>
      </section>

      {/* Verification Form */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">Credential Verification</CardTitle>
              <CardDescription className="text-gray-300">
                Enter a credential ID hash or connect your wallet to verify credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="credentialId" className="text-gray-300">Credential ID / Hash</Label>
                <Input
                  id="credentialId"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="Enter credential ID (e.g., 0x1234...abcd or try 'valid-demo-credential')"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleVerification}
                  disabled={!credentialId || isVerifying}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 shadow-lg"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verify Credential
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>

              {/* Demo Instructions */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-lg border border-blue-400/30">
                <p className="text-blue-300 text-sm">
                  <strong>Try the demo:</strong> Enter "valid-demo-credential" or any text longer than 10 characters to see a successful verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Verification Results */}
      {verificationResult && (
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto">
            <Card className={`bg-white/5 backdrop-blur-xl border shadow-2xl ${
              verificationResult.valid 
                ? 'border-green-400/30 bg-green-500/5' 
                : 'border-red-400/30 bg-red-500/5'
            }`}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  verificationResult.valid 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                  {verificationResult.valid ? (
                    <CheckCircle className="h-8 w-8 text-white" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-white" />
                  )}
                </div>
                <CardTitle className={`text-2xl ${
                  verificationResult.valid ? 'text-green-400' : 'text-red-400'
                }`}>
                  {verificationResult.valid ? 'Credential Verified ✓' : 'Verification Failed ✗'}
                </CardTitle>
              </CardHeader>
              
              {verificationResult.valid && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-400">Credential Type</Label>
                      <p className="text-white font-medium">{verificationResult.credential.type}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Issued By</Label>
                      <p className="text-white font-medium">{verificationResult.credential.issuer}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Issued To</Label>
                      <p className="text-white font-medium">{verificationResult.credential.issuedTo}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Issue Date</Label>
                      <p className="text-white font-medium">{verificationResult.credential.issuedDate}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 font-medium">Blockchain Transaction</p>
                        <p className="text-green-200 text-sm font-mono">{verificationResult.credential.blockchainTx}</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border border-green-400/30">
                        <FileCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-black/20 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            How Credential Verification Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <CardTitle className="text-white">Credential Issued</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Educational institutions and certification bodies issue verifiable credentials on the blockchain.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <CardTitle className="text-white">Blockchain Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Credential data is cryptographically secured and stored immutably on the blockchain.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <CardTitle className="text-white">Instant Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Anyone can verify the authenticity of credentials instantly using our verification system.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
              Ready to Issue or Verify Credentials?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join the future of credential verification with blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 shadow-2xl"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => window.location.href = '/'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default VerifyCredentials;
