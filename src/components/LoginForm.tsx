'use client';

import { useLogin } from '@/hooks/useLogin';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const { password, setPassword, error, backgroundColor, isSubmitting, handleSubmit, getBackgroundGradient, getTextColor } = useLogin();
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [expandedHint, setExpandedHint] = useState<string | null>(null);
  const [hasQ4Cookie, setHasQ4Cookie] = useState(false);

  useEffect(() => {
    // Q4クッキーの存在を確認
    const q4Cookie = Cookies.get('Q4');
    setHasQ4Cookie(q4Cookie === process.env.NEXT_PUBLIC_SUCCESS);
  }, []);

  const toggleHintPanel = () => {
    setShowHintPanel(!showHintPanel);
  };

  const toggleHint = (hintId: string) => {
    setExpandedHint(expandedHint === hintId ? null : hintId);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(backgroundColor)} flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ease-in-out`}>
      {/* ヒントボタン */}
      {hasQ4Cookie && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleHintPanel}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold text-sm shadow-lg cursor-pointer"
          >
            💡 ヒント
          </button>
        </div>
      )}
      {/* 背景の化学要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-float chem-element">⚗️</div>
        <div className="absolute top-20 right-20 text-4xl animate-bubble chem-element">🧪</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000 chem-element">🔬</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-pulse delay-500 chem-element">⚛️</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-float delay-700 chem-element">🧬</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-bubble delay-300 chem-element">💊</div>
        <div className="absolute top-3/4 right-1/4 text-4xl animate-float delay-500 chem-element">🔬</div>
        <div className="absolute top-1/4 left-3/4 text-2xl animate-bubble delay-1000 chem-element">⚛️</div>
      </div>

      {/* 分子構造の背景パターン */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="molecule" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white"/>
              <circle cx="15" cy="15" r="1" fill="white"/>
              <line x1="5" y1="5" x2="15" y2="15" stroke="white" strokeWidth="0.2"/>
              <circle cx="15" cy="5" r="1" fill="white"/>
              <line x1="5" y1="5" x2="15" y2="5" stroke="white" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#molecule)"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* メインログインカード */}
        <div className="glass-effect rounded-2xl p-8 shadow-2xl animate-glow">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bubble">🧪</div>
            <h1 className="text-3xl font-bold text-white mb-2">ログイン</h1>
            <p className={`${getTextColor(backgroundColor)} transition-colors duration-500`}>パスワードを入力してください</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="password" className={`block text-sm font-medium ${getTextColor(backgroundColor)} transition-colors duration-500 mb-2`}>
                🔐 パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholder="••••"
                maxLength={4}
                required
              />
              <div className={`absolute right-3 top-9 ${getTextColor(backgroundColor)} transition-colors duration-500`}>
                ⚛️
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm animate-shake">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer ${
                isSubmitting ? 'opacity-50 cursor-not-allowed transform-none' : ''
              }`}
            >
              {isSubmitting ? '送信中...' : 'ログイン'}
            </button>
          </form>

        </div>
      </div>

      {/* ヒントパネル */}
      {hasQ4Cookie && showHintPanel && (
        <div className="absolute top-16 right-4 z-30 w-80">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">💡 隠しログインのヒント</h3>
              <button
                onClick={toggleHintPanel}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {/* 隠しログインのヒント1 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint0')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>📖 ヒント1</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint0' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint0' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p className="mt-2">あらすじを確認してみてください。</p>
                    <p className="mt-2 text-yellow-300">💡 そこには重要な手がかりが隠されています...</p>
                  </div>
                )}
              </div>

              {/* 隠しログインのヒント2 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint1')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>🎨 ヒント2</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint1' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint1' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>「オレンジ色に染まった PC 画面だけ・・・」ここから、元々この画面はオレンジだったことがわかります。</p>
                    <p className="mt-2">さてこの画面をオレンジにする方法何かあるでしょうか？</p>
                    <p className="mt-2 text-yellow-300">💡 背景を変えられる画面があったはずです...</p>
                  </div>
                )}
              </div>

              {/* ヒント3 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint2')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>🧪 ヒント3</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint2' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint2' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>Q1画面の薬品調合で背景の色が変えられたはずです。</p>
                    <p className="mt-2">そこでオレンジになるように色を調合してここの画面に戻ってきましょう。</p>
                    <p className="mt-2 text-yellow-300">💡 赤 + 黄 = オレンジ</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q4クリア後かつオレンジ背景時の特別情報 */}
      {hasQ4Cookie && backgroundColor === 'orange' && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-80">
          <div className="bg-gradient-to-r from-blue-600/90 to-purple-700/90 backdrop-blur-lg rounded-xl p-4 border-2 border-blue-300/80 shadow-lg shadow-blue-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-xl animate-pulse">💎</div>
              <h3 className="text-sm font-bold text-white">特別情報が開示されました</h3>
            </div>
            
            <div className="bg-white/20 rounded-lg p-3 border border-blue-200/40">
              <p className="text-white text-xs leading-relaxed">
                <span className="text-blue-200 font-semibold">🎯 次のステップ：</span><br/>
                GitHubリポジトリの <code className="bg-blue-900/70 px-2 py-1 rounded text-blue-100 font-mono text-xs">src/app/q5/theme/README.md</code> を確認してください
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
