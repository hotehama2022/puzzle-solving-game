'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type BackgroundColor = 'red' | 'yellow' | 'blue' | 'purple' | 'green' | 'orange' | 'default';

export const useLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('default');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 保存されている色をCookieから読み取って背景に設定
    const savedColor = Cookies.get('selectedColor');
    if (savedColor && savedColor !== 'default') {
      setBackgroundColor(savedColor as BackgroundColor);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 少し待機してボタンの非活性状態を見せる
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const correctPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;
    
    // BCAAの場合は専用ページに遷移
    if (password.toUpperCase() === process.env.NEXT_PUBLIC_Q4_ANSWER) {
      setError('');
      router.push('/finish');
      return;
    }
    
    if (password == correctPassword) {
      // Cookieを作成（7日間有効）
      Cookies.set('science', process.env.NEXT_PUBLIC_AUTH || '', { expires: 7 });
      setError('');
      
      // 即座にq1/themeページに遷移
      router.push('/q1/theme');
    } else {
      setError('パスワードが正しくありません');
      setPassword('');
      setIsSubmitting(false);
    }
  };

  const getBackgroundGradient = (color: BackgroundColor) => {
    switch (color) {
      case 'red':
        return 'from-red-900 via-red-800 to-red-700';
      case 'yellow':
        return 'from-yellow-900 via-yellow-800 to-amber-700';
      case 'blue':
        return 'from-blue-900 via-blue-800 to-blue-700';
      case 'purple':
        return 'from-purple-900 via-purple-800 to-indigo-700';
      case 'green':
        return 'from-green-900 via-emerald-900 to-teal-800';
      case 'orange':
        return 'from-orange-900 via-orange-800 to-red-700';
      case 'default':
      default:
        return 'from-slate-900 via-blue-900 to-slate-800';
    }
  };

  const getTextColor = (color: BackgroundColor) => {
    switch (color) {
      case 'red':
        return 'text-red-200';
      case 'yellow':
        return 'text-yellow-200';
      case 'blue':
        return 'text-blue-200';
      case 'purple':
        return 'text-purple-200';
      case 'green':
        return 'text-green-200';
      case 'orange':
        return 'text-orange-200';
      case 'default':
      default:
        return 'text-blue-200';
    }
  };

  return {
    password,
    setPassword,
    error,
    backgroundColor,
    isSubmitting,
    handleSubmit,
    getBackgroundGradient,
    getTextColor,
  };
};
