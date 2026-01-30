'use client';

import {useState} from 'react';
import CodeInput from '@/components/CodeInput';
import ResultsDisplay from '@/components/ResultsDisplay';
import {AuditResult} from '@/lib/types';
import {auditService} from '@/api/client';

export default function Home() {
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async (code: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await auditService.auditCode(code);
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'Произошла неизвестная ошибка');
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Заголовок */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        🔍 Solidity Contract Auditor
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Бесплатный инструмент для анализа безопасности смарт-контрактов на Solidity
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">📝 Введите код контракта</h2>
                            <CodeInput onAnalyze={handleAnalyze} isLoading={isLoading}/>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">ℹ️ Как это работает</h3>
                            <ul className="space-y-2 text-blue-700">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Вставьте код Solidity контракта в поле выше</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Система проверит код на основные уязвимости безопасности</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Получите подробный отчёт с рекомендациями по исправлению</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                            <h2 className="text-xl font-semibold mb-6">📊 Результаты аудита</h2>
                            <ResultsDisplay result={result} error={error}/>
                        </div>
                    </div>
                </div>

                <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p>
                       Это базовый инструмент для обучения.
                    </p>
                    <p className="mt-2">
                        Разработано для сообщества блокчейн-разработчиков
                    </p>
                </footer>
            </div>
        </div>
    );
}