import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "To Do List",
  description: "To Do List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
