import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from '@clerk/localizations'




export const metadata: Metadata = {
  title: "Nouni Cleaning",
  description: "Nouni Cleaning for all your cleaning needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    localization={frFR}>

    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>


    </html>

    </ClerkProvider>

  );
}
