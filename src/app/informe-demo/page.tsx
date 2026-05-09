"use client";

import Link from "next/link";
import { Printer } from "lucide-react";

const summary = [
  ["Facturas vencidas detectadas", "4"],
  ["Importe pendiente", "3.870 €"],
  ["Presupuestos sin seguimiento", "9"],
  ["Valor estimado", "21.400 €"],
  ["Trabajos sin facturar", "2"],
  ["Clientes reactivables", "17"],
];

export default function InformeDemoPage() {
  return (
    <main className="demo-page">
      <div className="wrap">
        <nav className="demo-doc-nav">
          <Link href="/#informe">← Volver a Dinero Dormido</Link>
          <button className="print-button" onClick={() => window.print()}>
            <Printer size={18} /> Descargar / imprimir informe
          </button>
        </nav>

        <article className="a4-doc">
          <section className="doc-cover">
            <small>Informe demo</small>
            <h1>Informe Dinero Dormido</h1>
            <p>Auditoría inicial para detectar facturas vencidas, presupuestos sin seguimiento, trabajos sin facturar y clientes reactivables.</p>
          </section>

          <section className="doc-section">
            <h2>Resumen ejecutivo</h2>
            <div className="doc-grid">
              {summary.map(([label, value]) => (
                <div className="doc-card" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="doc-section">
            <h2>Facturas vencidas</h2>
            <table className="doc-table">
              <thead>
                <tr><th>Factura</th><th>Cliente</th><th>Importe</th><th>Vencimiento</th><th>Acción</th></tr>
              </thead>
              <tbody>
                <tr><td>F-104</td><td>Cliente Norte</td><td>1.240 €</td><td>Hace 18 días</td><td>Enviar recordatorio</td></tr>
                <tr><td>F-108</td><td>Bar Central</td><td>890 €</td><td>Hace 7 días</td><td>Llamar</td></tr>
                <tr><td>F-112</td><td>Comunidad Sol</td><td>1.740 €</td><td>Hace 21 días</td><td>Revisar pago</td></tr>
              </tbody>
            </table>
          </section>

          <section className="doc-section">
            <h2>Presupuestos dormidos</h2>
            <div className="doc-list">
              <div>Presupuesto P-088 — 4.800 € — enviado hace 12 días — sin seguimiento</div>
              <div>Presupuesto P-102 — 2.100 € — enviado hace 8 días — contactar hoy</div>
              <div>Presupuesto P-115 — 6.300 € — enviado hace 20 días — oportunidad caliente</div>
            </div>
          </section>

          <section className="doc-section">
            <h2>Trabajos sin facturar</h2>
            <div className="doc-list">
              <div>Reparación caldera — Calle Mayor — terminado — sin factura asociada</div>
              <div>Instalación aire acondicionado — Cliente López — aceptado — revisar emisión</div>
              <div>Mantenimiento anual — Comunidad Sol — realizado — pendiente de facturar</div>
            </div>
          </section>

          <section className="doc-section">
            <h2>Clientes reactivables</h2>
            <div className="doc-list">
              <div>Restaurante Sol — revisión hace 11 meses</div>
              <div>Comunidad Pinar — mantenimiento pendiente</div>
              <div>Clínica Norte — servicio repetible</div>
            </div>
          </section>

          <section className="doc-section">
            <h2>Acciones recomendadas</h2>
            <div className="doc-list">
              <div>1. Reclamar factura F-104 y confirmar fecha de pago.</div>
              <div>2. Llamar al cliente del presupuesto P-088.</div>
              <div>3. Revisar trabajo terminado en Calle Mayor.</div>
              <div>4. Escribir a clientes con mantenimiento anual pendiente.</div>
            </div>
          </section>

          <section className="doc-section">
            <h2>Mensajes listos</h2>
            <div className="doc-list">
              <div>Factura vencida: Hola [Nombre], te escribo por la factura [número] de [importe], con vencimiento el [fecha]. ¿Podrías confirmarme si el pago está programado?</div>
              <div>Presupuesto sin respuesta: Hola [Nombre], te escribo por el presupuesto que te enviamos sobre [servicio]. ¿Has podido revisarlo?</div>
              <div>Cliente antiguo: Hola [Nombre], el año pasado realizamos [servicio]. Estamos revisando mantenimientos y quería saber si quieres que te reservemos una revisión.</div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
