import type { Metadata, Viewport } from 'next';
import { Source_Serif_4, Atkinson_Hyperlegible_Next } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import DisclaimerModal from '@/components/DisclaimerModal';

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: '--font-atkinson',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'L.I.S.T. — Life in Simple Terms',
  description:
    'Clear, plain-English answers to your Australian government and life admin questions. No jargon, no tracking, no fuss.',
  robots: 'noindex, nofollow',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'L.I.S.T. — Life in Simple Terms',
    description:
      'Clear, plain-English answers to your Australian government and life admin questions. No jargon, no tracking, no fuss.',
    siteName: 'L.I.S.T.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A5C5E',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSerif.variable} ${atkinson.variable} antialiased`}>
        {/* <DisclaimerModal /> */}
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full max-w-[800px] mx-auto px-6 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
