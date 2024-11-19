import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/landing/Navbar";



export const metadata: Metadata = {
  title: "Mon Cleaning",
  description: "Dashboard pour mes services de nettoyage",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Navbar />
        {children}
      </body>


    </html>

    </ClerkProvider>

  );
}
