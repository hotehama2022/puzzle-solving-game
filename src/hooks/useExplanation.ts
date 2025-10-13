'use client';

import { useRouter } from 'next/navigation';

export const useExplanation = () => {
  const router = useRouter();

  const navigateToFinish = () => {
    router.push('/finish');
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return {
    navigateToFinish,
    navigateToHome,
  };
};
