import React from 'react';
import { getEmail } from '@/utils/obfuscate';

interface ObfuscatedEmailProps {
  /**
   * The display text for the email link. 
   * Defaults to the decoded email address if not provided.
   */
  label?: React.ReactNode;
  /**
   * Optional CSS classes for the anchor tag.
   */
  className?: string;
  /**
   * Optional children to render inside the anchor tag.
   * If provided, this overrides the label.
   */
  children?: React.ReactNode;
}

/**
 * A component that renders an email address obfuscated via ROT13
 * to prevent harvesting by scrapers and bots.
 */
export function ObfuscatedEmail({ label, className, children }: ObfuscatedEmailProps) {
  const email = getEmail();

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      title="Send an email"
    >
      {children || label || email}
    </a>
  );
}
