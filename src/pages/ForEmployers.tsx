import React from 'react';
import Web3Navigation from '@/components/Web3Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PlatformSnippet from '@/components/PlatformSnippet';

const ForEmployers = () => {
  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />

      <section className="pt-20 pb-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-[--color-text-primary]">For </span>
            <span className="text-[--color-primary]">Organizations</span>
          </h1>
          <p className="text-xl text-[--color-text-secondary]/70 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover verified talent, streamline your hiring process, and build trust with blockchain-powered solutions.
          </p>
          <Button
            size="lg"
            className="primary-button text-lg px-10 py-6"
            onClick={() => window.location.href = '/auth'}
          >
            Start Hiring
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="py-20 bg-[--color-secondary]/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            How TrustHire Chain <span className="text-[--color-primary]">Empowers</span> Your Hiring
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">1. Verify Candidate Credentials Instantly</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Eliminate resume fraud and manual verification. Our platform allows you to instantly verify academic degrees, professional certifications, and work experience directly on the blockchain.
              </p>
              <PlatformSnippet type="employer-verification" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">2. Automate Hiring with Smart Contracts</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                From offer letters to compensation agreements, execute secure and transparent hiring processes using self-executing smart contracts. Reduce legal overhead and ensure compliance.
              </p>
              <PlatformSnippet type="employer-smart-contract" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">3. Build a Transparent Talent Pipeline</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Gain full visibility into your talent acquisition funnel. Track candidate progress, feedback, and engagement on an immutable ledger, fostering a fair and unbiased process.
              </p>
              <PlatformSnippet type="employer-pipeline" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-[--color-text-primary]">4. Enhance Employer Branding with Trust</h3>
              <p className="text-lg text-[--color-text-secondary]/70 leading-relaxed">
                Showcase your commitment to transparency and fairness. Attract top talent who value data sovereignty and ethical hiring practices by leveraging blockchain's inherent trust mechanisms.
              </p>
              <PlatformSnippet type="employer-branding" />
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

export default ForEmployers;


