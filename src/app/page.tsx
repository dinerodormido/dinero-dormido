"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Play,
  ReceiptText,
  Search,
  Send,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type ReportType = "summary" | "invoices" | "quotes" | "work" | "clients";

const DEMO_DURATION_SECONDS = 60;
const DEMO_STEP_SECONDS = DEMO_DURATION_SECONDS / 5;

const findings = [
  {
    icon: ReceiptText,
    title: "Facturas vencidas",
    text: "Detectamos facturas pendientes, vencidas o parcialmente pagadas para que sepas qué reclamar primero.",
    example: "F-104 · 1.240 € · vencida hace 18 días",
    tone: "alert",
  },
  {
    icon: Search,
    title: "Presupuestos dormidos",
    text: "Encontramos presupuestos enviados que no recibieron seguimiento y todavía pueden recuperarse.",
    example: "P-088 · 4.800 € · enviado hace 12 días",
    tone: "opportunity",
  },
  {
    icon: FileText,
    title: "Trabajos sin facturar",
    text: "Cruzamos trabajos, presupuestos aceptados y facturas para detectar servicios terminados que no se han cobrado.",
    example: "Trabajo terminado · sin factura asociada",
    tone: "teal",
  },
  {
    icon: Send,
    title: "Clientes reactivables",
    text: "Buscamos clientes antiguos que podrían volver a comprar por mantenimiento, revisión o recompra.",
    example: "Revisión hace 11 meses · contactar",
    tone: "success-tone",
  },
];

const demoSteps = [
  {
    title: "Subes una muestra",
    text: "Empezamos con una muestra pequeña. No necesitas tenerlo todo perfecto.",
    icon: UploadCloud,
    label: "Datos de partida",
    visual: ["Facturas.xlsx", "Presupuestos.pdf", "Clientes.csv", "Trabajos terminados.doc"],
  },
  {
    title: "Detectamos facturas vencidas",
    text: "Detectamos qué facturas deberían reclamarse primero.",
    icon: ReceiptText,
    label: "Cobros pendientes",
    visual: ["F-104 · 1.240 € · vencida hace 18 días", "F-108 · 890 € · vencida hace 7 días"],
  },
  {
    title: "Encontramos presupuestos dormidos",
    text: "Encontramos presupuestos que se enviaron, pero nadie volvió a perseguir.",
    icon: Search,
    label: "Oportunidades comerciales",
    visual: ["P-088 · 4.800 € · enviado hace 12 días · sin seguimiento", "P-102 · 2.100 € · enviado hace 8 días · contactar hoy"],
  },
  {
    title: "Revisamos trabajos sin facturar",
    text: "Cruzamos trabajos, presupuestos y facturas para detectar posibles servicios no cobrados.",
    icon: FileText,
    label: "Revisión interna",
    visual: ["Trabajo terminado · Calle Mayor · sin factura asociada", "Instalación aceptada · Cliente López · revisar emisión"],
  },
  {
    title: "Recibes acciones claras",
    text: "Recibes un informe claro con prioridades y mensajes listos.",
    icon: CheckCircle2,
    label: "Informe final",
    visual: ["Reclamar F-104", "Llamar por P-088", "Revisar trabajo Calle Mayor", "Contactar clientes de mantenimiento"],
  },
];

const steps = [
  ["Nos pasas una muestra", "Facturas, presupuestos y clientes de los últimos meses. Puede ser Excel, PDF o export de tu programa."],
  ["Revisamos y cruzamos datos", "Miramos fechas, importes, estados, clientes, presupuestos, trabajos y señales de seguimiento perdido."],
  ["Te entregamos un informe claro", "Recibes una lista priorizada de oportunidades, importes estimados y acciones recomendadas."],
  ["Decides si seguir", "Si aporta valor, lo convertimos en control mensual o semanal para que nada vuelva a quedar olvidado."],
];

