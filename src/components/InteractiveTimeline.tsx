
import React from 'react';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
  timestamp?: string;
}

interface InteractiveTimelineProps {
  steps: TimelineStep[];
  title: string;
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ steps, title }) => {
  const getStepIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-[#00FFD1]" />;
      case 'current':
        return <Clock className="h-5 w-5 text-[#FF6B35] animate-pulse" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStepGlow = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'neon-glow bg-gradient-to-r from-[#00FFD1]/20 to-[#6B46FF]/20';
      case 'current':
        return 'bg-gradient-to-r from-[#FF6B35]/20 to-[#6B46FF]/20 animate-pulse';
      case 'rejected':
        return 'bg-gradient-to-r from-red-400/20 to-red-600/20';
      default:
        return 'bg-gray-800/30';
    }
  };

  return (
    <div className="cyber-card p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="text-gradient">{title}</span>
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FFD1] via-[#6B46FF] to-[#FF6B35] opacity-30"></div>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start space-x-4 group">
              {/* Step indicator */}
              <div className={`relative z-10 p-2 rounded-full border-2 border-gray-700 ${getStepGlow(step.status)} transition-all duration-300 group-hover:scale-110`}>
                {getStepIcon(step.status)}
              </div>
              
              {/* Step content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#00FFD1] transition-colors">
                    {step.title}
                  </h4>
                  {step.timestamp && (
                    <span className="text-xs text-gray-400">{step.timestamp}</span>
                  )}
                </div>
                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                  {step.description}
                </p>
                
                {/* Status indicator */}
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    step.status === 'completed' ? 'bg-[#00FFD1]/20 text-[#00FFD1]' :
                    step.status === 'current' ? 'bg-[#FF6B35]/20 text-[#FF6B35]' :
                    step.status === 'rejected' ? 'bg-red-400/20 text-red-400' :
                    'bg-gray-700/20 text-gray-400'
                  }`}>
                    {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;
