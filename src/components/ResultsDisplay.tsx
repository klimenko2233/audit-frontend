'use client';

import { AuditResult } from '@/lib/types';

interface ResultsDisplayProps {
    result: AuditResult | null;
    error: string | null;
}

const severityColors = {
    CRITICAL: 'bg-red-100 text-red-800 border-red-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    LOW: 'bg-blue-100 text-blue-800 border-blue-200',
};

const severityLabels = {
    CRITICAL: 'Критическая',
    HIGH: 'Высокая',
    MEDIUM: 'Средняя',
    LOW: 'Низкая',
};

export default function ResultsDisplay({ result, error }: ResultsDisplayProps) {
    if (error) {
        return (
            <div className="border border-red-300 bg-red-50 rounded-lg p-6">
                <div className="flex items-center text-red-800">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold">Ошибка</h3>
                </div>
                <p className="mt-2 text-red-700">{error}</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="border border-gray-200 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-lg font-medium text-gray-900">Результаты аудита</h3>
                <p className="text-gray-600 mt-2">
                    Загрузите код контракта и нажмите "Начать аудит"
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">📊 Сводка аудита</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded p-4 text-center">
                        <div className="text-2xl font-bold">{result.summary.total}</div>
                        <div className="text-sm text-gray-600">Всего</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
                        <div className="text-2xl font-bold text-red-700">{result.summary.critical}</div>
                        <div className="text-sm text-red-600">Критичных</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded p-4 text-center">
                        <div className="text-2xl font-bold text-orange-700">{result.summary.high}</div>
                        <div className="text-sm text-orange-600">Высоких</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-700">{result.summary.medium}</div>
                        <div className="text-sm text-yellow-600">Средних</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">{result.summary.low}</div>
                        <div className="text-sm text-blue-600">Низких</div>
                    </div>
                </div>
            </div>

            {result.vulnerabilities.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">🔍 Найденные уязвимости</h3>
                    {result.vulnerabilities.map((vuln, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg p-4 ${severityColors[vuln.severity]}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className="font-semibold mr-3">{vuln.type}</span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${severityColors[vuln.severity]}`}>
                      {severityLabels[vuln.severity]}
                    </span>
                                    </div>
                                    <p className="text-sm mb-2">{vuln.description}</p>
                                    <p className="text-sm">
                                        <span className="font-medium">Рекомендация:</span> {vuln.recommendation}
                                    </p>
                                </div>
                                <div className="ml-4 text-right">
                                    <div className="text-sm font-medium text-gray-700">Строка</div>
                                    <div className="text-lg font-bold">{vuln.line}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border border-green-200 bg-green-50 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-green-800">Уязвимостей не найдено!</h3>
                    <p className="text-green-700 mt-2">Контракт выглядит безопасным.</p>
                </div>
            )}
        </div>
    );
}