const reportSlides: { tab: string; eyebrow: string; title: string; text: string; type: ReportType }[] = [
  {
    tab: "Resumen",
    eyebrow: "Resumen ejecutivo",
    title: "Una foto clara de dónde mirar primero",
    text: "Una foto clara de dónde está el dinero pendiente y qué oportunidades merece la pena revisar primero.",
    type: "summary",
  },
  {
    tab: "Facturas",
    eyebrow: "Facturas vencidas",
    title: "Qué reclamar y en qué orden",
    text: "El informe te dice qué facturas deberías reclamar y en qué orden.",
    type: "invoices",
  },
  {
    tab: "Presupuestos",
    eyebrow: "Presupuestos dormidos",
    title: "Presupuestos que nadie volvió a perseguir",
    text: "Detectamos presupuestos que se enviaron pero nadie volvió a perseguir.",
    type: "quotes",
  },
  {
    tab: "Trabajos",
    eyebrow: "Trabajos sin facturar",
    title: "Servicios hechos que conviene revisar",
    text: "Cruzamos trabajos, presupuestos aceptados y facturas para detectar posibles servicios ya realizados que todavía no se han cobrado.",
    type: "work",
  },
  {
    tab: "Clientes",
    eyebrow: "Clientes reactivables + mensajes listos",
    title: "Acciones concretas para contactar",
    text: "No solo señalamos oportunidades. También damos acciones concretas y mensajes listos para enviar.",
    type: "clients",
  },
];

const dataTrust = [
  "Puedes empezar con una muestra pequeña.",
  "Puedes anonimizar nombres de clientes.",
  "No necesitamos acceso permanente.",
  "No sustituimos tu programa actual.",
  "Solo revisamos la información necesaria para la auditoría.",
  "Acuerdo de confidencialidad disponible si lo necesitas.",
];

const prices = [
  {
    name: "Auditoría inicial",
    price: "149 €",
    text: "Para detectar oportunidades y ver si tiene sentido seguir.",
    featured: true,
    items: ["Revisión de muestra", "Facturas vencidas", "Presupuestos dormidos", "Clientes reactivables", "Informe con acciones"],
  },
  {
    name: "Control mensual",
    price: "desde 149 €/mes",
    text: "Para mantener el seguimiento activo cada mes.",
    featured: false,
    items: ["Revisión mensual", "Lista priorizada", "Mensajes listos", "Informe mensual", "Seguimiento recurrente"],
  },
  {
    name: "Control semanal",
    price: "desde 299 €/mes",
    text: "Para empresas con más volumen.",
    featured: false,
    items: ["Revisión semanal", "Presupuestos calientes", "Facturas pendientes", "Soporte por email", "Reunión mensual"],
  },
];

const faqs = [
  ["¿Tengo que instalar algo?", "No. Para empezar solo necesitamos datos exportados o documentos. Puedes empezar con una muestra pequeña."],
  ["¿Tengo que cambiar de programa?", "No. Revisamos lo que ya usas: tu programa de facturación, Excel, PDFs, carpetas, emails o documentos exportados."],
  ["¿Y si mis datos están desordenados?", "No pasa nada. Precisamente la auditoría sirve para saber si, aun con datos imperfectos, hay oportunidades claras que merece la pena revisar."],
  ["¿Esto es un CRM?", "No. Un CRM exige que tu equipo lo use todos los días. Esto es una revisión práctica de datos actuales para detectar facturas, presupuestos, trabajos y clientes que requieren acción."],
  ["¿Esto es una gestoría o recobros?", "No. No sustituimos a tu gestoría y no hacemos recobro agresivo. Te damos una lista clara de qué revisar, reclamar o seguir."],
  ["¿Qué recibo exactamente?", "Un informe con oportunidades detectadas, importes estimados, prioridad y acciones recomendadas. El objetivo es que sepas qué mirar primero."],
  ["¿Todo lo detectado es dinero cobrable inmediato?", "No siempre. Algunas partidas son facturas reclamables; otras son oportunidades comerciales o revisiones internas que conviene validar."],
  ["¿Puedo anonimizar los datos?", "Sí. Para una primera muestra puedes ocultar nombres sensibles y dejar importes, fechas, estados y referencias suficientes para revisar el caso."],
];

