import React from 'react';

interface PlatformSnippetProps {
  type: 'employer-verification' | 'employer-smart-contract' | 'employer-pipeline' | 'employer-branding' |
        'talent-did' | 'talent-credentials' | 'talent-privacy' | 'talent-reputation';
}

const PlatformSnippet: React.FC<PlatformSnippetProps> = ({ type }) => {
  const renderSnippet = () => {
    switch (type) {
      case 'employer-verification':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Credential Verification Flow</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Candidate shares verifiable credential (e.g., degree, certification).</p>
              <p className="mb-2">2. TrustHire Chain automatically verifies on blockchain.</p>
              <p>3. Employer receives instant, fraud-proof confirmation.</p>
            </div>
            <img src="/placeholder-verification.png" alt="Verification Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'employer-smart-contract':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Smart Contract Automation</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Employer defines hiring terms in a smart contract.</p>
              <p className="mb-2">2. Candidate accepts, contract self-executes upon conditions met.</p>
              <p>3. Payments and agreements are transparent and automated.</p>
            </div>
            <img src="/placeholder-smart-contract.png" alt="Smart Contract Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'employer-pipeline':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Transparent Talent Pipeline</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Track candidate progress on an immutable ledger.</p>
              <p className="mb-2">2. All interactions and feedback are recorded securely.</p>
              <p>3. Ensure fair and unbiased hiring decisions.</p>
            </div>
            <img src="/placeholder-pipeline.png" alt="Pipeline Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'employer-branding':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Ethical Branding</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Showcase commitment to data privacy and transparency.</p>
              <p className="mb-2">2. Attract top Web3-native talent.</p>
              <p>3. Build a reputation as a forward-thinking employer.</p>
            </div>
            <img src="/placeholder-branding.png" alt="Branding Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'talent-did':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Your Decentralized Identity</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Create a unique, self-sovereign DID.</p>
              <p className="mb-2">2. Link your professional data to your DID.</p>
              <p>3. Control who accesses your information.</p>
            </div>
            <img src="/placeholder-did.png" alt="DID Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'talent-credentials':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Mint Verifiable Credentials</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Upload your certificates, degrees, and work history.</p>
              <p className="mb-2">2. TrustHire Chain verifies and mints them as NFTs.</p>
              <p>3. Your credentials are now immutable and fraud-proof.</p>
            </div>
            <img src="/placeholder-credentials.png" alt="Credentials Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'talent-privacy':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Private Job Applications</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Apply for jobs using zero-knowledge proofs.</p>
              <p className="mb-2">2. Share only the necessary information (e.g., "has a degree").</p>
              <p>3. Maintain privacy while proving qualifications.</p>
            </div>
            <img src="/placeholder-privacy.png" alt="Privacy Snippet" className="mt-4 rounded-md" />
          </div>
        );
      case 'talent-reputation':
        return (
          <div className="bg-[--color-background] p-6 rounded-lg shadow-lg border border-[--border]">
            <h4 className="text-xl font-semibold text-[--color-primary] mb-4">Build On-Chain Reputation</h4>
            <div className="bg-[--color-secondary]/30 p-4 rounded-md text-sm text-[--color-text-secondary]">
              <p className="mb-2">1. Every verified credential adds to your reputation score.</p>
              <p className="mb-2">2. Positive engagements with employers boost your profile.</p>
              <p>3. Your reputation is transparent and portable across Web3.</p>
            </div>
            <img src="/placeholder-reputation.png" alt="Reputation Snippet" className="mt-4 rounded-md" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-auto rounded-lg overflow-hidden">
      {renderSnippet()}
    </div>
  );
};

export default PlatformSnippet;


