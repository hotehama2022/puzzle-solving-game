'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type PrimaryColor = 'red' | 'yellow' | 'blue';
type MixedColor = 'purple' | 'green' | 'orange';
type BackgroundColor = PrimaryColor | MixedColor | 'default';

export const useQ1 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState<PrimaryColor[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('default');
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [expandedHint, setExpandedHint] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cookieをチェック
    const scienceCookie = Cookies.get('science');
    
    if (!scienceCookie || scienceCookie !== process.env.NEXT_PUBLIC_AUTH) {
      // Cookieが存在しないか無効な場合、ログイン画面にリダイレクト
      router.push('/');
      return;
    }
    
    // 保存されている色をCookieから読み取って背景に設定
    const savedColor = Cookies.get('selectedColor');
    if (savedColor && savedColor !== 'default') {
      setBackgroundColor(savedColor as BackgroundColor);
      
      // 混合色の場合は、対応する基本色も復元
      if (savedColor === 'purple') {
        setSelectedColors(['red', 'blue']);
      } else if (savedColor === 'orange') {
        setSelectedColors(['red', 'yellow']);
      } else if (savedColor === 'green') {
        setSelectedColors(['blue', 'yellow']);
      } else if (['red', 'yellow', 'blue'].includes(savedColor)) {
        setSelectedColors([savedColor as PrimaryColor]);
      }
    }
    
    // 認証済みの場合、ローディングを終了
    setIsLoading(false);
  }, [router]);

  // 色の混合ロジック
  useEffect(() => {
    let newBackgroundColor: BackgroundColor = 'default';
    
    if (selectedColors.length === 2) {
      const sortedColors = [...selectedColors].sort();
      if (sortedColors.includes('red') && sortedColors.includes('blue')) {
        newBackgroundColor = 'purple';
      } else if (sortedColors.includes('red') && sortedColors.includes('yellow')) {
        newBackgroundColor = 'orange';
      } else if (sortedColors.includes('blue') && sortedColors.includes('yellow')) {
        newBackgroundColor = 'green';
      }
      
      // 混合された色をCookieに保存
      Cookies.set('selectedColor', newBackgroundColor, { expires: 7 });
    } else if (selectedColors.length === 1) {
      newBackgroundColor = selectedColors[0];
    } else {
      newBackgroundColor = 'default';
    }
    
    setBackgroundColor(newBackgroundColor);
  }, [selectedColors]);

  // 背景色が緑の時にヒントを表示とCookieを発行
  useEffect(() => {
    if (backgroundColor === 'green') {
      // Cookieを発行
      Cookies.set('Q1', 'chemical', { expires: 7 });
      
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 1000); // 1秒後に表示
      return () => clearTimeout(timer);
    } else {
      setShowHint(false);
    }
  }, [backgroundColor]);

  const handleColorSelect = (color: PrimaryColor) => {
    let newSelectedColors: PrimaryColor[];
    
    if (selectedColors.includes(color)) {
      // 既に選択されている色を削除
      newSelectedColors = selectedColors.filter(c => c !== color);
    } else if (selectedColors.length < 2) {
      // 最大2色まで選択可能
      newSelectedColors = [...selectedColors, color];
    } else {
      // 2色既に選択されている場合は何もしない
      return;
    }
    
    setSelectedColors(newSelectedColors);
    
    // 選択状態に応じてCookieを更新
    if (newSelectedColors.length === 0) {
      Cookies.set('selectedColor', 'default', { expires: 7 });
    } else if (newSelectedColors.length === 1) {
      Cookies.set('selectedColor', newSelectedColors[0], { expires: 7 });
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
    setBackgroundColor('default');
    Cookies.set('selectedColor', 'default', { expires: 7 });
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError(''); // エラーをクリア
    
    // 少し待機してボタンの非活性状態を見せる
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (answer.toLowerCase().includes(process.env.NEXT_PUBLIC_Q1_ANSWER || '')) {
      // 正解の場合、すぐにq2/themeページに遷移
      router.push('/q2/theme');
    } else {
      setValidationError('正解ではありません。ヒントを参考にもう一度考えてみてください。');
      setIsSubmitting(false);
      // 間違いの場合、少し待ってからエラーメッセージをクリア
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

  const handleLogout = () => {
    Cookies.remove('science');
    router.push('/');
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
    isLoading,
    selectedColors,
    backgroundColor,
    showHint,
    answer,
    setAnswer,
    showHintPanel,
    expandedHint,
    validationError,
    isSubmitting,
    handleColorSelect,
    handleReset,
    handleAnswerSubmit,
    toggleHintPanel,
    toggleHint,
    handleLogout,
    getBackgroundGradient,
    getTextColor,
  };
};
