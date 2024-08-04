import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { gilroy } from '@/utils/fonts/customFonts';
import React from 'react';
import ReactQueryClientProvider from '@/providers/react-query-client-provider/ReactQueryClientProvider';
import LayoutWindow from '@/components/layout/LayoutWindow';

export const metadata: Metadata = {
    title: 'KS Tech - Головна',
    description:
        "KS TECH пропонує металеві каркаси, модульні будинки, офіси, кав'ярні, приміщення для " +
        'охорони, буржуйки, котли, пічки, обладнання для сільського господарства, генератори ' +
        'та інші вироби з металу. Забезпечуємо швидке та надійне будівництво ' +
        'з використанням новітніх технологій.',
    keywords:
        'модульні будинки, KS TECH, екологічні будинки, безпечні будинки, ' +
        'довговічні будинки, швидке будівництво, металевий каркас, новітні технології, ' +
        "модульні офіси, модульні кав'ярні, приміщення для охорони, сторожовий пост, " +
        'автоматизоване виробництво, буржуйки, котли, пічки, мангал, обладнання для сільського господарства, ' +
        'генератори, вироби з металу.',
    openGraph: {
        title: 'KS TECH - Високоякісні модульні будинки, каркаси та вироби з металу ',
        description:
            'Ми пропонуємо модульні будинки, ' +
            "металеві каркаси, офіси, кав'ярні, охоронні " +
            'приміщення, буржуйки, котли, обладнання для сільського ' +
            'господарства та вироби з металу. Забезпечуємо швидке ' +
            'та надійне будівництво з новітніми технологіями.',
        url: 'https://kstech-frontend.vercel.app',
        siteName: 'KS Tech',
        images: [
            {
                url: 'https://kstech-frontend.vercel.app/preview.jpg',
                width: 640,
                height: 336,
                alt: 'KS Tech Image',
            },
        ],
        locale: 'ua_UA',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    id="facebook-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                       !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '426341290433714');
                        fbq('track', 'PageView');
                        `,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=426341290433714&ev=PageView&noscript=1"
                    />
                </noscript>
            </head>
            <body className={gilroy.className}>
                <ReactQueryClientProvider>
                    <LayoutWindow>{children}</LayoutWindow>
                </ReactQueryClientProvider>
            </body>
        </html>
    );
}
