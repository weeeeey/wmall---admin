import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ModalProvider from '@/providers/modal-provider';
import ToasterProvider from '@/providers/toast-provider';

import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Wmall - admin dashboard',
    description: 'This is a dashboard for wmall admin',
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    {/* provider를 통해 렌더링 될 때만 실행하는므로 서버 사이드에서 use client를 가져왔을 때 생긴느 하이드레이션 에러 막아줌  */}
                    <ToasterProvider />
                    <ModalProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
