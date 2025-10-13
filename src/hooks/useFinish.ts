'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useFinish = () => {
  const [showEvidence, setShowEvidence] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [explosion, setExplosion] = useState(false);
  const [scanningBeams, setScanningBeams] = useState(false);
  const [dataStream, setDataStream] = useState(false);
  const [molecularAnimation, setMolecularAnimation] = useState(false);
  const [finalFireworks, setFinalFireworks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 化学的なアニメーションシーケンス
    const timer1 = setTimeout(() => {
      setAnimationPhase(1);
      setScanningBeams(true);
    }, 300);
    
    const timer2 = setTimeout(() => {
      setExplosion(true);
      setMolecularAnimation(true);
    }, 800);
    
    const timer3 = setTimeout(() => {
      setAnimationPhase(2);
      setDataStream(true);
    }, 1500);
    
    const timer4 = setTimeout(() => {
      setAnimationPhase(3);
    }, 2500);
    
    const timer5 = setTimeout(() => {
      setShowEvidence(true);
      setFinalFireworks(true);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const navigateToExplanation = () => {
    router.push('/explanation');
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return {
    showEvidence,
    animationPhase,
    explosion,
    scanningBeams,
    dataStream,
    molecularAnimation,
    finalFireworks,
    navigateToExplanation,
    navigateToHome,
  };
};
