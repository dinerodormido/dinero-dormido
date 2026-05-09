# Dinero Dormido

Landing page para captar leads de auditorias iniciales de Dinero Dormido.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Crea un archivo `.env.local` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
LEAD_TO_EMAIL=dinerodormido@gmail.com
LEAD_FROM_EMAIL=Dinero Dormido <onboarding@resend.dev>
```

`SUPABASE_SERVICE_ROLE_KEY` y `RESEND_API_KEY` son claves privadas. Solo se usan en `src/app/api/leads/route.ts` y no deben exponerse en componentes cliente.

## Configurar Supabase

1. Crea un proyecto en Supabase.
2. Abre el SQL editor de Supabase.
3. Ejecuta el contenido de `supabase/schema.sql`.
4. Copia `NEXT_PUBLIC_SUPABASE_URL` desde Project Settings > API.
5. Copia `SUPABASE_SERVICE_ROLE_KEY` desde Project Settings > API.
6. No crees politicas publicas de insert/select para `public.leads`: la insercion se hace desde el servidor con service role.

## Configurar Resend

1. Crea una cuenta en Resend.
2. Crea o copia una API key.
3. Anade `RESEND_API_KEY` a `.env.local`.
4. Manten `LEAD_TO_EMAIL=dinerodormido@gmail.com`.
5. Para pruebas puedes usar `LEAD_FROM_EMAIL=Dinero Dormido <onboarding@resend.dev>`.
6. Para produccion, cuando el dominio este verificado en Resend, cambia el remitente por uno del dominio.

## Probar el formulario

1. Ejecuta `npm run dev`.
2. Rellena el formulario de la landing.
3. Comprueba que aparece el mensaje de exito.
4. Comprueba que el lead aparece en Supabase.
5. Comprueba que llega el email a `dinerodormido@gmail.com`.

Si algo falla, el usuario vera un mensaje de error y la ruta API devolvera JSON con `success: false`.

## Vercel

1. En Vercel, abre el proyecto de Dinero Dormido.
2. Ve a Settings > Environment Variables.
3. Anade las mismas variables de `.env.local`.
4. Redeploy del proyecto.
5. Prueba el formulario en produccion desde `https://dinerodormido.com`.

Vercel detecta Next.js automaticamente.

## Estructura relevante

- `src/app/page.tsx`: landing y formulario visual.
- `src/app/LeadFormBridge.tsx`: conecta el formulario existente a `/api/leads` y gestiona estados de envio.
- `src/app/api/leads/route.ts`: validacion, honeypot, insercion en Supabase y envio de email.
- `supabase/schema.sql`: tabla `public.leads` con RLS activado.
