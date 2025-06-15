
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
        return <Clock className="h-5 w-5 text-[#00FFD1]" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStepBackground = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-[#00FFD1]/10 border-[#00FFD1]/30';
      case 'current':
        return 'bg-[#00FFD1]/10 border-[#00FFD1]/30';
      case 'rejected':
        return 'bg-red-400/10 border-red-400/30';
      default:
        return 'bg-gray-800/30 border-gray-600/30';
    }
  };

  return (
    <div className="clean-card p-6">
      <h3 className="text-xl font-bold text-white mb-6">
        {title}
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#00FFD1]/30"></div>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start space-x-4 group">
              {/* Step indicator */}
              <div className={`relative z-10 p-2 rounded-full border-2 ${getStepBackground(step.status)} transition-all duration-300`}>
                {getStepIcon(step.status)}
              </div>
              
              {/* Step content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">
                    {step.title}
                  </h4>
                  {step.timestamp && (
                    <span className="text-xs text-gray-400">{step.timestamp}</span>
                  )}
                </div>
                <p className="text-sm text-gray-300">
                  {step.description}
                </p>
                
                {/* Status indicator */}
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    step.status === 'completed' ? 'verified-badge' :
                    step.status === 'current' ? 'verified-badge' :
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
