import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/chatbot';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'NexMov.ai',
  description: 'Your AI-powered career co-pilot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", inter.variable)}>
      <head>
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        {children}
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
