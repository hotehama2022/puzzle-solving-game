import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const scienceCookie = request.cookies.get('science');
  
  // q1で始まるパスをチェック
  if (request.nextUrl.pathname.startsWith('/q1')) {
    // Cookieが存在しないか、値が正しくない場合
    if (!scienceCookie || scienceCookie.value !== process.env.NEXT_PUBLIC_AUTH) {
      // ログイン画面にリダイレクト
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // q2で始まるパスをチェック
  if (request.nextUrl.pathname.startsWith('/q2')) {
    const q1Cookie = request.cookies.get('Q1');
    
    // scienceクッキーとq1クッキーの両方をチェック
    if (!scienceCookie || scienceCookie.value !== process.env.NEXT_PUBLIC_AUTH || 
        !q1Cookie || q1Cookie.value !== process.env.NEXT_PUBLIC_Q1_ANSWER) {
      // ログイン画面にリダイレクト
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // q3で始まるパスをチェック
  if (request.nextUrl.pathname.startsWith('/q3')) {
    const q1Cookie = request.cookies.get('Q1');
    const q2Cookie = request.cookies.get('Q2');
    
    // scienceクッキー、q1クッキー、q2クッキーの全てをチェック
    if (!scienceCookie || scienceCookie.value !== process.env.NEXT_PUBLIC_AUTH || 
        !q1Cookie || q1Cookie.value !== process.env.NEXT_PUBLIC_Q1_ANSWER ||
        !q2Cookie || q2Cookie.value !== process.env.NEXT_PUBLIC_SUCCESS) {
      // ログイン画面にリダイレクト
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // q4で始まるパスをチェック
  if (request.nextUrl.pathname.startsWith('/q4')) {
    const q1Cookie = request.cookies.get('Q1');
    const q2Cookie = request.cookies.get('Q2');
    const q3Cookie = request.cookies.get('Q3');
    
    // scienceクッキー、q1クッキー、q2クッキー、q3クッキーの全てをチェック
    if (!scienceCookie || scienceCookie.value !== process.env.NEXT_PUBLIC_AUTH || 
        !q1Cookie || q1Cookie.value !== process.env.NEXT_PUBLIC_Q1_ANSWER ||
        !q2Cookie || q2Cookie.value !== process.env.NEXT_PUBLIC_SUCCESS ||
        !q3Cookie || q3Cookie.value !== process.env.NEXT_PUBLIC_SUCCESS) {
      // ログイン画面にリダイレクト
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

// middlewareを適用するパスを指定
export const config = {
  matcher: ['/q1/:path*', '/q2/:path*', '/q3/:path*', '/q4/:path*']
};
