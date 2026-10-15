import type { Metadata } from "next";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-600.css";
import "@fontsource/roboto/latin-700.css";
import "./globals.css";
import { PuppyProvider } from "@/components/puppy-provider";
import { AppShell } from "@/components/puppy-app";

export const metadata: Metadata = {
  title: "Puppy · Su pequeño universo de cuidados",
  description:
    "Rutinas, recordatorios y mucho cariño. Una demostración de identidad corporativa Puppy con Material Design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <PuppyProvider>
          <AppShell>{children}</AppShell>
        </PuppyProvider>
      </body>
    </html>
  );
}
