
import React from 'react';
import Web3Navigation from './Web3Navigation';

interface NavigationProps {
  userType: 'seeker' | 'employer';
}

const Navigation: React.FC<NavigationProps> = ({ userType }) => {
  return <Web3Navigation userType={userType} />;
};

export default Navigation;
