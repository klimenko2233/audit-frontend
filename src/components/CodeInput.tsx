'use client';

import { useState } from 'react';

interface CodeInputProps {
    onAnalyze: (code: string) => void;
    onAnalyzeDeFi?: (code: string) => void;
    isLoading: boolean;
}

const DEFAULT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Пример уязвимого DeFi контракта
contract VulnerableDeFi {
    address public owner;
    mapping(address => uint256) public balances;
    
    constructor() {
        owner = msg.sender;
    }
    
    // Уязвимость 1: tx.origin
    function withdraw(uint256 amount) public {
        require(tx.origin == owner, "Not owner");
        payable(msg.sender).transfer(amount);
    }
    
    // Уязвимость 2: reentrancy
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function unsafeWithdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");
        
        // Опасный external call с ETH
        (bool success, ) = msg.sender.call{value: amount}("");
        balances[msg.sender] = 0;
    }
    
    // Уязвимость 3: непроверенный вызов
    function callExternal(address _addr) public {
        (bool success, ) = _addr.call("");
        // Нет проверки success!
    }
    
    // DeFi функциональность
    function simulateFlashLoan() public pure returns (string memory) {
        return "Flash loan executed without protection";
    }
    
    function getOraclePrice() public pure returns (uint256) {
        return 1500; // Mock oracle без circuit breaker
    }
    
    // Уязвимость 4: публичная функция которая должна быть internal
    function internalLogic() public {
        // Должна быть internal
    }
}`;

export default function CodeInput({ onAnalyze, onAnalyzeDeFi, isLoading }: CodeInputProps) {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [analyzeDeFi, setAnalyzeDeFi] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim().length < 10) {
            alert('Код слишком короткий. Введите минимум 10 символов.');
            return;
        }

        if (analyzeDeFi && onAnalyzeDeFi) {
            onAnalyzeDeFi(code);
        } else {
            onAnalyze(code);
        }
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

            {onAnalyzeDeFi && (
                <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <input
                        type="checkbox"
                        id="defi-check"
                        checked={analyzeDeFi}
                        onChange={(e) => setAnalyzeDeFi(e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <label htmlFor="defi-check" className="ml-3 text-sm text-gray-700">
                        <span className="font-medium">DeFi-специфичный анализ</span>
                        <p className="text-gray-600 mt-1">
                            Проверить на специфичные для DeFi уязвимости: flash loans, oracle манипуляции,
                            MEV риски, bridge атаки, governance захваты и другие.
                        </p>
                    </label>
                </div>
            )}

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-1"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
                            {analyzeDeFi ? 'DeFi анализ...' : 'Анализ...'}
            </span>
                    ) : analyzeDeFi ? (
                        <span className="flex items-center justify-center">
              🔬 DeFi аудит
            </span>
                    ) : (
                        <span className="flex items-center justify-center">
              🔍 Начать аудит
            </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setCode(DEFAULT_CODE);
                        setAnalyzeDeFi(false);
                    }}
                    disabled={isLoading}
                    className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    Сбросить
                </button>
            </div>
        </form>
    );
}