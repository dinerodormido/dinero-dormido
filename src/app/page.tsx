"use client";

import { FormEvent, useState } from "react";

const findings = [
  { title: "Facturas vencidas", text: "Importes pendientes que conviene reclamar antes de que se enfríen.", example: "F-104 · 1.240 € · vencida hace 18 días", tone: "alert" },
  { title: "Presupuestos sin seguimiento", text: "Presupuestos enviados que nadie ha vuelto a perseguir.", example: "P-088 · 4.800 € · enviado hace 12 días", tone: "opportunity" },
  { title: "Trabajos sin facturar", text: "Servicios terminados o aceptados que deberían revisarse contra factura.", example: "Trabajo terminado · sin factura asociada", tone: "teal" },
  { title: "Clientes reactivables", text: "Clientes antiguos que podrían necesitar revisión, mantenimiento o recompra.", example: "Revisión hace 11 meses · contactar", tone: "success" }
];

const steps = [
  ["Nos pasas una muestra", "Facturas, presupuestos y clientes de los últimos meses. Puede ser Excel, PDF o export de tu programa."],
  ["Revisamos y cruzamos datos", "Miramos fechas, importes, estados, clientes, presupuestos, trabajos y señales de seguimiento perdido."],
  ["Te entregamos un informe claro", "Recibes una lista priorizada de oportunidades y acciones recomendadas para revisar."],
  ["Decides si seguir", "Si tiene sentido, podemos convertirlo en control mensual o semanal."]
];

const dataTrust = [
  "Puedes empezar con una muestra pequeña.",
  "Puedes anonimizar nombres de clientes.",
  "No necesitamos acceso permanente.",
  "No sustituimos tu programa actual.",
  "Solo revisamos la información necesaria para la auditoría.",
  "Acuerdo de confidencialidad disponible si lo necesitas."
];

const fit = [
  "Instaladores",
  "Reformas técnicas",
  "Mantenimiento",
  "Climatización",
  "Servicios B2B",
  "Empresas con presupuestos de ticket medio/alto",
  "Negocios que trabajan con WhatsApp, email, Excel o programa de facturación"
];

const prices = [
  { name: "Auditoría inicial", price: "149 €", text: "Para detectar oportunidades y ver si tiene sentido seguir.", featured: true, items: ["Revisión de muestra", "Facturas vencidas", "Presupuestos dormidos", "Clientes reactivables", "Informe con acciones"] },
  { name: "Control mensual", price: "desde 149 €/mes", text: "Para mantener el seguimiento activo cada mes.", featured: false, items: ["Revisión mensual", "Lista priorizada", "Mensajes listos", "Informe mensual", "Seguimiento recurrente"] },
  { name: "Control semanal", price: "desde 299 €/mes", text: "Para empresas con más volumen.", featured: false, items: ["Revisión semanal", "Presupuestos calientes", "Facturas pendientes", "Soporte por email", "Reunión mensual"] }
];

