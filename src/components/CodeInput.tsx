'use client';

import { useState } from 'react';

interface CodeInputProps {
    onAnalyze: (code: string) => void;
    isLoading: boolean;
}

const DEFAULT_CODE = `// Вставьте сюда код Solidity контракта

pragma solidity ^0.8.0;

contract Example {
    function vulnerable() public {
        // Пример уязвимости: tx.origin
        require(tx.origin == msg.sender);
        
        // Пример: арифметика без SafeMath
        uint256 a = 100;
        uint256 b = 200;
        uint256 c = a + b;
    }
}`;

export default function CodeInput({ onAnalyze, isLoading }: CodeInputProps) {
    const [code, setCode] = useState(DEFAULT_CODE);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim().length < 10) {
            alert('Код слишком короткий. Введите минимум 10 символов.');
            return;
        }
        onAnalyze(code);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Код Solidity контракта
                </label>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Вставьте код Solidity контракта..."
                    disabled={isLoading}
                />
                <p className="mt-1 text-sm text-gray-500">
                    Минимум 10 символов. Поддерживается подсветка синтаксиса.
                </p>
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Анализ...
            </span>
                    ) : (
                        '🔍 Начать аудит'
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setCode(DEFAULT_CODE)}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    Сбросить
                </button>
            </div>
        </form>
    );
}