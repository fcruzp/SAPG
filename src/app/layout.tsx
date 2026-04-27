import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAPG - Secretar\u00eda de Asuntos Profesionales y Gremiales | Fuerza del Pueblo",
  description:
    "Portal oficial de la Secretar\u00eda de Asuntos Profesionales y Gremiales del Partido Fuerza del Pueblo. Reg\u00edstrate como profesional y \u00fasmate a nuestra causa por el desarrollo de la Rep\u00fablica Dominicana.",
  keywords: [
    "Fuerza del Pueblo",
    "SAPG",
    "Asuntos Profesionales",
    "Republica Dominicana",
    "Santo Domingo",
    "registro profesionales",
    "Leonel Fernandez",
  ],
  authors: [{ name: "SAPG Fuerza del Pueblo" }],
  icons: {
    icon: "/images/logo-icon.png",
  },
  openGraph: {
    title: "SAPG - Secretar\u00eda de Asuntos Profesionales y Gremiales",
    description:
      "\u00dasmate a la Secretar\u00eda de Asuntos Profesionales y Gremiales de Fuerza del Pueblo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
