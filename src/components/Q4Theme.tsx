'use client';

import { useQ4 } from '@/hooks/useQ4';
import { useState } from 'react';

export default function Q4Theme() {
  const {
    isLoading,
    handleLogout,
  } = useQ4();
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [expandedHint, setExpandedHint] = useState<string | null>(null);

  const toggleHintPanel = () => {
    setShowHintPanel(!showHintPanel);
  };

  const toggleHint = (hintId: string) => {
    setExpandedHint(expandedHint === hintId ? null : hintId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* ヒントボタン */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleHintPanel}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold text-sm shadow-lg cursor-pointer"
        >
          💡 ヒント
        </button>
      </div>
      {/* 背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center">
        {/* メインコンテンツ */}
        <div className="mb-12">
          {/* メインメッセージの表示 */}
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-pulse">🔍</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ここには証拠は<br />なかった
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 font-medium mb-4">
              Nothing was found here...
            </div>
          </div>

          {/* 説明文 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 mb-8">
            <p className="text-lg text-white/90 leading-relaxed">
              この場所からは<br />
              <span className="text-red-300 font-semibold">求めていた証拠は見つかりませんでした。</span><br />
              <br />
              <span className="text-yellow-300 font-semibold">もう一度GitHubの導入をよく見てみよう。<br />
              隠されたヒントがまだあるかもしれません。</span>
            </p>
          </div>
        </div>

        {/* ログアウトボタン */}
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
          >
            ログアウト
          </button>
          
          <p className="text-white/70 text-sm">
            ログアウトしてトップページに戻ります
          </p>
        </div>

        {/* 装飾的な要素 - 調査のイメージ */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce opacity-30" style={{ animationDelay: '1s' }}>
          📄
        </div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce opacity-30" style={{ animationDelay: '2s' }}>
          🔎
        </div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce opacity-30" style={{ animationDelay: '3s' }}>
          📂
        </div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}>
          🗂️
        </div>
      </div>

      {/* ヒントパネル */}
      {showHintPanel && (
        <div className="absolute top-16 right-4 z-30 w-80">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">💡 Q4のヒント</h3>
              <button
                onClick={toggleHintPanel}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {/* ヒント1 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint1')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>🔍 ヒント1: メッセージの意味</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint1' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint1' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>「ここには証拠はなかった」というメッセージに注目してください。</p>
                    <p className="mt-2">調査が完了していない可能性があります。</p>
                  </div>
                )}
              </div>

              {/* ヒント2 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint2')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>📂 ヒント2: 別の場所を探す</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint2' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint2' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>GitHubの導入部分をもう一度よく見てみましょう。</p>
                    <p className="mt-2">隠されたヒントがまだ残っているかもしれません。</p>
                    <p className="mt-2 text-yellow-300">別の場所に真の証拠があるかもしれません。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
