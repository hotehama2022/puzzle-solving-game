'use client';

import { useQ3 } from '@/hooks/useQ3';

export default function Q3Theme() {
  const {
    isLoading,
    grid,
    selectedCell,
    currentDirection,
    inputValue,
    abcAnswer,
    validationError,
    isSubmitting,
    handleCellClick,
    handleKeyPress,
    handleInputChange,
    handleAbcInputChange,
    handleAnswerSubmit,
  } = useQ3();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🔬</div>
          <h1 className="text-4xl font-bold text-white mb-2">Q3. 分子構造解析パズル</h1>
          <p className="text-purple-200">
            サイバーセキュリティの分子構造を解析しよう
          </p>
        </div>

        <div className="space-y-6">
          {/* クロスワードグリッド */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">⚛️ 分子構造マトリックス</h2>

            <div
              className="flex justify-center"
              tabIndex={0}
              onKeyDown={handleKeyPress}
              style={{ outline: 'none' }}
            >
              <div className="grid grid-cols-6 gap-1 bg-gray-800 p-4 rounded-lg">
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        w-10 h-10 border border-gray-600 flex items-center justify-center text-lg font-bold cursor-pointer relative
                        ${cell.isBlack
                          ? 'bg-gray-900'
                          : cell.isHighlighted
                            ? 'bg-blue-300 text-black'
                            : selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                              ? 'bg-yellow-300 text-black'
                              : 'bg-white text-black hover:bg-gray-100'
                        }
                        transition-all duration-200
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell.number && (
                        <span className="absolute top-0 left-0 text-xs text-gray-600 font-normal">
                          {cell.number}
                        </span>
                      )}
                      {!cell.isBlack && (
                        <span className="mt-1">{cell.value}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="text-center mt-4 space-y-3">
              <p className="text-white/80 text-sm">
                方向: {currentDirection === 'horizontal' ? '横' : '縦'}
                {selectedCell && (
                  <span className="ml-2 text-yellow-300">
                    選択中: ({selectedCell.row + 1}, {selectedCell.col + 1})
                  </span>
                )}
              </p>

              {/* カタカナ入力フィールド */}
              <div className="flex justify-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="ひらがな・カタカナを入力"
                  className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 text-center w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="off"
                />
              </div>

              <p className="text-white/60 text-xs">
                セルをクリックして選択 → 上の入力欄でひらがな・カタカナを入力
              </p>
              <p className="text-white/50 text-xs">
                💡 ひらがなは自動的にカタカナに変換されます
              </p>
              <p className="text-white/50 text-xs">
                💡 同じセルを再クリックで方向切り替え
              </p>
            </div>
          </div>

          {/* ヒント */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">📝 ヒント</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">横のかぎ</h3>
                <div className="space-y-2 text-sm text-purple-200">
                  <div><span className="font-bold text-yellow-300">1.</span> 信頼を前提としないセキュリティモデル（6文字）</div>
                  <div><span className="font-bold text-yellow-300">4.</span> データの複製や保存（6文字）</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">縦のかぎ</h3>
                <div className="space-y-2 text-sm text-purple-200">
                  <div><span className="font-bold text-yellow-300">2.</span> 認証や認可に使用される文字列（4文字）</div>
                  <div><span className="font-bold text-yellow-300">3.</span> LANの中で、MACアドレスを元にパケットを転送する装置<br/>（4文字）</div>
                </div>
              </div>
            </div>
          </div>

          {/* ABC入力エリア */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">📝 回答</h2>
            <div className="text-center space-y-4">
              <div className="text-lg text-white">
                <span className="font-bold text-yellow-300">ABC</span> = 
                <span className="text-2xl font-bold text-green-300 ml-2">???</span>
              </div>
              
              <form onSubmit={handleAnswerSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      value={abcAnswer}
                      onChange={handleAbcInputChange}
                      placeholder="答えをカタカナで入力"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed transform-none' : ''
                      }`}
                    >
                      {isSubmitting ? '送信中...' : '答えを提出'}
                    </button>
                  </div>
                </div>
                
                {validationError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm text-center">
                    ❌ {validationError}
                  </div>
                )}
              </form>
              
              <div className="text-sm text-white/70 space-y-1">
                <p>💡 ひらがなは自動的にカタカナに変換されます</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
