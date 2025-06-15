
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Shield, Hash, Calendar, User, Building, Award, Wallet, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const VerifyCredentials = () => {
  const [credentialId, setCredentialId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleVerifyCredential = async () => {
    if (!credentialId.trim()) {
      toast.error('Please enter a credential ID');
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const mockResult = {
        isValid: Math.random() > 0.3, // 70% chance of being valid
        credentialData: {
          id: credentialId,
          holderName: "Sarah Johnson",
          issuer: "MIT Computer Science Department",
          issueDate: "2023-09-15",
          credentialType: "Bachelor of Science in Computer Science",
          verificationHash: "0x7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z",
          blockchainNetwork: "Ethereum Mainnet",
          transactionHash: "0xa1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef",
          skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
          gpa: "3.8/4.0"
        }
      };
      
      setVerificationResult(mockResult);
      setIsVerifying(false);
      
      if (mockResult.isValid) {
        toast.success('Credential verified successfully!');
      } else {
        toast.error('Credential verification failed');
      }
    }, 2000);
  };

  const handleConnectWallet = async () => {
    setWalletConnected(true);
    toast.success('Wallet connected successfully!');
    // Auto-populate with sample credential
    setCredentialId('vc_id_12345abcdef67890');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-50"></div>
                  <div className="relative font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
                    TrustHire Chain
                  </div>
                </div>
              </a>
              <div className="flex items-center space-x-4">
                <a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
                <a href="/for-job-seekers" className="text-gray-300 hover:text-white transition-colors">Job Seekers</a>
                <a href="/for-employers" className="text-gray-300 hover:text-white transition-colors">Employers</a>
                <Button variant="outline" onClick={() => window.location.href = '/auth'} className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-blue-400/30">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Live Verification Demo</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                Verify Credentials Instantly
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience real blockchain credential verification. Paste a credential ID or connect your wallet to see our system in action.
              </p>
            </div>

            {/* Verification Form */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Hash className="w-5 h-5 text-blue-400" />
                  <span>Credential Verification</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter a credential ID or connect your Web3 wallet to verify credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter credential ID (e.g., vc_id_12345abcdef67890)"
                      value={credentialId}
                      onChange={(e) => setCredentialId(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button 
                    onClick={handleVerifyCredential} 
                    disabled={isVerifying}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Credential'}
                  </Button>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="h-px flex-1 bg-slate-600"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="h-px flex-1 bg-slate-600"></div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleConnectWallet}
                    variant="outline"
                    disabled={walletConnected}
                    className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {walletConnected ? 'Wallet Connected' : 'Connect Web3 Wallet'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Result */}
            {verificationResult && (
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    {verificationResult.isValid ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <span className="text-white">
                      {verificationResult.isValid ? 'Credential Verified' : 'Verification Failed'}
                    </span>
                    <Badge className={`${verificationResult.isValid ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-red-500/20 text-red-300 border-red-400/30'}`}>
                      {verificationResult.isValid ? 'VALID' : 'INVALID'}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {verificationResult.isValid 
                      ? 'This credential has been successfully verified on the blockchain'
                      : 'This credential could not be verified or may be fraudulent'
                    }
                  </CardDescription>
                </CardHeader>
                
                {verificationResult.isValid && (
                  <CardContent className="space-y-6">
                    {/* Credential Holder */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-gray-400">Credential Holder</p>
                            <p className="text-white font-medium">{verificationResult.credentialData.holderName}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-gray-400">Issuing Institution</p>
                            <p className="text-white font-medium">{verificationResult.credentialData.issuer}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-gray-400">Credential Type</p>
                            <p className="text-white font-medium">{verificationResult.credentialData.credentialType}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-sm text-gray-400">Issue Date</p>
                            <p className="text-white font-medium">{verificationResult.credentialData.issueDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Blockchain Network</p>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                            {verificationResult.credentialData.blockchainNetwork}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 mb-2">Verification Hash</p>
                          <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3">
                            <code className="text-xs text-green-400 flex-1 break-all">
                              {verificationResult.credentialData.verificationHash}
                            </code>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => copyToClipboard(verificationResult.credentialData.verificationHash)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 mb-2">Transaction Hash</p>
                          <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3">
                            <code className="text-xs text-cyan-400 flex-1 break-all">
                              {verificationResult.credentialData.transactionHash}
                            </code>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => copyToClipboard(verificationResult.credentialData.transactionHash)}
                              className="text-gray-400 hover:text-white"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Achievements */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Verified Skills & Achievements</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {verificationResult.credentialData.skills.map((skill: string, index: number) => (
                          <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">GPA:</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                          {verificationResult.credentialData.gpa}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {/* How It Works */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                How Blockchain Verification Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-white/10 text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Hash className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cryptographic Hashing</h3>
                    <p className="text-gray-400">
                      Each credential is converted into a unique cryptographic hash that's stored on the blockchain
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-white/10 text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Immutable Storage</h3>
                    <p className="text-gray-400">
                      Credentials are permanently recorded on the blockchain, making them tamper-proof and verifiable
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-white/10 text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Instant Verification</h3>
                    <p className="text-gray-400">
                      Anyone can verify a credential's authenticity in seconds by checking the blockchain record
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCredentials;
