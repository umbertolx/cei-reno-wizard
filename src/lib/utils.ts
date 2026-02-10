import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date as short string (DD/MM/YYYY)
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Format date with time (DD/MM/YYYY, HH:MM)
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Get initials from name and surname (e.g., "John Doe" -> "JD")
 */
export function getInitials(nome: string, cognome: string): string {
  return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
}