function Logo() {
  return (
    <Link className="logo" href="/#inicio" aria-label="Dinero Dormido">
      <span className="mark">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="27" cy="27" r="18" fill="none" stroke="#00A7B5" strokeWidth="5.5" />
          <path d="M41 41L54 54" stroke="#00A7B5" strokeWidth="7" strokeLinecap="round" />
          <path d="M37 22C34.7 19 31.6 17.4 28 17.4C21.6 17.4 16.8 22.4 16.8 28.7C16.8 35 21.6 40 28 40C31.6 40 34.7 38.4 37 35.4" stroke="#08265C" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M13 27H28M13 33H26" stroke="#08265C" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M36 19h5l-5 4h5" stroke="#00A7B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
        </svg>
      </span>
      <span>
        <b>Dinero</b> <b>Dormido</b>
      </span>
    </Link>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main id="inicio">
      <header>
        <div className="wrap nav">
          <Logo />
          <nav className="links" aria-label="Navegación principal">
            <a href="#detectamos">Qué encontramos</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#demo">Demo</a>
            <a href="#informe">Informe</a>
            <a href="#precios">Precios</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="btn primary" href="#formulario">Pedir revisión inicial</a>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="h1">Auditoría de dinero dormido para empresas que hacen presupuestos y facturan a clientes.</h1>
            <p className="lead">Detectamos facturas vencidas, presupuestos sin seguimiento, trabajos sin facturar y clientes antiguos que puedes reactivar.</p>
            <div className="trust">No tienes que instalar nada. No tienes que cambiar de programa. Empezamos con una muestra pequeña de tus datos.</div>
            <div className="actions">
              <a className="btn primary big" href="#formulario">Pedir revisión inicial</a>
              <a className="btn secondary big" href="#demo">Ver cómo funciona</a>
            </div>
            <p className="microcopy">Pensado para instaladores, reformas técnicas, mantenimiento, climatización, servicios B2B y empresas con presupuestos de ticket medio/alto.</p>
          </div>
          <HeroDashboard />
        </div>
      </section>

      <DemoSection />

      <section className="section problem">
        <div className="wrap narrow">
          <h2>Tu empresa puede estar trabajando mucho y aun así perder dinero.</h2>
          <p className="copy">En muchas pequeñas empresas, el seguimiento depende demasiado de la memoria del dueño, de WhatsApps sueltos, de Excels, de PDFs y de una administrativa saturada.</p>
          <div className="system-note">No es falta de esfuerzo. Es falta de sistema.</div>
        </div>
      </section>

      <section id="detectamos" className="section soft">
        <div className="wrap">
          <div className="section-head">
            <h2>Qué encuentra Dinero Dormido en tu negocio</h2>
            <p className="copy">Cruzamos facturas, presupuestos, clientes y estados de cobro para convertir el desorden en acciones claras.</p>
          </div>
          <div className="grid4">
            {findings.map((item) => {
              const Icon = item.icon;
              return (
                <article className="card" key={item.title}>
                  <div className={`icon ${item.tone}`}><Icon size={21} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="example">{item.example}</div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section">
        <div className="wrap">
          <div className="section-head center">
            <h2>Cómo funciona</h2>
            <p className="copy">Una revisión acotada, pensada para saber rápido si hay valor antes de complicar nada.</p>
          </div>
          <div className="steps">
            {steps.map(([title, text], index) => (
              <div className="step" key={title}>
                <div className="num">{index + 1}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReportSection />

      <section className="ideal-band">
        <div className="wrap">
          <p>Ideal para instaladores, reformas técnicas, mantenimiento, climatización y servicios B2B con presupuestos de ticket medio/alto.</p>
        </div>
      </section>

      <section className="section slate">
        <div className="wrap trust-layout">
          <div>
            <h2>Tus datos, bajo control</h2>
            <p className="copy">La auditoría está planteada para trabajar con la mínima información necesaria y sin acceso permanente a tu negocio.</p>
            <div className="positioning-box">
              <ShieldCheck size={24} />
              <h3>No somos un CRM. No somos una gestoría. No somos recobros.</h3>
              <p>Somos una auditoría práctica para encontrar oportunidades que ya existen: facturas que deberías reclamar, presupuestos que deberías seguir, trabajos que deberías revisar y clientes que podrías volver a contactar.</p>
            </div>
          </div>
          <div className="check-panel">
            {dataTrust.map((item) => (
              <div className="check-row" key={item}><CheckCircle2 size={18} /> {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="section dark">
        <div className="wrap">
          <div className="section-head">
            <h2>Precios claros para empezar sin complicarte</h2>
            <p className="copy">La auditoría inicial se descuenta si contratas el control mensual.</p>
          </div>
          <div className="grid3">
            {prices.map((plan) => (
              <div className={`price ${plan.featured ? "featured" : ""}`} key={plan.name}>
                <h3>{plan.name}</h3>
                <div className="amount">{plan.price}</div>
                <p>{plan.text}</p>
                <ul>
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className={`btn ${plan.featured ? "primary" : "secondary"}`} href="#formulario">Pedir revisión inicial</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="wrap faq">
          <div className="section-head center">
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="faq-grid">
            {faqs.map(([question, answer], index) => (
              <article className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  <span>{question}</span>
                  <ChevronDown size={20} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .22 }}
                    >
                      {answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="section slate">
        <div className="wrap formwrap">
          <div>
            <h2>Solicita tu auditoría de Dinero Dormido</h2>
            <p className="copy">Cuéntanos qué te preocupa y te diremos qué muestra de datos necesitamos para empezar.</p>
            <div className="aside-note">Lo técnico viene después. Primero queremos entender si hay facturas, presupuestos, trabajos o clientes que merezca la pena revisar.</div>
          </div>
          <form className="form" onSubmit={submit}>
            <div className="fields">
              <Field label="Nombre" />
              <Field label="Empresa" />
              <Field label="Email" type="email" />
              <Field label="Teléfono" />
              <Field label="Sector" />
              <label>
                <span>¿Qué te preocupa más?</span>
                <select required defaultValue="Facturas pendientes">
                  <option>Facturas pendientes</option>
                  <option>Presupuestos sin seguimiento</option>
                  <option>Trabajos sin facturar</option>
                  <option>Clientes antiguos</option>
                  <option>Desorden general</option>
                  <option>No lo sé, quiero revisarlo</option>
                </select>
              </label>
            </div>
            <label>
              <span>Mensaje</span>
              <textarea rows={5} placeholder="Ej. Enviamos muchos presupuestos y no siempre sabemos cuáles se siguen..." />
            </label>
            <button className="btn primary form-btn">Solicitar revisión</button>
            <p className="privacy">Usaremos tus datos solo para responder a tu solicitud. Puedes empezar con información limitada o anonimizada.</p>
            {sent && <div className="success-message">Solicitud recibida. Revisaremos si tu negocio encaja con la auditoría y qué muestra necesitamos para empezar.</div>}
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <div>
            <Logo />
            <p>Auditoría práctica para encontrar oportunidades entre facturas, presupuestos, trabajos y clientes olvidados.</p>
          </div>
          <div className="footlinks">
            <a href="#detectamos">Qué encontramos</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#demo">Demo</a>
            <a href="#informe">Informe</a>
            <a href="#precios">Precios</a>
            <a href="#formulario">Contacto</a>
          </div>
        </div>
        <div className="legal">© 2026 Dinero Dormido. Todos los derechos reservados.</div>
      </footer>

      <div className="sticky-cta">
        <a className="btn primary" href="#formulario">Pedir revisión inicial</a>
      </div>
    </main>
  );
}

function HeroDashboard() {
  return (
    <div className="dash" aria-label="Ejemplo de informe de Dinero Dormido">
      <div className="dash-top">
        <div className="dash-head">
          <small>Ejemplo de informe</small>
          <span>Empresa de instalaciones</span>
        </div>
        <div className="dash-total">26.330 € <span>en oportunidades detectadas</span></div>
        <p className="dash-note">Ejemplo basado en una empresa de instalaciones. No todo es dinero cobrable inmediato: algunas son oportunidades a revisar.</p>
      </div>
      <div className="summary-list">
        {[
          ["Facturas vencidas", "4.250 €", "Reclamar primero"],
          ["Presupuestos sin seguimiento", "11.700 €", "Llamada de seguimiento"],
          ["Clientes reactivables", "8.900 €", "Campaña de mantenimiento"],
          ["Trabajos sin facturar", "1.480 €", "Revisar emisión"],
        ].map(([label, value, action]) => (
          <div className="summary-row" key={label}>
            <div>
              <span>{label}</span>
              <b>{action}</b>
            </div>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSection() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => Math.min(DEMO_DURATION_SECONDS, current + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (elapsed >= DEMO_DURATION_SECONDS) {
      setPlaying(false);
    }
  }, [elapsed]);

  const active = Math.min(demoSteps.length - 1, Math.floor((elapsed / DEMO_DURATION_SECONDS) * demoSteps.length));
  const remaining = DEMO_DURATION_SECONDS - elapsed;
  const progress = (elapsed / DEMO_DURATION_SECONDS) * 100;
  const current = demoSteps[active];
  const CurrentIcon = current.icon;

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${minutes}:${rest.toString().padStart(2, "0")}`;
  }

  function playDemo() {
    if (elapsed >= DEMO_DURATION_SECONDS) {
      setElapsed(0);
    }
    setPlaying(true);
  }

  function jumpToStep(index: number) {
    setElapsed(Math.min(DEMO_DURATION_SECONDS - 1, index * DEMO_STEP_SECONDS));
    setPlaying(true);
  }

  return (
    <section id="demo" className="section demo-section">
      <div className="wrap">
        <div className="section-head center demo-head">
          <h2>Mira cómo funciona en 60 segundos</h2>
          <p className="copy">No es otra app más. Es una revisión práctica que convierte facturas, presupuestos y clientes olvidados en acciones claras.</p>
        </div>
        <div className="demo-layout">
          <div className="video-mockup" aria-label="Demo interactiva de la auditoría">
            <div className="video-top">
              <span>Demo auditoría</span>
              <b>{formatTime(remaining)}</b>
            </div>
            <div className="video-screen">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 22, scale: .98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: .98 }}
                  transition={{ duration: 0.34 }}
                  className="video-card"
                >
                  <div className="video-card-head">
                    <div className="video-icon"><CurrentIcon size={30} /></div>
                    <div>
                      <span>Pantalla {active + 1}</span>
                      <strong>{current.label}</strong>
                    </div>
                  </div>
                  <h3>{current.title}</h3>
                  <p>{current.text}</p>
                  <div className={active === demoSteps.length - 1 ? "demo-visual actions-list" : "demo-visual"}>
                    {active === demoSteps.length - 1 && <b>Acciones recomendadas esta semana:</b>}
                    {current.visual.map((item, index) => (
                      <div className="demo-visual-row" key={item}>
                        <span>{active === demoSteps.length - 1 ? index + 1 : ""}</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              {!playing && (
                <button className="play-button" onClick={playDemo} aria-label="Reproducir demo">
                  <Play size={38} fill="currentColor" />
                </button>
              )}
            </div>
            <div className="video-progress" aria-hidden="true">
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: .45 }} />
            </div>
          </div>

          <div className="demo-side">
            <div className="demo-points">
              {demoSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <button key={step.title} className={index === active ? "active" : ""} onClick={() => jumpToStep(index)}>
                    <span>{index + 1}</span>
                    <StepIcon size={18} />
                    <strong>{step.title}</strong>
                  </button>
                );
              })}
            </div>
            <div className="demo-side-note">
              <CheckCircle2 size={20} />
              <p>La revisión no exige acceso permanente: empezamos con una muestra y te enseñamos si hay oportunidades reales.</p>
            </div>
          </div>
        </div>

        <div className="demo-cta">
          <h3>¿Quieres ver qué aparecería en tu empresa?</h3>
          <p>Empieza con una muestra pequeña de facturas y presupuestos. Te diremos si hay oportunidades antes de complicar nada.</p>
          <a className="btn primary big" href="#formulario">Pedir revisión inicial</a>
        </div>
      </div>
    </section>
  );
}

function ReportSection() {
  const [selected, setSelected] = useState(0);
  const slide = reportSlides[selected];

  function goToSlide(index: number) {
    setSelected((index + reportSlides.length) % reportSlides.length);
  }

  return (
    <section id="informe" className="section report-section">
      <div className="wrap">
        <div className="section-head center">
          <h2>Así se ve un informe de Dinero Dormido</h2>
          <p className="copy">No recibes teoría ni gráficos vacíos. Recibes un informe claro con dinero pendiente, oportunidades detectadas y acciones concretas para actuar.</p>
        </div>

        <div className="report-shell">
          <div className="report-tabs" role="tablist" aria-label="Apartados del informe">
            {reportSlides.map((slide, index) => (
              <button key={slide.tab} className={selected === index ? "active" : ""} onClick={() => goToSlide(index)}>
                {slide.tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              className="report-slide"
              key={slide.eyebrow}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: .28 }}
            >
              <div className="pdf-mockup">
                <div className="pdf-toolbar">
                  <span>Informe Dinero Dormido</span>
                  <b>{slide.eyebrow}</b>
                </div>
                <div className="pdf-page">
                  <div className="pdf-brand">
                    <FileText size={18} />
                    <span>Auditoría inicial · Empresa de instalaciones</span>
                  </div>
                  <ReportMockup type={slide.type} />
                </div>
              </div>
              <aside className="slide-copy">
                <span>{slide.eyebrow}</span>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </aside>
            </motion.div>
          </AnimatePresence>

          <div className="report-nav">
            <button aria-label="Apartado anterior" onClick={() => goToSlide(selected - 1)}><ChevronLeft size={22} /></button>
            <div className="dots" aria-label="Seleccionar parte del informe">
              {reportSlides.map((item, index) => (
                <button
                  key={item.eyebrow}
                  aria-label={item.eyebrow}
                  className={index === selected ? "active" : ""}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <button aria-label="Apartado siguiente" onClick={() => goToSlide(selected + 1)}><ChevronRight size={22} /></button>
          </div>
        </div>

        <div className="report-cta">
          <h3>¿Quieres una revisión así para tu empresa?</h3>
          <p>Empieza con una auditoría inicial y descubre qué dinero pendiente, presupuestos olvidados y clientes reactivables tienes ahora mismo.</p>
          <div className="actions center-actions">
            <a className="btn primary big" href="#formulario">Pedir revisión inicial</a>
            <Link className="btn secondary big" href="/informe-demo">Ver informe demo <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportMockup({ type }: { type: ReportType }) {
  if (type === "summary") {
    return (
      <div className="mock-grid">
        {[
          ["Facturas vencidas detectadas", "4"],
          ["Importe pendiente", "3.870 €"],
          ["Presupuestos sin seguimiento", "9"],
          ["Valor estimado", "21.400 €"],
          ["Trabajos sin facturar", "2"],
          ["Clientes reactivables", "17"],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    );
  }

  if (type === "invoices") {
    return (
      <div className="mock-table">
        <div>
          <b>Factura</b><b>Cliente</b><b>Importe</b><b>Vencimiento</b><b>Acción</b>
        </div>
        {[
          ["F-104", "Cliente Norte", "1.240 €", "Hace 18 días", "Enviar recordatorio"],
          ["F-108", "Bar Central", "890 €", "Hace 7 días", "Llamar"],
          ["F-112", "Comunidad Sol", "1.740 €", "Hace 21 días", "Revisar pago"],
        ].map((row) => (
          <div key={row[0]}>
            {row.map((cell) => <span key={cell}>{cell}</span>)}
          </div>
        ))}
      </div>
    );
  }

  if (type === "quotes") {
    return (
      <div className="mock-cards">
        {[
          ["Presupuesto P-088", "4.800 €", "enviado hace 12 días", "sin seguimiento"],
          ["Presupuesto P-102", "2.100 €", "enviado hace 8 días", "contactar hoy"],
          ["Presupuesto P-115", "6.300 €", "enviado hace 20 días", "oportunidad caliente"],
        ].map((row) => (
          <div key={row[0]}>
            <b>{row[0]}</b>
            <strong>{row[1]}</strong>
            <span>{row[2]}</span>
            <em>{row[3]}</em>
          </div>
        ))}
      </div>
    );
  }

  if (type === "work") {
    return (
      <div className="mock-list">
        {[
          "Reparación caldera — Calle Mayor — terminado — sin factura asociada",
          "Instalación aire acondicionado — Cliente López — aceptado — revisar emisión",
          "Mantenimiento anual — Comunidad Sol — realizado — pendiente de facturar",
        ].map((item) => <div key={item}>✓ {item}</div>)}
      </div>
    );
  }

  return (
    <div className="mock-clients">
      <div className="mock-list">
        {[
          "Restaurante Sol — revisión hace 11 meses",
          "Comunidad Pinar — mantenimiento pendiente",
          "Clínica Norte — servicio repetible",
        ].map((item) => <div key={item}>✓ {item}</div>)}
      </div>
      <div className="message-box">Hola [Nombre], el año pasado realizamos [servicio]. Estamos revisando mantenimientos y quería saber si quieres que te reservemos una revisión.</div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} required />
    </label>
  );
}
