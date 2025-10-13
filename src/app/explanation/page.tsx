'use client';

import { useExplanation } from '@/hooks/useExplanation';

export default function ExplanationPage() {
  const { navigateToFinish, navigateToHome } = useExplanation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 relative overflow-hidden">
      {/* 背景の化学要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl animate-float">🧪</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce">⚗️</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float">🔬</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bounce">⚛️</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-700">🧬</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-float delay-1000">💻</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6 animate-bounce">📚</div>
          <h1 className="text-5xl font-bold text-white mb-4">問題解説</h1>
          <p className="text-blue-200 text-xl">各問題の詳細な解説</p>
        </div>

        {/* パスワード収集問題解説 */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-8 border border-orange-400/30 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔑</div>
            <h2 className="text-3xl font-bold text-white mb-2">パスワード収集問題</h2>
            <p className="text-orange-200 text-lg">Q1に進むために必要な4つの鍵を収集する SQL問題</p>
          </div>

          {/* SQL問題のデモンストレーション */}
          <div className="bg-orange-900/40 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-orange-300 mb-4 text-center">📋 4つのSQL問題</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問題1】WHERE句とORDER BY句の基本</h4>
                <div className="text-yellow-200 text-xs mb-2 p-2 bg-slate-700/50 rounded">
                  <strong>問題：</strong>&apos;Sales&apos;部署の従業員名を給与昇順で取得
                </div>
                <div className="text-green-300 text-sm">✅ 正解：3番</div>
                <div className="text-orange-200 text-xs mt-1">WHERE + ORDER BY salary ASC</div>
                <div className="text-blue-100 text-xs mt-2 space-y-1">
                  <div><strong>学習ポイント：</strong>WHERE句による条件絞り込みとORDER BY句によるソート処理</div>
                  <div><strong>間違いやすい点：</strong>ORDER BY name（名前順）とORDER BY salary（給与順）の違い</div>
                  <div><strong>実行結果：</strong>Tanaka(300000) → Yamada(350000)の順で取得</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問題2】GROUP BY句と集約関数</h4>
                <div className="text-yellow-200 text-xs mb-2 p-2 bg-slate-700/50 rounded">
                  <strong>問題：</strong>顧客ごとの合計購入額を求める
                </div>
                <div className="text-green-300 text-sm">✅ 正解：4番</div>
                <div className="text-orange-200 text-xs mt-1">GROUP BY + SUM(amount)</div>
                <div className="text-blue-100 text-xs mt-2 space-y-1">
                  <div><strong>学習ポイント：</strong>GROUP BY句によるグループ化とSUM()集約関数の組み合わせ</div>
                  <div><strong>間違いやすい点：</strong>COUNT（件数）とSUM（合計）の違い、GROUP BYの必要性</div>
                  <div><strong>実行結果：</strong>C001=2500円、C002=2000円、C003=3000円</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問題3】テーブル結合（JOIN）</h4>
                <div className="text-yellow-200 text-xs mb-2 p-2 bg-slate-700/50 rounded">
                  <strong>問題：</strong>各学生の名前とコース名を取得
                </div>
                <div className="text-green-300 text-sm">✅ 正解：2番</div>
                <div className="text-orange-200 text-xs mt-1">JOIN ON course_id = id</div>
                <div className="text-blue-100 text-xs mt-2 space-y-1">
                  <div><strong>学習ポイント：</strong>INNER JOINによる内部結合と外部キーの正しい指定方法</div>
                  <div><strong>間違いやすい点：</strong>結合条件でs.id = c.idとs.course_id = c.idの違い</div>
                  <div><strong>実行結果：</strong>Aki-Math、Hiro-English、Miki-Math</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問題4】サブクエリと集約関数</h4>
                <div className="text-yellow-200 text-xs mb-2 p-2 bg-slate-700/50 rounded">
                  <strong>問題：</strong>平均給与以上の従業員名を取得
                </div>
                <div className="text-green-300 text-sm">✅ 正解：4番</div>
                <div className="text-orange-200 text-xs mt-1">サブクエリ + AVG(salary)</div>
                <div className="text-blue-100 text-xs mt-2 space-y-1">
                  <div><strong>学習ポイント：</strong>サブクエリによる動的な条件値の計算と比較処理</div>
                  <div><strong>間違いやすい点：</strong>WHERE句でのAVG()直接使用とサブクエリ使用の違い</div>
                  <div><strong>実行結果：</strong>平均給与332500円以上のSuzuki、Yamada</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-yellow-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-300 mb-4">🔍 パスワード収集の流れ</h3>
              <div className="space-y-4 text-yellow-100 text-sm">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-semibold mb-2">📍 第1段階：SQL基礎問題の解答</h4>
                  <div className="space-y-1 ml-2">
                    <div><strong>1. 問題1解答：</strong> WHERE句とORDER BY句の組み合わせ（正解：3番）</div>
                    <div><strong>2. 問題2解答：</strong> GROUP BY句と集約関数SUM（正解：4番）</div>
                    <div><strong>3. 問題3解答：</strong> 内部結合JOINの外部キー指定（正解：2番）</div>
                    <div><strong>4. 問題4解答：</strong> サブクエリと平均値比較（正解：4番）</div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-semibold mb-2">🔑 第2段階：パスワード生成</h4>
                  <div className="space-y-1 ml-2">
                    <div><strong>5. 正解番号収集：</strong> 各問題の正解番号を順番に記録</div>
                    <div><strong>6. パスワード形成：</strong> 3-4-2-4 の順序で4桁パスワードを生成</div>
                    <div><strong>7. ログイン実行：</strong> 生成されたパスワードで研究室PCにアクセス</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Q1 解説 */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-8 border border-blue-400/30 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🎨</div>
            <h2 className="text-3xl font-bold text-white mb-2">Q1: 薬品の調合実験</h2>
          </div>

          {/* 色の混合デモンストレーション */}
          <div className="bg-blue-900/40 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 text-center">🧪 色の混合実験</h3>
            
            {/* 基本色 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-2 shadow-lg border-2 border-white/20"></div>
                <p className="text-red-300 font-semibold">赤色薬品A</p>
                <p className="text-red-200 text-sm">Red</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-2 shadow-lg border-2 border-white/20"></div>
                <p className="text-yellow-300 font-semibold">黄色薬品B</p>
                <p className="text-yellow-200 text-sm">Yellow</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-2 shadow-lg border-2 border-white/20"></div>
                <p className="text-blue-300 font-semibold">青色薬品C</p>
                <p className="text-blue-200 text-sm">Blue</p>
              </div>
            </div>

            {/* 混合結果 */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-4 text-center">混合結果</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 赤 + 黄 = オレンジ */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <span className="mx-2 text-white">+</span>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                    <span className="mx-2 text-white">=</span>
                    <div className="w-12 h-12 bg-orange-500 rounded-full border-2 border-white/30"></div>
                  </div>
                  <p className="text-orange-300 text-sm">オレンジ</p>
                </div>

                {/* 青 + 黄 = 緑 (正解) */}
                <div className="text-center bg-green-900/30 rounded-lg p-3 border-2 border-green-400/50">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    <span className="mx-2 text-white">+</span>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                    <span className="mx-2 text-white">=</span>
                    <div className="w-12 h-12 bg-green-500 rounded-full border-2 border-green-300 animate-pulse"></div>
                  </div>
                  <p className="text-green-300 font-bold text-sm">緑色 ✅</p>
                  <p className="text-green-200 text-xs">正解！</p>
                </div>

                {/* 赤 + 青 = 紫 */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <span className="mx-2 text-white">+</span>
                    <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    <span className="mx-2 text-white">=</span>
                    <div className="w-12 h-12 bg-purple-600 rounded-full border-2 border-white/30"></div>
                  </div>
                  <p className="text-purple-300 text-sm">紫色</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-green-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">✅ 正解：青色薬品C + 黄色薬品B = 緑色調合薬</h3>
              <p className="text-green-100">
                青色薬品Cと黄色薬品Bを混合することで緑色の調合薬が生成され、
                ブラウザのCookieに「Q1: chemical」という重要な手がかりが自動保存されます。
              </p>
            </div>

            <div className="bg-yellow-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-300 mb-4">🔍 手がかりの発見方法</h3>
              <p className="text-yellow-100">
                緑色調合薬を作成すると「🍪を見ろ」というヒントが表示されます。
                開発者ツール（F12）のCookiesで「Q1: chemical」を発見し、「chemical」を答えとして入力します。
              </p>
            </div>
          </div>
        </div>

        {/* Q2 解説 */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-8 border border-green-400/30 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">⚛️</div>
            <h2 className="text-3xl font-bold text-white mb-2">Q2: 実験ノート</h2>
          </div>

          {/* 化学式パズルのデモンストレーション */}
          <div className="bg-purple-900/40 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">🧪 化学式パズル</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-lg p-3 border border-blue-400/30">
                <div className="text-center">
                  <div className="text-blue-200 text-lg font-mono mb-2">19 + 8 =</div>
                  <div className="text-yellow-300 font-bold text-xl">コ</div>
                  <div className="text-blue-100 text-xs mt-1">K + O</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-lg p-3 border border-blue-400/30">
                <div className="text-center">
                  <div className="text-blue-200 text-lg font-mono mb-2">7 =</div>
                  <div className="text-yellow-300 font-bold text-xl">ン</div>
                  <div className="text-blue-100 text-xs mt-1">N</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/15 to-green-600/15 rounded-lg p-3 border border-green-400/30">
                <div className="text-center">
                  <div className="text-green-200 text-lg font-mono mb-2">16 + 8 =</div>
                  <div className="text-yellow-300 font-bold text-xl">ソ</div>
                  <div className="text-green-100 text-xs mt-1">S + O</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/15 to-green-600/15 rounded-lg p-3 border border-green-400/30">
                <div className="text-center">
                  <div className="text-green-200 text-lg font-mono mb-2">44 =</div>
                  <div className="text-yellow-300 font-bold text-xl">ル</div>
                  <div className="text-green-100 text-xs mt-1">Ru</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-4 text-center">解答プロセス</h4>
              <div className="text-center">
                <div className="text-yellow-300 text-2xl font-bold mb-2">
                  コ + ン + ソ + ル = コンソール
                </div>
                <div className="text-purple-200 text-lg">
                  「コンソールを確認せよ」
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-green-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">✅ 正解：「コンソールを確認せよ」</h3>
              <p className="text-green-100">
                原子番号を元素記号に変換し、元素記号を日本語の音に対応させるパズル。
                19(K) + 8(O) = コ、7(N) = ン、16(S) + 8(O) = ソ、44(Ru) = ル で「コンソール」が完成。
              </p>
            </div>

            <div className="bg-yellow-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-300 mb-4">🔍 隠されたヒント発見方法</h3>
              <p className="text-yellow-100">
                「コンソールを確認せよ」の指示通り、ブラウザの開発者ツール（F12）のConsoleタブを確認すると、
                Q2の答えがコンソールに出力されています。この答えを入力して次の問題に進みます。
              </p>
            </div>
          </div>
        </div>

        {/* Q3 解説 */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-8 border border-purple-400/30 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔬</div>
            <h2 className="text-3xl font-bold text-white mb-2">Q3: 分子構造解析パズル</h2>
          </div>

          {/* クロスワードパズルのデモンストレーション */}
          <div className="bg-purple-900/40 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">🧩 クロスワードパズル</h3>
            
            {/* 簡略化されたグリッド表示 */}
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-6 gap-1 bg-gray-800 p-4 rounded-lg">
                {/* 1行目 */}
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">1</span>
                  ゼ
                </div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">ロ</div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">2</span>
                  ト
                </div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">A</span>
                  ラ
                </div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">3</span>
                  ス
                </div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">ト</div>
                
                {/* 2行目 */}
                <div className="w-8 h-8 bg-gray-900"></div>
                <div className="w-8 h-8 bg-gray-900"></div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">｜</div>
                <div className="w-8 h-8 bg-gray-900"></div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">イ</div>
                <div className="w-8 h-8 bg-gray-900"></div>
                
                {/* 3行目 */}
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">4</span>
                  バ
                </div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">ッ</div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">ク</div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">ア</div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">ッ</div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">C</span>
                  プ
                </div>
                
                {/* 4行目 */}
                <div className="w-8 h-8 bg-gray-900"></div>
                <div className="w-8 h-8 bg-gray-900"></div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold relative">
                  <span className="absolute top-0 left-0 text-xs text-gray-600">B</span>
                  ン
                </div>
                <div className="w-8 h-8 bg-gray-900"></div>
                <div className="w-8 h-8 bg-white border border-gray-600 flex items-center justify-center text-xs font-bold">チ</div>
                <div className="w-8 h-8 bg-gray-900"></div>
              </div>
            </div>

            {/* ヒント */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">横のかぎ</h4>
                <div className="text-purple-200 text-sm space-y-1">
                  <div><strong>1.</strong> 信頼を前提としないセキュリティモデル（6文字）</div>
                  <div><strong>4.</strong> データの複製や保存（6文字）</div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">縦のかぎ</h4>
                <div className="text-purple-200 text-sm space-y-1">
                  <div><strong>2.</strong> 認証や認可に使用される文字列（4文字）</div>
                  <div><strong>3.</strong> MACアドレスでパケット転送する装置（4文字）</div>
                </div>
              </div>
            </div>

            {/* ABC解答 */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-4 text-center">ABC解答プロセス</h4>
              <div className="text-center">
                <div className="text-yellow-300 text-xl font-bold mb-2">
                  A = ラ、B = ン、C = プ
                </div>
                <div className="text-purple-200 text-lg">
                  A + B + C = 「ランプ」
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-green-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">✅ 正解：「ランプ」</h3>
              <div className="space-y-2 text-green-100 text-sm">
                <div><strong>1. ゼロトラスト：</strong> 信頼を前提としないセキュリティモデル</div>
                <div><strong>2. トークン：</strong> 認証や認可に使用される文字列</div>
                <div><strong>3. スイッチ：</strong> MACアドレスを元にパケットを転送する装置</div>
                <div><strong>4. バックアップ：</strong> データの複製や保存</div>
              </div>
            </div>

            <div className="bg-yellow-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-300 mb-4">🔍 解答方法</h3>
              <p className="text-yellow-100">
                クロスワードパズルを完成させた後、A・B・Cの位置にある文字（ラ・ン・プ）を組み合わせて
                「ランプ」という答えを導き出します。セキュリティ用語の知識とパズル解法が必要な問題です。
              </p>
            </div>
          </div>
        </div>

        {/* Q4-Q5 解説 */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/30 mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🧬</div>
            <h2 className="text-3xl font-bold text-white mb-2">Q4: BCAA化学実験とデータ解析</h2>
          </div>

          {/* プログラム解析問題のデモンストレーション */}
          <div className="bg-purple-900/40 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">💻 発見されたプログラム</h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4 font-mono text-sm">
              <div className="text-gray-300">
                <div className="text-green-400">手続き ProcessArray(A: 配列[1..n] の整数)</div>
                <div className="ml-2 text-blue-300">変数 i, b, c, x: 整数</div>
                <div className="ml-2 text-yellow-300">b ← 0</div>
                <div className="ml-2 text-yellow-300">c ← A[1]</div>
                <div className="ml-2 text-yellow-300">i ← 1</div>
                <div className="ml-2 text-orange-300">繰り返し (i ≦ n)</div>
                <div className="ml-4 text-white">b ← b + A[i]</div>
                <div className="ml-4 text-white">もし A[i] &gt; c ならば c ← A[i]</div>
                <div className="ml-4 text-white">i ← i + 1</div>
                <div className="ml-2 text-orange-300">繰り返し終了</div>
                <div className="ml-2 text-pink-300">x ← b div n</div>
                <div className="ml-2 text-cyan-300">出力 b, x, c</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問1】ProcessArrayの処理内容を問う問題</h4>
                <div className="text-yellow-200 text-xs mb-3 p-2 bg-slate-700/50 rounded">
                  <strong>問題文：</strong>手続き ProcessArray が行っている処理として最も適切なものはどれか。
                </div>
                <div className="text-gray-300 text-xs mb-2 space-y-1">
                  <div>A. 配列の要素を昇順に並び替える</div>
                  <div>B. 配列の要素の合計、平均、最大値を求める</div>
                  <div>C. 配列の要素をすべて 2 倍にする</div>
                  <div>D. 配列の要素のうち偶数だけを抽出する</div>
                </div>
                <div className="text-green-300 text-sm mb-3">✅ B. 配列の要素の合計、平均、最大値を求める</div>
                <div className="text-blue-100 text-xs space-y-1 ml-4">
                  <div><strong>詳細解説：</strong></div>
                  <div>• 変数b：配列要素の合計を格納（b ← b + A[i]）</div>
                  <div>• 変数x：平均値を格納（x ← b div n、整数除算）</div>
                  <div>• 変数c：最大値を格納（A[i] &gt; c なら更新）</div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問2】具体的配列での実行結果を問う問題</h4>
                <div className="text-yellow-200 text-xs mb-3 p-2 bg-slate-700/50 rounded">
                  <strong>問題文：</strong>配列 A = [3, 7, 2, 9, 5] の場合、ProcessArray(A) の出力はどれか。
                </div>
                <div className="text-gray-300 text-xs mb-2 space-y-1">
                  <div>A. 24, 4, 7</div>
                  <div>B. 24, 4, 9</div>
                  <div>C. 26, 5, 9</div>
                  <div>D. 26, 5, 7</div>
                </div>
                <div className="text-green-300 text-sm mb-3">✅ C. 26, 5, 9</div>
                <div className="text-blue-100 text-xs space-y-1 ml-4">
                  <div><strong>計算過程：</strong></div>
                  <div>• 合計：3 + 7 + 2 + 9 + 5 = 26</div>
                  <div>• 平均：26 ÷ 5 = 5（整数除算なので小数点切り捨て）</div>
                  <div>• 最大値：max(3, 7, 2, 9, 5) = 9</div>
                  <div>• 出力順序：b, x, c = 26, 5, 9</div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問3】平均計算の精度向上を問う問題</h4>
                <div className="text-yellow-200 text-xs mb-3 p-2 bg-slate-700/50 rounded">
                  <strong>問題文：</strong>プログラム中の x ← b div n は整数の割り算をしている。小数点以下も含めた平均を求めたい場合、適切な修正はどれか。
                </div>
                <div className="text-gray-300 text-xs mb-2 space-y-1">
                  <div>A. x ← b / n にする</div>
                  <div>B. x ← b mod n にする</div>
                  <div>C. x ← n / b にする</div>
                  <div>D. x ← b × n にする</div>
                </div>
                <div className="text-green-300 text-sm mb-3">✅ A. x ← b / n にする</div>
                <div className="text-blue-100 text-xs space-y-1 ml-4">
                  <div><strong>除算の違い：</strong></div>
                  <div>• div：整数除算（26 div 5 = 5、余り1は切り捨て）</div>
                  <div>• /：実数除算（26 / 5 = 5.2、小数点以下も保持）</div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">【問4】最大値から最小値への機能変更を問う問題</h4>
                <div className="text-yellow-200 text-xs mb-3 p-2 bg-slate-700/50 rounded">
                  <strong>問題文：</strong>配列の最大値ではなく最小値を求めたい場合、適切な修正はどれか。
                </div>
                <div className="text-gray-300 text-xs mb-2 space-y-1">
                  <div>A. A[i] &gt; c の比較を &lt; に変える</div>
                  <div>B. b ← 0 を削除する</div>
                  <div>C. div を mod に変える</div>
                  <div>D. 配列を逆順に並べ替える</div>
                </div>
                <div className="text-green-300 text-sm mb-3">✅ A. A[i] &gt; c の比較を &lt; に変える</div>
                <div className="text-blue-100 text-xs space-y-1 ml-4">
                  <div><strong>比較演算子の変更：</strong></div>
                  <div>• 最大値：A[i] &gt; c ならば c ← A[i]（より大きい値で更新）</div>
                  <div>• 最小値：A[i] &lt; c ならば c ← A[i]（より小さい値で更新）</div>
                  <div>• 初期値：c ← A[1]（最初の要素で初期化）</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-yellow-900/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-300 mb-4">🔍 謎解きの流れ</h3>
              <div className="space-y-4 text-yellow-100 text-sm">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-yellow-200 font-semibold mb-2">📍 第1段階：ログイン画面の背景を変更</h4>
                    <div className="space-y-1 ml-2">
                      <div><strong>1. Q1画面で背景をオレンジに変更：</strong> 赤色薬品A + 黄色薬品Bを選択してオレンジ背景にする</div>
                      <div><strong>2. ログアウト実行：</strong> オレンジ背景の状態でログアウトボタンをクリック</div>
                      <div><strong>3. 新たなヒント出現：</strong> ログイン画面に戻ると新しいヒントメッセージが表示される</div>
                    </div>
                  </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-semibold mb-2">🔍 第2段階：GitHubでの手がかり発見</h4>
                  <div className="space-y-1 ml-2">
                    <div><strong>4. README.md確認：</strong> GitHubの`src/app/q5/theme/README.md`を確認</div>
                    <div><strong>5. プログラム発見：</strong> 失踪した研究員が残したデータ解析プログラムを発見</div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-semibold mb-2">💻 第3段階：プログラム解析問題</h4>
                  <div className="space-y-1 ml-2">
                    <div><strong>6. 4つの選択問題：</strong> ProcessArray関数の動作理解と応用問題</div>
                    <div><strong>7. 回答入力：</strong> ログイン画面で回答を入力</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pb-8">
          <button
            onClick={navigateToFinish}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 cursor-pointer"
          >
            🏁 完了画面に戻る
          </button>
          <button
            onClick={navigateToHome}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 cursor-pointer"
          >
            🏠 最初に戻る
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
