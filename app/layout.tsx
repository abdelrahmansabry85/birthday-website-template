import React from "react";
import "./globals.css";

export interface Metadata {
  title?: string;
  description?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
  };
}

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
  description: "A little surprise made with love.",
  openGraph: {
    title: "Happy Birthday! 🎂",
    description: "A little surprise made with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08080a] text-[#f4f2ee] selection:bg-[#c99450]/30 selection:text-[#faf7f2] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
