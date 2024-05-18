import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from '@radix-ui/themes';
import "./globals.css";
import { FilesUploadProvider } from "./contexts/filesUploaderContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Uploader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <FilesUploadProvider>
            {children}
          </FilesUploadProvider>
        </Theme>
      </body>
    </html>
  );
}
