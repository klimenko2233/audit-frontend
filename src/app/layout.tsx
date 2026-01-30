import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin', 'cyrillic']});

export const metadata: Metadata = {
    title: 'Solidity Contract Auditor',
    description: 'Бесплатный инструмент для анализа безопасности смарт-контрактов'
};

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}