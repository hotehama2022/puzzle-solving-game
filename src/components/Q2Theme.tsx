'use client';

import Image from 'next/image';
import { useQ2 } from '@/hooks/useQ2';

export default function Q2Theme() {
  const {
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
  } = useQ2();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="glass-effect rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🧪</div>
            <p className="text-blue-200">認証を確認中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景の化学要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl animate-float chem-element">🧪</div>
        <div className="absolute top-20 right-20 text-3xl animate-bubble chem-element">⚗️</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float chem-element">🔬</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bubble chem-element">⚛️</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-700 chem-element">🧬</div>
        <div className="absolute top-1/3 right-1/3 text-4xl animate-float delay-300 chem-element">💊</div>
      </div>

      {/* 右上のヒントボタン */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleHintPanel}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold text-sm shadow-lg cursor-pointer"
        >
          💡 ヒント
        </button>
      </div>

      {/* ヒントパネル */}
      {showHintPanel && (
        <div className="absolute top-16 right-4 z-30 w-80">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">💡 ヒント</h3>
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
                  <span>🔬 ヒント1: 元素記号</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint1' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint1' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>数字は原子番号を表しています。</p>
                    <p className="mt-2">19 = カリウム(K)、8 = 酸素(O)、7 = 窒素(N)、16 = 硫黄(S)、44 = ルテニウム(Ru)</p>
                  </div>
                )}
              </div>

              {/* ヒント2 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint2')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>🧮 ヒント2: 文字の組み合わせ</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint2' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint2' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>K + O = コ、N = ン、S + O = ソ、Ru = ル</p>
                    <p className="mt-2">並べると「コンソール」になります。</p>
                    <p className="mt-2 text-yellow-300">「コンソールを確認せよ」が完成した文章です。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 画像拡大モーダル */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] p-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-2 -right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors"
            >
              ✕
            </button>
            <div className="bg-white rounded-lg p-4 shadow-2xl">
              <Image
                src="/chemical.jpg"
                alt="資料（拡大表示）"
                width={800}
                height={600}
                className="rounded max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-white text-center mt-4 text-lg">
              📋 資料（拡大表示）
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl">
        <div className="glass-effect rounded-2xl p-8 shadow-2xl animate-glow">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bubble">🧬</div>
            <h1 className="text-4xl font-bold text-white mb-2">Q2. 実験ノート</h1>
            <p className="text-purple-200">
              実験ノートから重要な手がかりを見つけよう
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white text-center">📋 資料</h2>
                  <div className="flex justify-center">
                    <div 
                      className="bg-white rounded-lg p-2 cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      onClick={openImageModal}
                    >
                      <Image
                        src="/chemical.jpg"
                        alt="資料"
                        width={400}
                        height={280}
                        className="rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  <p className="text-white/80 text-sm text-center">
                    📋 クリックで拡大表示
                  </p>
                </div>

                {/* 化学式問題（右側） */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white text-center">🧪 化学式</h2>
                  
                  {/* 問題部分 */}
                  <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <h3 className="text-lg font-medium text-white mb-4 text-center">問題:</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-lg p-3 border border-blue-400/30">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-200 text-lg font-mono">19 + 8 =</span>
                            <span className="text-yellow-300 font-bold text-xl">コ</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-lg p-3 border border-blue-400/30">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-200 text-lg font-mono">7 =</span>
                            <span className="text-yellow-300 font-bold text-xl">ン</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-red-500/15 to-red-600/15 rounded-lg p-3 border border-red-400/30">
                          <div className="flex items-center justify-between">
                            <span className="text-red-200 text-lg font-mono">16 + 8 =</span>
                            <span className="text-orange-300 font-bold text-xl">？ー</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-red-500/15 to-red-600/15 rounded-lg p-3 border border-red-400/30">
                          <div className="flex items-center justify-between">
                            <span className="text-red-200 text-lg font-mono">44 =</span>
                            <span className="text-orange-300 font-bold text-xl">?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 結果説明 */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg p-4 border border-purple-400/30">
                    <div className="text-center space-y-2">
                      <div className="text-white font-bold text-lg bg-white/10 rounded-lg p-3 inline-block">
                        ◯◯◯◯◯を確認せよ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 答え入力フォーム */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">📝 回答</h2>
              <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="answer" className="block text-sm font-medium text-white mb-2">
                      答えを入力してください:
                    </label>
                    <input
                      type="text"
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                      placeholder="回答を入力..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed transform-none' : ''
                    }`}
                  >
                    {isSubmitting ? '送信中...' : '答えを提出'}
                  </button>
                  
                  {validationError && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm text-center">
                      ❌ {validationError}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
