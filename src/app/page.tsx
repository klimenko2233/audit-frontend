'use client';

import { useState } from 'react';
import CodeInput from '@/components/CodeInput';
import ResultsDisplay from '@/components/ResultsDisplay';
import { AuditResult } from '@/lib/types';
import {auditService} from '@/api/client';

export default function Home() {
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisType, setAnalysisType] = useState<'basic' | 'defi'>('basic');

    const handleAnalyze = async (code: string) => {
        setIsLoading(true);
        setError(null);
        setAnalysisType('basic');

        try {
            const data = await auditService.auditCode(code);
            setResult(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
            setError(errorMessage);
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyzeDeFi = async (code: string) => {
        setIsLoading(true);
        setError(null);
        setAnalysisType('defi');

        try {
            const data = await auditService.auditDeFiCode(code);
            setResult(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
            setError(errorMessage);
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        🔍 Solidity Contract Auditor
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Профессиональный инструмент для анализа безопасности смарт-контрактов с поддержкой DeFi-специфичных проверок
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${analysisType === 'basic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            Базовый анализ
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${analysisType === 'defi' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                            DeFi анализ
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">📝 Введите код контракта</h2>
                            <CodeInput
                                onAnalyze={handleAnalyze}
                                onAnalyzeDeFi={handleAnalyzeDeFi}
                                isLoading={isLoading}
                            />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">ℹ️ Как это работает</h3>
                            <ul className="space-y-2 text-blue-700">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong>Базовый анализ:</strong> проверка на reentrancy, tx.origin, integer overflow и другие базовые уязвимости</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong>DeFi анализ:</strong> дополнительные проверки для DeFi контрактов: flash loans, oracles, MEV, bridge риски</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Используется профессиональный анализатор Slither от Trail of Bits</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                            <h2 className="text-xl font-semibold mb-6">📊 Результаты аудита</h2>
                            <ResultsDisplay result={result} error={error} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}