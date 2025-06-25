import './globals.css';
import { Montserrat } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import WhatsAppButton from '@/components/WhatsAppButton';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'ShopVix | Creative Web Development Agency',
  description: 'We craft exceptional digital experiences through innovative web development, design, and 3D interactions.',
  keywords: 'web development, web design, 3D interactions, digital agency, responsive websites',
  authors: [{ name: 'ShopVix' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={montserrat.className}>
        <Cursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton phoneNumber="+91 9329990175" />
      </body>
    </html>
  );
}
