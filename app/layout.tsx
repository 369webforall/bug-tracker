import '@radix-ui/themes/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import NavBar from './NavBar';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Theme } from '@radix-ui/themes';

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Issue tracker app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
