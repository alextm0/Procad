import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import { ContactEmailTemplate, CareerEmailTemplate } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, formData, to } = body;
    
    let subject, emailContent;
    
    if (formType === 'contact') {
      subject = `Contact Form Submission from ${formData.name}`;
      emailContent = ContactEmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'Not provided',
        message: formData.message,
      });
    } else if (formType === 'career') {
      subject = `Career Application from ${formData.name}`;
      emailContent = CareerEmailTemplate({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        fileUrl: formData.fileUrl || '',
        fileName: formData.fileName || '',
        hasAttachment: formData.hasAttachment || false,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }

    // Set up the recipient email from environment variable with fallback
    const defaultRecipient = process.env.EMAIL_RECIPIENT;
    if (!defaultRecipient) {
      return NextResponse.json(
        { error: 'EMAIL_RECIPIENT environment variable is not set' },
        { status: 500 }
      );
    }

    const recipient = to || defaultRecipient;

    const data = await resend.emails.send({
      from: 'Procad Website <onboarding@resend.dev>', // You can change this to your verified domain later
      to: recipient,
      subject: subject,
      react: emailContent as React.ReactNode, // Type assertion to fix TypeScript error
      // You can add CC or BCC if needed
      // cc: ['team@procad.ro'],
    });

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
