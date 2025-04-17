import { createHash } from 'crypto-js/sha256';

/**
 * Get user initials from email or name
 */
export const getUserInitials = (text: string): string => {
  if (!text) return '?';
  
  // If it's an email, use first part before @
  if (text.includes('@')) {
    const name = text.split('@')[0];
    // If name has dots or underscores, treat them as separators
    if (name.includes('.') || name.includes('_')) {
      const parts = name.split(/[._]/);
      return parts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
    }
    // Just use first two chars of email name
    return name.substring(0, 2).toUpperCase();
  }
  
  // Otherwise use first letters of each word
  const parts = text.split(' ');
  return parts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
};

/**
 * Get Gravatar URL for an email
 */
export const getGravatarUrl = (email: string): string => {
  if (!email) return '';
  
  // Trim and lowercase the email as per Gravatar specs
  const normalizedEmail = email.trim().toLowerCase();
  
  // Create MD5 hash of the normalized email
  const hash = createHash(normalizedEmail).toString();
  
  // Return Gravatar URL with the hash
  return `https://www.gravatar.com/avatar/${hash}?d=mp&s=80`;
};
