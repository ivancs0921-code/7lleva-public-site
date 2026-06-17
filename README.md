# 7Lleva Public Site

Página pública oficial de 7Lleva preparada para Cloudflare Pages.

Este proyecto es independiente de la app principal de 7Lleva. No contiene backend, pagos, Google Maps, Mercado Pago, base de datos ni archivos internos de la app móvil.

## Stack

- Vite
- React
- TypeScript
- CSS limpio sin dependencias visuales
- Sitio estático
- Build output: `dist`

## Contenido

- Inicio
- Pasajeros
- Conductores
- Zonas de servicio
- Soporte y contacto
- Aviso de privacidad
- Términos y condiciones
- Política de cancelaciones y reembolsos
- Eliminación de cuenta

## Estado de lanzamiento

Los textos usan lenguaje prudente:

- Próximamente
- Estamos preparando el lanzamiento
- Etapa inicial
- Servicio en preparación

No se afirma que la app ya esté publicada ni que el servicio esté disponible en todas las zonas.

## Identidad y contactos

- Marca: 7Lleva
- Slogan: Sí te lleva
- Dominio principal previsto: `7lleva.com`
- Correos genéricos:
  - `soporte@7lleva.com`
  - `contacto@7lleva.com`
  - `legal@7lleva.com`

No se incluyen datos personales, domicilio personal, teléfono personal, claves, API keys ni archivos `.env`.

## Instalación

```powershell
cd 7Lleva-public-site
npm install
```

## Desarrollo local

```powershell
npm run dev
```

## Compilar

```powershell
npm run build
```

El resultado queda en:

```text
dist/
```

## Validar

```powershell
npm run check
```

## Cloudflare Workers Static Assets

Configuración recomendada:

- Framework preset: `Vite` o `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: raíz del repositorio de este proyecto
- Production domain: `7lleva.com`

La URL temporal `workers.dev` debe usarse solo para pruebas internas de despliegue. No debe compartirse públicamente ni usarse como dominio oficial de 7Lleva.

## Dominios

Dominio principal:

- `7lleva.com`

Dominios a redireccionar después:

- `7lleva.mx`
- `7lleva.com.mx`

No configurar DNS desde este proyecto. Las redirecciones deben hacerse en Cloudflare cuando los dominios estén listos.

## Seguridad pública

El archivo `public/_headers` incluye:

- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Strict-Transport-Security` sin `preload`

## Pendientes antes de publicar

- Activar `soporte@7lleva.com`, `contacto@7lleva.com` y `legal@7lleva.com`.
- Revisar documentos legales con abogado.
- Revisar implicaciones fiscales/contables con contador.
- Confirmar fecha de publicación.
- Confirmar zonas reales activas.
- Confirmar disponibilidad pública de la app.
- Ajustar textos si el servicio todavía no está publicado.
