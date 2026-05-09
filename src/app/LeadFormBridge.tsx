"use client";

import { useEffect } from "react";

type LeadPayload = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  sector: string;
  preocupacion: string;
  mensaje: string;
  website: string;
};

const successText =
  "Solicitud recibida. Te contactaremos para revisar si tu caso encaja y decirte qué muestra necesitamos para empezar.";
const errorText =
  "No hemos podido enviar la solicitud. Prueba de nuevo o escríbenos directamente a dinerodormido@gmail.com.";

function setMessage(form: HTMLFormElement, type: "success" | "error", text: string) {
  form.querySelector("[data-lead-message]")?.remove();

  const message = document.createElement("div");
  message.dataset.leadMessage = type;
  message.className = type === "success" ? "success-message" : "error-message";
  message.textContent = text;

  if (type === "error") {
    message.style.marginTop = "16px";
    message.style.border = "1px solid #FECACA";
    message.style.borderRadius = "16px";
    message.style.background = "#FEF2F2";
    message.style.padding = "15px";
    message.style.color = "#991B1B";
    message.style.fontWeight = "850";
    message.style.lineHeight = "1.5";
  }

  form.appendChild(message);
}

function prepareForm(form: HTMLFormElement) {
  const inputs = Array.from(form.querySelectorAll("input"));
  const select = form.querySelector("select");
  const textarea = form.querySelector("textarea");
  const button = form.querySelector<HTMLButtonElement>("button[type='submit'], button");

  const fieldNames = ["nombre", "empresa", "email", "telefono", "sector"];
  fieldNames.forEach((name, index) => {
    if (!inputs[index]) return;
    inputs[index].name = name;
  });

  if (inputs[3]) inputs[3].required = false;
  if (inputs[4]) inputs[4].required = false;
  if (select) select.name = "preocupacion";
  if (textarea) textarea.name = "mensaje";
  if (button) button.textContent = "Pedir revisión inicial";

  if (!form.querySelector("input[name='website']")) {
    const honeypot = document.createElement("input");
    honeypot.name = "website";
    honeypot.type = "text";
    honeypot.tabIndex = -1;
    honeypot.autocomplete = "off";
    honeypot.setAttribute("aria-hidden", "true");
    honeypot.style.position = "absolute";
    honeypot.style.left = "-9999px";
    honeypot.style.width = "1px";
    honeypot.style.height = "1px";
    honeypot.style.opacity = "0";
    honeypot.style.pointerEvents = "none";
    form.appendChild(honeypot);
  }
}

function getPayload(form: HTMLFormElement): LeadPayload {
  const formData = new FormData(form);
  return {
    nombre: String(formData.get("nombre") ?? "").trim(),
    empresa: String(formData.get("empresa") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefono: String(formData.get("telefono") ?? "").trim(),
    sector: String(formData.get("sector") ?? "").trim(),
    preocupacion: String(formData.get("preocupacion") ?? "").trim(),
    mensaje: String(formData.get("mensaje") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
  };
}

export default function LeadFormBridge() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("#formulario form.form");
    if (!form) return;

    prepareForm(form);

    async function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (!form) return;

      const button = form.querySelector<HTMLButtonElement>("button[type='submit'], button");
      const payload = getPayload(form);
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

      if (!payload.nombre || !payload.empresa || !payload.preocupacion || !validEmail) {
        setMessage(form, "error", errorText);
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "Enviando...";
        button.style.opacity = ".72";
        button.style.cursor = "not-allowed";
      }

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.success) {
          throw new Error("Lead request failed");
        }

        form.reset();
        setMessage(form, "success", successText);
      } catch {
        setMessage(form, "error", errorText);
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = "Pedir revisión inicial";
          button.style.opacity = "";
          button.style.cursor = "";
        }
      }
    }

    form.addEventListener("submit", handleSubmit, true);
    return () => form.removeEventListener("submit", handleSubmit, true);
  }, []);

  return null;
}
