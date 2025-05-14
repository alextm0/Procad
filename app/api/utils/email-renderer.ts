// This file contains server-only utilities for email rendering
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import type { ContactEmailProps, CareerEmailProps } from '../send/email-templates';

// Import the email templates as types only
import type { ContactEmailTemplate as ContactEmailTemplateType, CareerEmailTemplate as CareerEmailTemplateType } from '../send/email-templates';

// Server-side only rendering functions
export async function renderContactEmail(props: ContactEmailProps): Promise<string> {
  // Dynamically import the component to avoid client-side imports
  const { ContactEmailTemplate } = await import('../send/email-templates');
  return renderToString(createElement(ContactEmailTemplate, props));
}

export async function renderCareerEmail(props: CareerEmailProps): Promise<string> {
  // Dynamically import the component to avoid client-side imports
  const { CareerEmailTemplate } = await import('../send/email-templates');
  return renderToString(createElement(CareerEmailTemplate, props));
}
