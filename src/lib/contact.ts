export const WHATSAPP_NUMBER = "584245535901";
export const COMPANY_NAME = "Dubai Luxury Estates";

/** Elimina etiquetas, caracteres de control y símbolos de marcado; limita la longitud. */
export function sanitize(input: string, max = 200): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>`]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function whatsappUrl(mensaje: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(mensaje)}`;
}
