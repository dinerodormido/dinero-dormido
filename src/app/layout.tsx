import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Dinero Dormido | Auditoria para recuperar dinero olvidado",
  description: "Encuentra facturas vencidas, presupuestos sin seguimiento, trabajos sin facturar y clientes que puedes reactivar.",
  metadataBase: new URL("https://dinerodormido.com"),
  openGraph: {
    title: "Dinero Dormido",
    description: "Auditoria inicial para pequeñas empresas que pierden oportunidades entre facturas, presupuestos y clientes olvidados.",
    type: "website",
    locale: "es_ES"
  },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = { themeColor: "#00A7B5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
