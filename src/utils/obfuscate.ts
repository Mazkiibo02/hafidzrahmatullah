/**
 * Decodes/Encodes a string using ROT13 cipher.
 * Only rotates alphabetical characters (A-Z, a-z).
 */
export function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const charCode = char.charCodeAt(0);
    const start = charCode <= 90 ? 65 : 97;
    return String.fromCharCode(((charCode - start + 13) % 26) + start);
  });
}

/**
 * Obfuscated email address using ROT13.
 */
export const OBFUSCATED_EMAIL = "iqm.enpu02@tznvy.pbz";

/**
 * Returns the decoded email address.
 */
export function getEmail(): string {
  return rot13(OBFUSCATED_EMAIL);
}
