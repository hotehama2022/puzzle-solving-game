'use client';

import { useQ1 } from '@/hooks/useQ1';

type PrimaryColor = 'red' | 'yellow' | 'blue';

export default function Q1Theme() {
  const {
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
  } = useQ1();

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
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(backgroundColor)} flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ease-in-out`}>
      {/* 背景の化学要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl animate-float chem-element">🧪</div>
        <div className="absolute top-20 right-20 text-3xl animate-bubble chem-element">⚗️</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float chem-element">🔬</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bubble chem-element">⚛️</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-700 chem-element">🧬</div>
        <div className="absolute top-1/3 right-1/3 text-4xl animate-float delay-300 chem-element">💊</div>
      </div>

      {/* 隠されたヒントメッセージ */}
      {showHint && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-green-300 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl mb-3 animate-pulse">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">実験成功！</h3>
              <p className="text-green-200 text-sm mb-3">緑色の薬品から重要な手がかりが発見されました</p>
              <div className="bg-white/20 rounded-lg p-3 border border-green-200/50">
                <p className="text-green-100 text-lg font-semibold">🍪を見ろ</p>
              </div>
              <p className="text-green-300 text-xs mt-2 opacity-80">※この手がかりを実験レポートに記録してください</p>
            </div>
          </div>
        </div>
      )}

      {/* 右上のボタン群 */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold text-sm shadow-lg cursor-pointer"
        >
          ログアウト
        </button>
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
                  <span>🔍 ヒント1: 実験の基本</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint1' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint1' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>3つの基本薬品を組み合わせることで、新しい薬品を作ることができます。</p>
                    <p className="mt-2">特に、青色薬品Cと黄色薬品Bの組み合わせに注目してみてください。</p>
                  </div>
                )}
              </div>

              {/* ヒント2 */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleHint('hint2')}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left text-white font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>🍪 ヒント2: 隠された情報</span>
                  <span className={`transform transition-transform ${expandedHint === 'hint2' ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedHint === 'hint2' && (
                  <div className="px-4 py-3 bg-white/5 text-white/80 text-sm">
                    <p>緑色の薬品を作成すると、重要な情報がブラウザに保存されます。</p>
                    <p className="mt-2">開発者ツール（F12）のApplicationタブでCookieを確認してみてください。</p>
                    <p className="mt-2 text-yellow-300">キー「Q1」の値が答えのヒントです。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl">
        <div className="glass-effect rounded-2xl p-8 shadow-2xl animate-glow">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bubble">⚗️</div>
            <h1 className="text-4xl font-bold text-white mb-2">化学実験室</h1>
            <p className={`${getTextColor(backgroundColor)} transition-colors duration-500`}>
              薬品の調合実験を行います
            </p>
            <div className="mt-2 text-sm text-white/70">
              🎯 目標：緑色の薬品を作成しよう
            </div>
          </div>

          <div className="space-y-6">
            {/* 薬品の調合実験 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">⚗️ Q1.薬品の調合実験</h2>
              
              {/* 選択された薬品の表示 */}
              <div className="mb-4">
                <p className="text-white text-sm mb-2">調合中の薬品:</p>
                <div className="flex space-x-2">
                  {selectedColors.length === 0 && (
                    <span className="text-gray-400 text-sm">薬品が選択されていません</span>
                  )}
                  {selectedColors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <span className="text-lg">
                        {color === 'red' && '🧪'}
                        {color === 'yellow' && '🧪'}
                        {color === 'blue' && '🧪'}
                      </span>
                      <span className="text-white text-sm">
                        {color === 'red' && '赤色薬品A'}
                        {color === 'yellow' && '黄色薬品B'}
                        {color === 'blue' && '青色薬品C'}
                      </span>
                    </div>
                  ))}
                  {selectedColors.length === 2 && (
                    <div className="flex items-center space-x-1">
                      <span className="text-white text-sm">→</span>
                      <span className="text-lg">⚗️</span>
                      <span className="text-white text-sm">
                        {backgroundColor === 'purple' && '紫色調合薬'}
                        {backgroundColor === 'green' && '緑色調合薬 ✅'}
                        {backgroundColor === 'orange' && 'オレンジ調合薬'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 基本薬品ボタン */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {(['red', 'yellow', 'blue'] as PrimaryColor[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    disabled={selectedColors.length >= 2 && !selectedColors.includes(color)}
                    className={`
                      px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer
                      ${selectedColors.includes(color) ? 'ring-2 ring-white scale-105' : ''}
                      ${color === 'red' ? 'bg-red-600 hover:bg-red-700' : ''}
                      ${color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                      ${color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">🧪</span>
                      <span className="text-xs">
                        {color === 'red' && '赤色薬品A'}
                        {color === 'yellow' && '黄色薬品B'}
                        {color === 'blue' && '青色薬品C'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* リセットボタン */}
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold cursor-pointer"
                >
                  🧹 調合リセット
                </button>
              </div>
            </div>

            {/* 答え入力フォーム */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">📝 実験レポート</h2>
              <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                <div className="mb-4">
                  <p className={`${getTextColor(backgroundColor)} transition-colors duration-500 text-center mb-4`}>
                    実験で発見したものは何ですか？
                  </p>
                </div>
                
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="発見したものを入力..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer ${
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
