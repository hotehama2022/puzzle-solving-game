'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useQ2 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [expandedHint, setExpandedHint] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cookieをチェック
    const scienceCookie = Cookies.get('science');
    const q1Cookie = Cookies.get('Q1');
    
    if (!scienceCookie || scienceCookie !== process.env.NEXT_PUBLIC_AUTH || 
        !q1Cookie || q1Cookie !== process.env.NEXT_PUBLIC_Q1_ANSWER) {
      // Cookieが存在しないか無効な場合、ログイン画面にリダイレクト
      router.push('/');
      return;
    }
    
    // 認証済みの場合、ローディングを終了
    setIsLoading(false);
    
    // Q2のヒントをコンソールに表示
    console.log(`Q2の答えは「${process.env.NEXT_PUBLIC_Q2_ANSWER}」`);
  }, [router]);

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError('');
    
    // 少し待機してボタンの非活性状態を見せる
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (answer.toLowerCase().includes(process.env.NEXT_PUBLIC_Q2_ANSWER || '')) {
      // 正解の場合、Q2クッキーを作成してからQ3に遷移
      Cookies.set('Q2', process.env.NEXT_PUBLIC_SUCCESS || '', { expires: 7 });
      router.push('/q3/theme');
    } else {
      setValidationError('正解ではありません。化学式のヒントを参考にもう一度考えてみてください。');
      setIsSubmitting(false);
      setTimeout(() => {
        setValidationError('');
      }, 3000);
    }
  };

  const toggleHintPanel = () => {
    setShowHintPanel(!showHintPanel);
  };

  const toggleHint = (hintId: string) => {
    setExpandedHint(expandedHint === hintId ? null : hintId);
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return {
    isLoading,
    answer,
    setAnswer,
    validationError,
    showHintPanel,
    expandedHint,
    showImageModal,
    isSubmitting,
    handleAnswerSubmit,
    toggleHintPanel,
    toggleHint,
    openImageModal,
    closeImageModal,
  };
};
