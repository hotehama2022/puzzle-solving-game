'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// クロスワードのセル型定義
export type Cell = {
  value: string;
  isBlack: boolean;
  number?: number | string;
  isHighlighted?: boolean;
};

// クロスワードグリッドのサイズ
const GRID_ROWS = 4;
const GRID_COLS = 6;

export const useQ3 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
  const [currentDirection, setCurrentDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [inputValue, setInputValue] = useState('');
  const [abcAnswer, setAbcAnswer] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // クロスワードの初期データ
  const initializeGrid = () => {
    const newGrid: Cell[][] = Array(GRID_ROWS).fill(null).map(() =>
      Array(GRID_COLS).fill(null).map(() => ({ value: '', isBlack: false }))
    );

    // 黒いセルを設定（4×6グリッド用）
    const blackCells: number[][] = [
      [1, 0],
      [1, 1],
      [1, 3],
      [1, 5],
      [3, 0],
      [3, 1],
      [3, 3],
      [3, 5],
    ];

    blackCells.forEach(([row, col]) => {
      if (newGrid[row] && newGrid[row][col] && row < GRID_ROWS && col < GRID_COLS) {
        newGrid[row][col].isBlack = true;
      }
    });

    // 番号を設定
    // 1番: (0,0)
    newGrid[0][0].number = 1;

    // 2番: (0,2)
    newGrid[0][2].number = 2;

    // 3番: (0,4)
    newGrid[0][4].number = 3;

    // 4番: (2,0)
    newGrid[2][0].number = 4;

    // A番: (0,3)
    newGrid[0][3].number = 'A';

    // B番: (3,2)
    newGrid[3][2].number = 'B';

    // C番: (2,5)
    newGrid[2][5].number = 'C';

    setGrid(newGrid);
  };

  useEffect(() => {
    // Cookieをチェック
    const scienceCookie = Cookies.get('science');

    if (!scienceCookie || scienceCookie !== process.env.NEXT_PUBLIC_AUTH) {
      router.push('/');
      return;
    }

    setIsLoading(false);
    initializeGrid();
  }, [router]);

  // スクロール時の横表示制御
  useEffect(() => {
    const handleScroll = () => {
      const mainCrossword = document.querySelector('[data-main-crossword]');
      const stickyCrossword = document.getElementById('sticky-crossword');
      
      if (mainCrossword && stickyCrossword) {
        const rect = mainCrossword.getBoundingClientRect();
        const isMainVisible = rect.bottom > 100; // 100px のマージンを設ける
        
        if (isMainVisible) {
          stickyCrossword.style.opacity = '0';
        } else {
          stickyCrossword.style.opacity = '1';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期状態をチェック

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isBlack) return;

    let newDirection = currentDirection;
    
    // 同じセルをクリックした場合、方向を切り替え
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      setCurrentDirection(newDirection);
    } else {
      setSelectedCell({ row, col });
    }

    highlightWord(row, col, newDirection);
  };

  const highlightWord = (row: number, col: number, direction: 'horizontal' | 'vertical') => {
    const newGrid = grid.map(gridRow =>
      gridRow.map(cell => ({ ...cell, isHighlighted: false }))
    );

    if (direction === 'horizontal') {
      // 横方向のワードをハイライト - 単語の開始点を見つける
      let startCol = col;
      while (startCol > 0 && !newGrid[row][startCol - 1].isBlack) {
        startCol--;
      }
      
      // 開始点から終了点までハイライト
      for (let c = startCol; c < GRID_COLS && !newGrid[row][c].isBlack; c++) {
        newGrid[row][c].isHighlighted = true;
      }
    } else {
      // 縦方向のワードをハイライト - 単語の開始点を見つける
      let startRow = row;
      while (startRow > 0 && !newGrid[startRow - 1][col].isBlack) {
        startRow--;
      }
      
      // 開始点から終了点までハイライト
      for (let r = startRow; r < GRID_ROWS && !newGrid[r][col].isBlack; r++) {
        newGrid[r][col].isHighlighted = true;
      }
    }

    setGrid(newGrid);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const key = e.key;

    // ひらがなの場合はカタカナに変換
    let convertedKey = key;
    if (/^[\u3041-\u3096]$/.test(key)) {
      convertedKey = hiraganaToKatakana(key);
    }

    // カタカナの文字かどうかをチェック（より広い範囲で対応）
    if (/^[\u30A1-\u30FC]$/.test(convertedKey) || /^[ア-ヴー]$/.test(convertedKey)) {
      e.preventDefault();
      // カタカナ文字入力
      const newGrid = [...grid];
      newGrid[row][col].value = convertedKey;
      setGrid(newGrid);

      // 次のセルに移動
      moveToNextCell(row, col, currentDirection);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      // 最後から順番に削除
      deleteFromEnd(row, col, currentDirection);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // 矢印キーでの移動
      e.preventDefault();
      moveByArrow(e.key);
    }
  };

  const moveToNextCell = (row: number, col: number, direction: 'horizontal' | 'vertical') => {
    let nextRow = row;
    let nextCol = col;

    if (direction === 'horizontal') {
      nextCol = col + 1;
    } else {
      nextRow = row + 1;
    }

    if (nextRow < GRID_ROWS && nextCol < GRID_COLS && !grid[nextRow][nextCol].isBlack) {
      setSelectedCell({ row: nextRow, col: nextCol });
      highlightWord(nextRow, nextCol, direction);
    }
  };

  const moveByArrow = (key: string) => {
    if (!selectedCell) return;

    let { row, col } = selectedCell;

    switch (key) {
      case 'ArrowLeft':
        col = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        col = Math.min(GRID_COLS - 1, col + 1);
        break;
      case 'ArrowUp':
        row = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        row = Math.min(GRID_ROWS - 1, row + 1);
        break;
    }

    if (!grid[row][col].isBlack) {
      setSelectedCell({ row, col });
      highlightWord(row, col, currentDirection);
    }
  };

  // ひらがなをカタカナに変換する関数
  const hiraganaToKatakana = (str: string): string => {
    return str.replace(/[\u3041-\u3096]/g, (match) => {
      return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (selectedCell && value) {
      const lastChar = value.slice(-1);

      // ひらがなの場合はカタカナに変換
      let convertedChar = lastChar;
      if (/^[\u3041-\u3096]$/.test(lastChar)) {
        convertedChar = hiraganaToKatakana(lastChar);
      }

      // カタカナまたは変換されたカタカナの場合
      if (/^[\u30A1-\u30FC]$/.test(convertedChar)) {
        const { row, col } = selectedCell;
        const newGrid = [...grid];
        newGrid[row][col].value = convertedChar;
        setGrid(newGrid);

        // 次のセルに移動
        moveToNextCell(row, col, currentDirection);

        // 入力フィールドをクリア
        setInputValue('');
      }
    }
  };

  // 現在の方向の単語の範囲を取得
  const getWordRange = (row: number, col: number, direction: 'horizontal' | 'vertical') => {
    let startRow = row, startCol = col, endRow = row, endCol = col;
    
    if (direction === 'horizontal') {
      // 横方向の開始点を見つける
      while (startCol > 0 && !grid[row][startCol - 1].isBlack) {
        startCol--;
      }
      // 横方向の終了点を見つける
      while (endCol < GRID_COLS - 1 && !grid[row][endCol + 1].isBlack) {
        endCol++;
      }
    } else {
      // 縦方向の開始点を見つける
      while (startRow > 0 && !grid[startRow - 1][col].isBlack) {
        startRow--;
      }
      // 縦方向の終了点を見つける
      while (endRow < GRID_ROWS - 1 && !grid[endRow + 1][col].isBlack) {
        endRow++;
      }
    }
    
    return { startRow, startCol, endRow, endCol };
  };

  // 最後から順番に削除する処理
  const deleteFromEnd = (row: number, col: number, direction: 'horizontal' | 'vertical') => {
    const newGrid = [...grid];
    const { startRow, startCol, endRow, endCol } = getWordRange(row, col, direction);
    
    if (direction === 'horizontal') {
      // 横方向：右から左に削除
      for (let c = endCol; c >= startCol; c--) {
        if (newGrid[row][c].value) {
          newGrid[row][c].value = '';
          // 削除したセルに移動
          setSelectedCell({ row, col: c });
          highlightWord(row, c, direction);
          break;
        }
      }
    } else {
      // 縦方向：下から上に削除
      for (let r = endRow; r >= startRow; r--) {
        if (newGrid[r][col].value) {
          newGrid[r][col].value = '';
          // 削除したセルに移動
          setSelectedCell({ row: r, col });
          highlightWord(r, col, direction);
          break;
        }
      }
    }
    
    setGrid(newGrid);
  };

  // react-simple-keyboard用のハンドラー
  const handleKeyboardInput = (input: string) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    
    if (input === '{bksp}') {
      // 最後から順番に削除
      deleteFromEnd(row, col, currentDirection);
    } else if (/^[\u30A1-\u30FC]$/.test(input) || /^[ア-ヴー]$/.test(input)) {
      const newGrid = [...grid];
      newGrid[row][col].value = input;
      setGrid(newGrid);

      // 次のセルに移動
      moveToNextCell(row, col, currentDirection);
    }
  };


  // ABC入力用のハンドラー
  const handleAbcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // ひらがなをカタカナに変換
    let convertedValue = value;
    convertedValue = convertedValue.replace(/[\u3041-\u3096]/g, (match) => {
      return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
    
    setAbcAnswer(convertedValue);
  };

  // フォーム送信ハンドラー（q2と同じ仕様）
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError('');
    
    // 少し待機してボタンの非活性状態を見せる
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (abcAnswer === process.env.NEXT_PUBLIC_Q3_ANSWER) {
      // 正解の場合、Q3クッキーを作成してからQ4に遷移
      Cookies.set('Q3', process.env.NEXT_PUBLIC_SUCCESS || '', { expires: 7 });
      router.push('/q4/theme');
    } else {
      setValidationError('正解ではありません。A、B、Cの文字から導き出される答えをもう一度考えてみてください。');
      setIsSubmitting(false);
      setTimeout(() => {
        setValidationError('');
      }, 3000);
    }
  };

  return {
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
    handleKeyboardInput,
  };
};
