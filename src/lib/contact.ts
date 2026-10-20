/**
 * Contacto: única fuente de verdad del número de WhatsApp Business y utilidades para
 * construir el enlace de forma segura. Lo usan ContactForm, QuickActions y Footer.
 */

// Número en formato internacional sin "+" ni espacios (requisito de api.whatsapp.com).
export const WHATSAPP_NUMBER = "584245535901";
export const COMPANY_NAME = "Dubai Luxury Estates";

/**
 * Sanea texto escrito por el usuario antes de incluirlo en el mensaje: colapsa espacios y limita la longitud.
 * Elimina etiquetas, caracteres de control y símbolos de marcado; limita la longitud. */
export function sanitize(input: string, max = 200): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>`]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/**
 * Enlace universal de WhatsApp (funciona en móvil y escritorio, app o web).
 * El mensaje se codifica con encodeURIComponent para conservar tildes, saltos de línea y símbolos.
 */
export function whatsappUrl(mensaje: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(mensaje)}`;
}
