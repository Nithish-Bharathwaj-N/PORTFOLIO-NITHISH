import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';

import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Nithish Bharathwaj N | Cybersecurity & AI Engineer',
        template: '%s | Nithish Bharathwaj N',
    },
    description: 'Cybersecurity & AI Engineer based in Chennai, India. Specializing in security research, AI integration, and modern web application engineering.',
    keywords: ['cybersecurity', 'AI engineer', 'portfolio', 'security researcher', 'full stack', 'react', 'nextjs'],
    authors: [{ name: 'Nithish Bharathwaj N' }],
    creator: 'Nithish Bharathwaj N',
    metadataBase: new URL('https://nithishbharathwaj.dev'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://nithishbharathwaj.dev',
        title: 'Nithish Bharathwaj N | Cybersecurity & AI Engineer',
        description: 'Cybersecurity & AI Engineer based in Chennai, India.',
        siteName: 'Nithish Bharathwaj N Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nithish Bharathwaj N | Cybersecurity & AI Engineer',
        description: 'Cybersecurity & AI Engineer based in Chennai, India.',
        creator: '@nithish_cit',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/nithish_light.svg', media: '(prefers-color-scheme: light)' },
            { url: '/nithish_dark.svg', media: '(prefers-color-scheme: dark)' },
            { url: '/favicon.svg' },
        ],
        shortcut: ['/favicon.svg'],
        apple: ['/nithish_dark.svg'],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
};

import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ArcPreloaderWrapper } from '@/components/layout/ArcPreloaderWrapper';
import { ChatBot } from '@/components/layout/ChatBot';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`}>
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <SmoothScrollProvider>
                            <ThemeAwareClickSpark>
                                <ArcPreloaderWrapper>
                                    <ConditionalNavigation>
                                        {children}
                                    </ConditionalNavigation>
                                </ArcPreloaderWrapper>
                                <ChatBot headless />
                            </ThemeAwareClickSpark>
                        </SmoothScrollProvider>
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
