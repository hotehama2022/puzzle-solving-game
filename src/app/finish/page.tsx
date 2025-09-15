'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinishPage() {
  const [showEvidence, setShowEvidence] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [explosion, setExplosion] = useState(false);
  const [scanningBeams, setScanningBeams] = useState(false);
  const [dataStream, setDataStream] = useState(false);
  const [molecularAnimation, setMolecularAnimation] = useState(false);
  const [finalFireworks, setFinalFireworks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 化学的なアニメーションシーケンス
    const timer1 = setTimeout(() => {
      setAnimationPhase(1);
      setScanningBeams(true);
    }, 300);
    
    const timer2 = setTimeout(() => {
      setExplosion(true);
      setMolecularAnimation(true);
    }, 800);
    
    const timer3 = setTimeout(() => {
      setAnimationPhase(2);
      setDataStream(true);
    }, 1500);
    
    const timer4 = setTimeout(() => {
      setAnimationPhase(3);
    }, 2500);
    
    const timer5 = setTimeout(() => {
      setShowEvidence(true);
      setFinalFireworks(true);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* 爆発エフェクト */}
      {explosion && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            // インデックスベースで固定値を生成
            const distance = 50 + ((i * 7) % 100);
            const delay = (i * 0.025) % 0.5;
            
            return (
              <div
                key={`explosion-${i}`}
                className="absolute w-4 h-4 bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 rounded-full animate-explosion"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 18}deg) translateY(-${distance}px)`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          
          {/* 中央爆発 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-gradient-radial from-white via-yellow-300 to-transparent rounded-full animate-explosion-center opacity-90" />
          </div>
        </div>
      )}

      {/* 化学的スキャニングビーム */}
      {scanningBeams && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={`scan-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-sweep opacity-60"
              style={{
                width: '2px',
                height: '100%',
                left: '50%',
                animationDelay: `${i * 0.3}s`,
                transform: `translateX(-50%) rotate(${i * 90}deg)`,
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>
      )}

      {/* 分子構造アニメーション */}
      {molecularAnimation && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={`molecule-${i}`}
              className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-molecular-orbit opacity-80"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-60px)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
        </div>
      )}

      {/* 化学データストリーム */}
      {dataStream && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={`data-${i}`}
              className="absolute text-cyan-400 font-mono text-xs animate-data-flow opacity-70"
              style={{
                left: `${15 + i * 12}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {['C₆H₁₃NO₂', 'pH 7.4', 'ΔG=-5.2', 'T=37°C', 'NMR δ0.95', 'MS m/z 131'][i]}
            </div>
          ))}
        </div>
      )}

      {/* 最終花火エフェクト */}
      {finalFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => {
            // インデックスベースで固定値を生成
            const left = 20 + ((i * 11 + 7) % 60);
            const top = 20 + ((i * 13 + 11) % 60);
            const delay = (i * 0.133) % 2;
            
            return (
              <div
                key={`firework-${i}`}
                className="absolute animate-firework"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                }}
              >
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                    style={{
                      transform: `rotate(${j * 45}deg) translateY(-20px)`,
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* 強化された光る粒子エフェクト */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => {
          // インデックスベースで固定値を生成（hydration安全）
          const left = (i * 17 + 23) % 100;
          const top = (i * 13 + 37) % 100;
          const delay = (i * 0.05) % 2;
          const duration = 1 + ((i * 0.03) % 2);
          
          return (
            <div
              key={`particle-${i}`}
              className={`absolute rounded-full animate-pulse ${
                animationPhase >= 1 ? 'opacity-100' : 'opacity-0'
              } ${i % 3 === 0 ? 'bg-yellow-400 w-2 h-2' : i % 3 === 1 ? 'bg-cyan-400 w-1 h-1' : 'bg-pink-400 w-3 h-3'}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* 中央のメインコンテンツ */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* フェーズ1: 事件解決のタイトル出現 */}
        <div
          className={`transition-all duration-1000 ${
            animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🕵️ 事件解決
          </h1>
          <div className="text-lg text-cyan-300">
            決定的証拠を発見
          </div>
        </div>

        {/* フェーズ2: 証拠品分析結果 */}
        <div
          className={`transition-all duration-1000 ${
            animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/30 mb-6 mt-8">
            <div className="flex items-center justify-center mb-4">
              <div className="text-2xl mr-3">🔬</div>
              <h2 className="text-xl font-semibold text-cyan-200">証拠品分析結果</h2>
            </div>
            <div className="text-center space-y-2 font-mono text-sm">
              <div className="text-green-400">✓ 容疑者の指紋：一致</div>
              <div className="text-green-400">✓ DNA鑑定：BCAA代謝異常を確認</div>
              <div className="text-green-400">✓ 化学分析：禁止薬物の痕跡発見</div>
            </div>
          </div>
        </div>

        {/* フェーズ3: 事件の真相 */}
        <div
          className={`transition-all duration-1000 ${
            animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-blue-900/40 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30 mb-8">
            <h3 className="text-lg font-semibold text-blue-200 mb-3 text-center">
              🔍 事件の真相
            </h3>
            <p className="text-blue-100 text-center leading-relaxed">
              研究室で発見されたBCAA化合物は、違法な人体実験の証拠でした。<br/>
              すべての謎が解け、真犯人の正体が明らかになりました。
            </p>
          </div>
        </div>

        {/* フェーズ4: 謎解き完了メッセージ */}
        {showEvidence && (
          <div className="animate-fadeInUp">
            <div className="bg-gradient-to-r from-green-800/60 to-blue-800/60 backdrop-blur-lg rounded-xl p-8 border-2 border-green-400/40">
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-200 mb-4">🕵️ 謎解き完了！</h3>
                <div className="bg-green-900/30 rounded-lg p-4 mb-6">
                  <h4 className="text-green-300 font-semibold mb-2">📋 事件簿</h4>
                  <div className="text-green-100 text-sm space-y-1">
                    <div>✓ 犯人：研究室の内部関係者</div>
                    <div>✓ 動機：違法な人体実験の隠蔽</div>
                    <div>✓ 証拠：BCAA化合物の不正使用</div>
                    <div>✓ 結果：事件解決、真相解明</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  探偵として見事にすべての謎を解き明かしました。<br/>
                  化学の力で真実を暴き、正義を実現しました。
                </p>

                <div className="bg-yellow-900/30 border-2 border-yellow-400/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="text-2xl mr-2">📝</div>
                    <h4 className="text-yellow-200 font-bold text-lg">最終ミッション</h4>
                  </div>
                  <p className="text-yellow-100 text-sm mb-3 leading-relaxed">
                    謎解きの証明として、GoogleFormに以下の言葉を入力してください：
                  </p>
                  <div className="bg-yellow-800/50 rounded-lg p-3 border border-yellow-400/30">
                    <code className="text-yellow-200 text-lg font-bold font-mono">
                      「真実はいつも一つ」
                    </code>
                  </div>
                  <p className="text-yellow-200/80 text-xs mt-2">
                    💡 この言葉が謎解き完了の証明となります
                  </p>
                </div>
                
                <button
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  🏠 最初に戻る
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 超派手な特殊エフェクト用CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scan-sweep {
          0% { 
            opacity: 0; 
            transform: translateX(-50%) rotate(0deg) scaleY(0); 
          }
          50% { 
            opacity: 1; 
            transform: translateX(-50%) rotate(0deg) scaleY(1);
            box-shadow: 0 0 20px cyan, 0 0 40px cyan;
          }
          100% { 
            opacity: 0; 
            transform: translateX(-50%) rotate(0deg) scaleY(0); 
          }
        }
        
        @keyframes molecular-orbit {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg) translateY(-60px); 
          }
          100% { 
            transform: translate(-50%, -50%) rotate(360deg) translateY(-60px); 
          }
        }
        
        @keyframes data-flow {
          0% { 
            transform: translateY(100vh); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
          }
          80% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-20px); 
            opacity: 0; 
          }
        }
        
        @keyframes explosion {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(0); 
          }
          50% { 
            opacity: 0.8; 
            transform: translate(-50%, -50%) scale(1.5); 
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(3) rotate(360deg); 
          }
        }
        
        @keyframes explosion-center {
          0% { 
            opacity: 0; 
            transform: scale(0); 
          }
          30% { 
            opacity: 1; 
            transform: scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: scale(4); 
          }
        }
        
        
        @keyframes firework {
          0% { 
            opacity: 1; 
            transform: scale(0); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: scale(2); 
          }
        }
        
        @keyframes rainbow-text {
          0% { color: #ff0000; text-shadow: 0 0 20px #ff0000; }
          16% { color: #ff8000; text-shadow: 0 0 20px #ff8000; }
          33% { color: #ffff00; text-shadow: 0 0 20px #ffff00; }
          50% { color: #00ff00; text-shadow: 0 0 20px #00ff00; }
          66% { color: #0080ff; text-shadow: 0 0 20px #0080ff; }
          83% { color: #8000ff; text-shadow: 0 0 20px #8000ff; }
          100% { color: #ff0000; text-shadow: 0 0 20px #ff0000; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-explosion {
          animation: explosion 1s ease-out forwards;
        }
        
        .animate-explosion-center {
          animation: explosion-center 1.5s ease-out forwards;
        }
        
        .animate-scan-sweep {
          animation: scan-sweep 2s ease-in-out infinite;
        }
        
        .animate-molecular-orbit {
          animation: molecular-orbit 3s linear infinite;
        }
        
        .animate-data-flow {
          animation: data-flow 4s ease-out infinite;
        }
        
        .animate-firework {
          animation: firework 2s ease-out infinite;
        }
        
        .animate-rainbow-text {
          animation: rainbow-text 2s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
