'use client';

import React from 'react';
import { useQ3 } from '@/hooks/useQ3';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function Q3Theme() {
  const {
    isLoading,
    grid,
    selectedCell,
    currentDirection,
    abcAnswer,
    validationError,
    isSubmitting,
    handleCellClick,
    handleKeyPress,
    handleAbcInputChange,
    handleAnswerSubmit,
    handleKeyboardInput,
    handleMouseDown,
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
          {/* メインクロスワードグリッド */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10" data-main-crossword>
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

          {/* ドラッグ可能な常時表示キーボード */}
          <div 
            className="fixed z-30 transition-all duration-300 cursor-move" 
            id="sticky-keyboard"
            style={{
              bottom: '16px',
              left: '16px'
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="bg-white/15 backdrop-blur-md rounded-lg p-3 border border-white/30 shadow-2xl max-w-sm">
              <div className="text-center mb-3 bg-gray-800/50 rounded p-2 cursor-move border border-gray-600/50" onMouseDown={handleMouseDown}>
                <p className="text-gray-200 text-sm font-medium">
                  {selectedCell ? `選択中: (${selectedCell.row + 1}, ${selectedCell.col + 1}) - ${currentDirection === 'horizontal' ? '横' : '縦'}` : 'セルを選択してください'}
                </p>
                <div className="text-gray-400 text-xs">📱 ドラッグで移動</div>
              </div>

              {/* 使い方説明 */}
              <div className="text-center space-y-1 mb-3 bg-gray-900/30 rounded p-2 border border-gray-700/30">
                <p className="text-gray-300 text-xs">
                  セルをクリックして選択 → カタカナキーボードで文字を入力
                </p>
                <p className="text-gray-400 text-xs">
                  💡 カタカナキーボードで直接入力できます
                </p>
                <p className="text-gray-400 text-xs">
                  💡 同じセルを再クリックで方向切り替え
                </p>
                <p className="text-gray-400 text-xs">
                  🗑️ 削除ボタンで現在の列・行の最後から順番に削除
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-3 border border-gray-600/30 shadow-2xl">
                  <Keyboard
                    onKeyPress={handleKeyboardInput}
                    layout={{
                      'default': [
                        'ア カ サ タ ナ ハ マ ヤ ラ ワ',
                        'イ キ シ チ ニ ヒ ミ ユ リ ヲ',
                        'ウ ク ス ツ ヌ フ ム ヨ ル ン',
                        'エ ケ セ テ ネ ヘ メ レ ー',
                        'オ コ ソ ト ノ ホ モ ロ',
                        'ガ ギ グ ゲ ゴ ザ ジ ズ ゼ ゾ',
                        'ダ ヂ ヅ デ ド バ ビ ブ ベ ボ',
                        'パ ピ プ ペ ポ ッ ャ ュ ョ',
                        '{bksp}'
                      ]
                    }}
                    display={{
                      'ア': 'ア', 'カ': 'カ', 'サ': 'サ', 'タ': 'タ', 'ナ': 'ナ',
                      'ハ': 'ハ', 'マ': 'マ', 'ヤ': 'ヤ', 'ラ': 'ラ', 'ワ': 'ワ',
                      'イ': 'イ', 'キ': 'キ', 'シ': 'シ', 'チ': 'チ', 'ニ': 'ニ',
                      'ヒ': 'ヒ', 'ミ': 'ミ', 'リ': 'リ',
                      'ウ': 'ウ', 'ク': 'ク', 'ス': 'ス', 'ツ': 'ツ', 'ヌ': 'ヌ',
                      'フ': 'フ', 'ム': 'ム', 'ユ': 'ユ', 'ル': 'ル',
                      'エ': 'エ', 'ケ': 'ケ', 'セ': 'セ', 'テ': 'テ', 'ネ': 'ネ',
                      'ヘ': 'ヘ', 'メ': 'メ', 'レ': 'レ',
                      'オ': 'オ', 'コ': 'コ', 'ソ': 'ソ', 'ト': 'ト', 'ノ': 'ノ',
                      'ホ': 'ホ', 'モ': 'モ', 'ヨ': 'ヨ', 'ロ': 'ロ', 'ヲ': 'ヲ', 'ン': 'ン',
                      'ガ': 'ガ', 'ギ': 'ギ', 'グ': 'グ', 'ゲ': 'ゲ', 'ゴ': 'ゴ',
                      'ザ': 'ザ', 'ジ': 'ジ', 'ズ': 'ズ', 'ゼ': 'ゼ', 'ゾ': 'ゾ',
                      'ダ': 'ダ', 'ヂ': 'ヂ', 'ヅ': 'ヅ', 'デ': 'デ', 'ド': 'ド',
                      'バ': 'バ', 'ビ': 'ビ', 'ブ': 'ブ', 'ベ': 'ベ', 'ボ': 'ボ',
                      'パ': 'パ', 'ピ': 'ピ', 'プ': 'プ', 'ペ': 'ペ', 'ポ': 'ポ',
                      'ー': 'ー', 'ッ': 'ッ', 'ャ': 'ャ', 'ュ': 'ュ', 'ョ': 'ョ',
                      '{bksp}': '削除'
                    }}
                    theme="hg-theme-default hg-layout-default"
                    buttonTheme={[
                      {
                        class: "hg-button-compact",
                        buttons: "ア カ サ タ ナ ハ マ ヤ ラ ワ イ キ シ チ ニ ヒ ミ リ ウ ク ス ツ ヌ フ ム ユ ル エ ケ セ テ ネ ヘ メ レ オ コ ソ ト ノ ホ モ ヨ ロ ヲ ン ガ ギ グ ゲ ゴ ザ ジ ズ ゼ ゾ ダ ヂ ヅ デ ド バ ビ ブ ベ ボ パ ピ プ ペ ポ ー ッ ャ ュ ョ"
                      },
                      {
                        class: "hg-button-delete-compact",
                        buttons: "{bksp}"
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .hg-button-compact {
              height: 30px !important;
              min-height: 30px !important;
              font-size: 13px !important;
              padding: 4px 6px !important;
              margin: 2px !important;
              background-color: #4b5563 !important;
              color: #ffffff !important;
              border: 1px solid #6b7280 !important;
              border-radius: 4px !important;
            }
            .hg-button-compact:hover {
              background-color: #6b7280 !important;
              transform: scale(1.05) !important;
            }
            .hg-button-compact:active {
              background-color: #374151 !important;
              transform: scale(0.95) !important;
            }
            .hg-button-delete-compact {
              height: 30px !important;
              min-height: 30px !important;
              font-size: 12px !important;
              padding: 4px 6px !important;
              margin: 2px !important;
              background-color: #dc2626 !important;
              color: #ffffff !important;
              border: 1px solid #ef4444 !important;
              border-radius: 4px !important;
            }
            .hg-button-delete-compact:hover {
              background-color: #ef4444 !important;
              transform: scale(1.05) !important;
            }
            .hg-button-delete-compact:active {
              background-color: #b91c1c !important;
              transform: scale(0.95) !important;
            }
            .hg-theme-default {
              background-color: transparent !important;
              border: none !important;
            }
            .hg-theme-default .hg-layout-default {
              max-width: 380px !important;
              background-color: transparent !important;
            }
            .hg-theme-default .hg-row {
              background-color: transparent !important;
            }
          `}</style>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}