import { ethers } from 'ethers';
import { toast } from 'sonner';

// Contract ABIs
const REPUTATION_SYSTEM_ABI = [
  "function getAverageRating(address _entity) view returns (uint256)",
  "function getNumRatings(address _entity) view returns (uint256)",
  "function submitRating(address _ratedEntity, uint256 _score)",
  "function getReputationScore(address _entity) view returns (uint256)"
];

const JOB_CONTRACT_ABI = [
  "function createJob(string memory _title, string memory _description, uint256 _salary) public",
  "function applyForJob(uint256 _jobId) public",
  "function getJob(uint256 _jobId) view returns (string memory, string memory, uint256, address, bool)",
  "function getJobCount() view returns (uint256)"
];

// Contract addresses (replace with your deployed contract addresses)
const REPUTATION_SYSTEM_ADDRESS = process.env.VITE_REPUTATION_SYSTEM_ADDRESS || '';
const JOB_CONTRACT_ADDRESS = process.env.VITE_JOB_CONTRACT_ADDRESS || '';

class BlockchainService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private reputationContract: ethers.Contract | null = null;
  private jobContract: ethers.Contract | null = null;

  async initialize() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask to use this feature');
    }

    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      this.signer = this.provider.getSigner();

      this.reputationContract = new ethers.Contract(
        REPUTATION_SYSTEM_ADDRESS,
        REPUTATION_SYSTEM_ABI,
        this.signer
      );

      this.jobContract = new ethers.Contract(
        JOB_CONTRACT_ADDRESS,
        JOB_CONTRACT_ABI,
        this.signer
      );

      return true;
    } catch (error) {
      console.error('Error initializing blockchain service:', error);
      toast.error('Failed to connect to blockchain');
      return false;
    }
  }

  async getReputationScore(address: string): Promise<number> {
    if (!this.reputationContract) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const score = await this.reputationContract.getReputationScore(address);
      return score.toNumber();
    } catch (error) {
      console.error('Error getting reputation score:', error);
      throw error;
    }
  }

  async submitRating(ratedEntity: string, score: number): Promise<void> {
    if (!this.reputationContract) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const tx = await this.reputationContract.submitRating(ratedEntity, score);
      await tx.wait();
      toast.success('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
      throw error;
    }
  }

  async createJob(title: string, description: string, salary: number): Promise<void> {
    if (!this.jobContract) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const tx = await this.jobContract.createJob(title, description, salary);
      await tx.wait();
      toast.success('Job created on blockchain');
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job on blockchain');
      throw error;
    }
  }

  async applyForJob(jobId: number): Promise<void> {
    if (!this.jobContract) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const tx = await this.jobContract.applyForJob(jobId);
      await tx.wait();
      toast.success('Application submitted on blockchain');
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Failed to submit application on blockchain');
      throw error;
    }
  }

  async getJobDetails(jobId: number): Promise<any> {
    if (!this.jobContract) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const job = await this.jobContract.getJob(jobId);
      return {
        title: job[0],
        description: job[1],
        salary: job[2].toNumber(),
        employer: job[3],
        isActive: job[4]
      };
    } catch (error) {
      console.error('Error getting job details:', error);
      throw error;
    }
  }
}

export const blockchainService = new BlockchainService(); 