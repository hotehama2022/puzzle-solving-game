'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useQ4 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 必要なCookieをすべてチェック
    const scienceCookie = Cookies.get('science');
    const q1Cookie = Cookies.get('Q1');
    const q2Cookie = Cookies.get('Q2');
    const q3Cookie = Cookies.get('Q3');

    // どれか一つでも欠けている場合はトップページにリダイレクト
    if (!scienceCookie || scienceCookie !== process.env.NEXT_PUBLIC_AUTH ||
        !q1Cookie || q1Cookie !== process.env.NEXT_PUBLIC_Q1_ANSWER ||
        !q2Cookie || q2Cookie !== process.env.NEXT_PUBLIC_SUCCESS ||
        !q3Cookie || q3Cookie !== process.env.NEXT_PUBLIC_SUCCESS) {
      router.push('/');
      return;
    }

    // Q4画面に到達した時点でQ4クッキーを自動作成
    Cookies.set('Q4', process.env.NEXT_PUBLIC_SUCCESS || '', { expires: 7 });

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Cookieを削除
    Cookies.remove('science');
    // トップページに遷移
    router.push('/');
  };

  return {
    isLoading,
    handleLogout,
  };
};
