import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Container, Theme } from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
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
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>
          <Theme accentColor="violet" appearance="light">
            <NavBar />
            <main className="px-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
