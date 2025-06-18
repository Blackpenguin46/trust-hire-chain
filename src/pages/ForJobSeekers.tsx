import React from 'react';
import Web3Navigation from '@/components/Web3Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PlatformSnippet from '@/components/PlatformSnippet';

const ForJobSeekers = () => {
  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />

      <section className="pt-20 pb-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-[--color-text-primary]">For </span>
            <span className="text-[--color-primary]">Talent</span>
          </h1>
          <p className="text-xl text-[--color-text-secondary]/70 mb-12 leading-relaxed max-w-3xl mx-auto">
            Take control of your career with a decentralized identity, verifiable credentials, and true data ownership.
          </p>
          <Button
            size="lg"
            className="primary-button text-lg px-10 py-6"
            onClick={() => window.location.href = '/auth'}
          >
            Claim Your Identity
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="py-20 bg-[--color-secondary]/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            How TrustHire Chain <span className="text-[--color-primary]">Empowers</span> Your Career
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">1. Own Your Professional Identity (DID)</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Create a Decentralized Identifier (DID) that gives you complete control over your professional data. No more centralized databases, no more data breaches.
              </p>
              <PlatformSnippet type="talent-did" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">2. Mint Verifiable Credentials</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Turn your achievements, skills, and experiences into immutable, blockchain-verified credentials. Prove your qualifications without revealing sensitive personal information.
              </p>
              <PlatformSnippet type="talent-credentials" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">3. Secure & Private Job Applications</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Apply for jobs with confidence, knowing your data is protected by zero-knowledge proofs. Share only what's necessary, when it's necessary.
              </p>
              <PlatformSnippet type="talent-privacy" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">4. Build an Immutable Reputation</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Every verified credential and successful engagement contributes to your on-chain reputation. Build a trusted professional profile that transcends platforms.
              </p>
              <PlatformSnippet type="talent-reputation" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[--color-secondary]/50 py-16 border-t border-[--border]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4 text-[--color-text-primary]">
                TrustHire <span className="text-[--color-primary]">Chain</span>
              </div>
              <p className="text-[--color-text-secondary]/60 mb-6 leading-relaxed">
                The sovereign hiring protocol for the decentralized workforce
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[--color-primary]/10 text-[--color-primary] text-sm font-medium">
                Web3 Native
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[--color-text-primary] mb-6">Protocol</h4>
              <div className="space-y-3">
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors" onClick={() => window.location.href = '/for-job-seekers'}>For Talent</p>
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors" onClick={() => window.location.href = '/for-employers'}>For Organizations</p>
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors" onClick={() => window.location.href = '/verify-credentials'}>Verify Credentials</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[--color-text-primary] mb-6">Resources</h4>
              <div className="space-y-3">
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors">Blog</p>
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors">Whitepaper</p>
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors">Documentation</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[--color-text-primary] mb-6">Connect</h4>
              <div className="space-y-3">
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors">Contact Us</p>
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors">Support</p>
                <p className="text-[--color-text-secondary]/60 hover:text-[--color-primary] cursor-pointer transition-colors">Community</p>
              </div>
            </div>
          </div>
          <div className="text-center text-[--color-text-secondary]/60 text-sm mt-16">
            &copy; {new Date().getFullYear()} TrustHire Chain. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForJobSeekers;


