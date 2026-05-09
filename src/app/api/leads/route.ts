import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const leadSchema = z.object({
  nombre: z.string().trim().min(2),
  empresa: z.string().trim().min(2),
  email: z.string().trim().email(),
  telefono: z.string().trim().optional().or(z.literal("")),
  sector: z.string().trim().optional().or(z.literal("")),
  preocupacion: z.string().trim().min(1),
  mensaje: z.string().trim().optional().or(z.literal("")),
  website: z.string().trim().optional().or(z.literal("")),
});

function optionalText(value?: string) {
  const clean = value?.trim();
  return clean ? clean : null;
}

function normalizeSupabaseUrl(value?: string) {
  let clean = value?.trim();
  if (!clean) return null;

  clean = clean.replace(/^['"]|['"]$/g, "").trim();

  if (clean.includes("=")) {
    clean = clean.split("=").slice(1).join("=").trim();
  }

  const urlMatch = clean.match(/https?:\/\/[^\s'"<>]+/);
  if (urlMatch) {
    clean = urlMatch[0];
  }

  if (/^[a-z0-9]{20,}\.supabase\.co$/i.test(clean)) {
    clean = `https://${clean}`;
  }

  try {
    const url = new URL(clean);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getIpAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Datos inválidos" },
        { status: 400 },
      );
    }

    const lead = parsed.data;

    if (lead.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.LEAD_TO_EMAIL?.trim() || "dinerodormido@gmail.com";
    const fromEmail = process.env.LEAD_FROM_EMAIL?.trim() || "Dinero Dormido <onboarding@resend.dev>";

    if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
      console.error("Missing or invalid lead form environment variables", {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasSupabaseServiceRoleKey: Boolean(supabaseServiceRoleKey),
        hasResendApiKey: Boolean(resendApiKey),
      });
      return NextResponse.json(
        { success: false, error: "Configuración incompleta" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const payload = {
      nombre: lead.nombre.trim(),
      empresa: lead.empresa.trim(),
      email: lead.email.trim().toLowerCase(),
      telefono: optionalText(lead.telefono),
      sector: optionalText(lead.sector),
      preocupacion: lead.preocupacion.trim(),
      mensaje: optionalText(lead.mensaje),
      source: "dinerodormido.com",
      status: "nuevo",
      user_agent: request.headers.get("user-agent"),
      ip_address: getIpAddress(request),
    };

    const { error: insertError } = await supabase.from("leads").insert(payload);

    if (insertError) {
      console.error("Supabase lead insert failed", insertError);
      return NextResponse.json(
        { success: false, error: "No se pudo guardar el lead" },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const sentAt = new Date().toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Madrid",
    });

    const { error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject: `Nuevo lead de Dinero Dormido: ${payload.empresa}`,
      html: `
        <div style="margin:0;padding:28px;background:#E6FAFC;font-family:Inter,Arial,sans-serif;color:#334155;">
          <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border-radius:20px;border:1px solid #D9E5EC;overflow:hidden;">
            <div style="padding:24px 28px;border-top:6px solid #00A7B5;">
              <p style="margin:0 0 8px;color:#00A7B5;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">Dinero Dormido</p>
              <h1 style="margin:0;color:#08265C;font-size:26px;line-height:1.2;">Nuevo lead de Dinero Dormido</h1>
            </div>
            <div style="padding:0 28px 28px;">
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                ${[
                  ["Nombre", payload.nombre],
                  ["Empresa", payload.empresa],
                  ["Email", payload.email],
                  ["Teléfono", payload.telefono],
                  ["Sector", payload.sector],
                  ["Preocupación principal", payload.preocupacion],
                  ["Mensaje", payload.mensaje],
                  ["Fecha de envío", sentAt],
                  ["Origen", "Landing dinerodormido.com"],
                ]
                  .map(
                    ([label, value]) => `
                      <tr>
                        <td style="padding:13px 0;border-top:1px solid #D9E5EC;color:#08265C;font-weight:800;width:190px;vertical-align:top;">${escapeHtml(label)}</td>
                        <td style="padding:13px 0;border-top:1px solid #D9E5EC;color:#334155;line-height:1.55;">${escapeHtml(value) || "-"}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </table>
              <a href="mailto:${encodeURIComponent(payload.email)}" style="display:inline-block;margin-top:22px;background:#00A7B5;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:13px 18px;font-weight:800;">Responder a ${escapeHtml(payload.email)}</a>
            </div>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend lead email failed", emailError);
      return NextResponse.json(
        { success: false, error: "No se pudo enviar el email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead form request failed", error);
    return NextResponse.json(
      { success: false, error: "Error inesperado" },
      { status: 500 },
    );
  }
}
