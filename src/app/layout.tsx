import type { Metadata } from 'next';
import './globals.scss';
import { gilroy } from '@/utils/fonts/customFonts';
import React from 'react';
import ReactQueryClientProvider from '@/providers/react-query-client-provider/ReactQueryClientProvider';
import LayoutWindow from '@/components/layout/LayoutWindow';

export const metadata: Metadata = {
    title: 'KS Tech',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={gilroy.className}>
                <ReactQueryClientProvider>
                    <LayoutWindow>{children}</LayoutWindow>
                </ReactQueryClientProvider>
            </body>
        </html>
    );
}
