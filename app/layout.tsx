import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ConfigureAmplify from "./amplify-cognito-config";
import { ThemeProvider } from "next-themes";

const geist = GeistSans;

export const metadata: Metadata = {
  title: "AdLab - RAG App",
  description: "GPT + RAG + Google Ads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ConfigureAmplify />
            {children}
          </ThemeProvider>
        </>
      </body>
    </html>
  );
}