const faqs = [
  ["¿Tengo que instalar algo?", "No. Para empezar solo necesitamos datos exportados o documentos. Puedes empezar con una muestra pequeña."],
  ["¿Tengo que cambiar de programa?", "No. Revisamos lo que ya usas: tu programa de facturación, Excel, PDFs, carpetas, emails o documentos exportados."],
  ["¿Y si mis datos están desordenados?", "No pasa nada. Precisamente la auditoría sirve para saber si, aun con datos imperfectos, hay oportunidades claras que merece la pena revisar."],
  ["¿Esto es un CRM?", "No. Un CRM exige que tu equipo lo use todos los días. Esto es una revisión práctica de datos actuales para detectar facturas, presupuestos, trabajos y clientes que requieren acción."],
  ["¿Esto es una gestoría o recobros?", "No. No sustituimos a tu gestoría y no hacemos recobro agresivo. Te damos una lista clara de qué revisar, reclamar o seguir."],
  ["¿Qué recibo exactamente?", "Un informe con oportunidades detectadas, importes estimados, prioridad y acciones recomendadas. El objetivo es que sepas qué mirar primero."],
  ["¿Todo lo detectado es dinero cobrable inmediato?", "No siempre. Algunas partidas son facturas reclamables; otras son oportunidades comerciales o revisiones internas que conviene validar."],
  ["¿Puedo anonimizar los datos?", "Sí. Para una primera muestra puedes ocultar nombres sensibles y dejar importes, fechas, estados y referencias suficientes para revisar el caso."]
];

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Dinero Dormido">
      <span className="mark">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="27" cy="27" r="18" fill="none" stroke="#00A7B5" strokeWidth="5.5" />
          <path d="M41 41L54 54" stroke="#00A7B5" strokeWidth="7" strokeLinecap="round" />
          <path d="M37 22C34.7 19 31.6 17.4 28 17.4C21.6 17.4 16.8 22.4 16.8 28.7C16.8 35 21.6 40 28 40C31.6 40 34.7 38.4 37 35.4" stroke="#08265C" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M13 27H28M13 33H26" stroke="#08265C" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M34 19h6l-6 5h6" stroke="#00A7B5" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span><b>Dinero</b> <b>Dormido</b></span>
    </a>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main id="inicio">
      <header><div className="wrap nav"><Logo /><nav className="links"><a href="#detectamos">Qué encontramos</a><a href="#como-funciona">Cómo funciona</a><a href="#informe">Informe</a><a href="#precios">Precios</a><a href="#faq">FAQ</a></nav><a className="btn primary" href="#formulario">Pedir revisión inicial</a></div></header>

      <section className="hero"><div className="wrap hero-grid"><div><h1 className="h1">Auditoría de dinero dormido para empresas que hacen presupuestos y facturan a clientes.</h1><p className="lead">Detectamos facturas vencidas, presupuestos sin seguimiento, trabajos sin facturar y clientes antiguos que puedes reactivar.</p><div className="trust">No tienes que instalar nada. No tienes que cambiar de programa. Empezamos con una muestra pequeña de tus datos.</div><div className="actions"><a className="btn primary big" href="#formulario">Pedir revisión inicial</a><a className="btn secondary big" href="#informe">Ver ejemplo de informe</a></div><p className="microcopy">Pensado para instaladores, reformas técnicas, mantenimiento, climatización, servicios B2B y empresas con presupuestos de ticket medio/alto.</p></div><div className="dash"><div className="dash-top"><div className="dash-head"><small>Ejemplo de informe</small><span>Instalaciones</span></div><div className="dash-total">26.330 € <span>en oportunidades detectadas</span></div><p className="dash-note">Ejemplo basado en una empresa de instalaciones. No todo es dinero cobrable inmediato: algunas son oportunidades a revisar.</p></div><div className="summary-list">{[["Facturas vencidas","4.250 €","Reclamar primero"],["Presupuestos sin seguimiento","11.700 €","Llamada de seguimiento"],["Clientes reactivables","8.900 €","Campaña de mantenimiento"],["Trabajos sin facturar","1.480 €","Revisar emisión"]].map(([label,value,action])=><div className="summary-row" key={label}><div><span>{label}</span><b>{action}</b></div><strong>{value}</strong></div>)}</div></div></div></section>

      <section className="section"><div className="wrap narrow"><h2>Cuando el seguimiento depende de la memoria, se escapan oportunidades.</h2><p className="copy">En empresas de instalaciones, reformas o mantenimiento es normal tener presupuestos enviados, trabajos terminados, facturas pendientes y clientes antiguos repartidos entre WhatsApp, Excel, PDFs y el programa de facturación.</p></div></section>

      <section id="detectamos" className="section soft"><div className="wrap"><div className="section-head"><h2>Qué encontramos en la auditoría</h2><p className="copy">No prometemos magia. Revisamos señales concretas y las convertimos en una lista de acciones.</p></div><div className="grid4">{findings.map((item)=><article className="card" key={item.title}><div className={`icon ${item.tone}`}>€</div><h3>{item.title}</h3><p>{item.text}</p><div className="example">{item.example}</div></article>)}</div></div></section>

      <section id="como-funciona" className="section"><div className="wrap"><div className="section-head center"><h2>Cómo funciona</h2><p className="copy">Una revisión acotada, pensada para saber rápido si hay valor antes de complicar nada.</p></div><div className="steps">{steps.map(([title,text],index)=><div className="step" key={title}><div className="num">{index+1}</div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section className="section slate"><div className="wrap split"><div><h2>Tus datos, bajo control</h2><p className="copy">La auditoría está planteada para trabajar con la mínima información necesaria y sin acceso permanente a tu negocio.</p></div><div className="check-panel">{dataTrust.map((item)=><div className="check-row" key={item}>✓ {item}</div>)}</div></div></section>

      <section className="section positioning"><div className="wrap"><h2>No somos un CRM. No somos una gestoría. No somos recobros.</h2><p className="copy strong-copy">Somos una auditoría práctica para encontrar oportunidades que ya existen en tu negocio:</p><div className="bullet-grid">{["facturas que deberías reclamar","presupuestos que deberías seguir","trabajos que deberías revisar","clientes que podrías volver a contactar"].map((item)=><div key={item}>✓ {item}</div>)}</div></div></section>

      <section id="informe" className="section"><div className="wrap report"><div className="report-panel"><div className="report-dark"><small>Ejemplo de informe</small><h2>Acciones recomendadas esta semana</h2><div className="report-stats">{[["Facturas vencidas","3.870 €","4 facturas a revisar"],["Presupuestos a rescatar","21.400 €","9 sin seguimiento"],["Trabajos sin facturar","2 casos","validación interna"],["Clientes reactivables","17","mantenimiento o recompra"]].map(([a,b,c])=><div key={a}><span>{a}</span><b>{b}</b><small>{c}</small></div>)}</div></div></div><div className="messages">{[["Reclamar factura F-104","Confirmar si el pago está programado y dejar fecha de seguimiento."],["Llamar por presupuesto P-088","Resolver dudas y decidir si sigue vivo o se descarta."],["Revisar trabajo terminado en Calle Mayor","Comprobar si existe factura asociada y estado de cobro."],["Contactar clientes con mantenimiento anual","Enviar mensaje breve para ofrecer revisión."]].map(([title,text])=><div className="message" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section id="para-quien" className="section soft"><div className="wrap split"><div><h2>Para quién encaja</h2><p className="copy">Funciona mejor cuando vendes con presupuesto, tienes ticket medio/alto y el seguimiento comercial no está perfectamente ordenado.</p></div><div className="chips">{fit.map((item)=><span key={item}>{item}</span>)}</div></div></section>

      <section id="precios" className="section dark"><div className="wrap"><div className="section-head"><h2>Precios claros para empezar sin complicarte</h2><p className="copy">La auditoría inicial se descuenta si contratas el control mensual.</p></div><div className="grid3">{prices.map((plan)=><div className={`price ${plan.featured ? "featured" : ""}`} key={plan.name}><h3>{plan.name}</h3><div className="amount">{plan.price}</div><p>{plan.text}</p><ul>{plan.items.map((item)=><li key={item}>{item}</li>)}</ul><a className={`btn ${plan.featured ? "primary" : "secondary"}`} href="#formulario">Pedir revisión inicial</a></div>)}</div></div></section>

      <section id="faq" className="section"><div className="wrap faq"><div className="section-head center"><h2>Preguntas frecuentes</h2></div><div className="faq-grid">{faqs.map(([question,answer])=><article className="faq-item" key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></div></section>

      <section id="formulario" className="section slate"><div className="wrap formwrap"><div><h2>Solicita tu revisión inicial</h2><p className="copy">Cuéntanos qué te preocupa y te diremos qué muestra de datos necesitamos para empezar.</p><div className="aside-note">Lo técnico viene después. Primero queremos entender si hay facturas, presupuestos, trabajos o clientes que merezca la pena revisar.</div></div><form className="form" onSubmit={submit}><div className="fields"><Field label="Nombre" /><Field label="Empresa" /><Field label="Email" type="email" /><Field label="Teléfono" /><Field label="Sector" /><label><span>¿Qué te preocupa más?</span><select required><option>Facturas pendientes</option><option>Presupuestos sin seguimiento</option><option>Trabajos sin facturar</option><option>Clientes antiguos</option><option>Desorden general</option><option>No lo sé, quiero revisarlo</option></select></label></div><label><span>Mensaje</span><textarea rows={5} placeholder="Ej. Enviamos muchos presupuestos y no siempre sabemos cuáles se siguen..." /></label><button className="btn primary form-btn">Pedir revisión inicial</button><p className="privacy">Usaremos tus datos solo para responder a tu solicitud. Puedes empezar con información limitada o anonimizada.</p>{sent && <div className="success">Solicitud recibida. Revisaremos si tu negocio encaja con la auditoría y qué muestra necesitamos para empezar.</div>}</form></div></section>

      <footer><div className="wrap foot"><div><Logo /><p>Auditoría práctica para encontrar oportunidades entre facturas, presupuestos, trabajos y clientes olvidados.</p></div><div className="footlinks"><a href="#detectamos">Qué encontramos</a><a href="#como-funciona">Cómo funciona</a><a href="#precios">Precios</a><a href="#formulario">Contacto</a></div></div><div className="legal">© 2026 Dinero Dormido. Todos los derechos reservados.</div></footer><div className="sticky-cta"><a className="btn primary" href="#formulario">Pedir revisión inicial</a></div>
    </main>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return <label><span>{label}</span><input type={type} required /></label>;
}
