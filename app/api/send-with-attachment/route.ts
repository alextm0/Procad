import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderContactEmailHtml, renderCareerEmailHtml } from '../utils/email-templates';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const formType = formData.get('formType') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const phone = formData.get('phone') as string || '';
    const subject = formData.get('subject') as string || '';
    
    // Get the file if it exists
    const file = formData.get('file') as File | null;
    
    // Validate required fields
    if (!formType || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email recipient
    const recipient = process.env.EMAIL_RECIPIENT;
    if (!recipient) {
      return NextResponse.json(
        { error: 'EMAIL_RECIPIENT environment variable is not set' },
        { status: 500 }
      );
    }
    
    // Set up email options
    let emailSubject = '';
    let emailHtml = '';
    let attachments = [] as any[];
    
    // Prepare email content based on form type
    if (formType === 'contact') {
      emailSubject = `Contact Form Submission from ${name}`;
      
      // Render the contact email template using HTML template
      emailHtml = renderContactEmailHtml({
        name,
        email,
        phone: phone || 'Not provided',
        subject: subject || 'Not provided',
        message
      });
    } 
    else if (formType === 'career') {
      emailSubject = `Career Application from ${name}`;
      
      // Render the career email template using HTML template
      emailHtml = renderCareerEmailHtml({
        name,
        email,
        message,
        hasAttachment: !!file
      });
      
      // Add file attachment if it exists
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        
        attachments.push({
          filename: file.name,
          content: buffer
        });
      }
    } 
    else {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }
    
    // Prepare attachments for Resend in base64 format
    const resendAttachments = [];
    
    if (attachments.length > 0) {
      for (const attachment of attachments) {
        // Convert buffer to base64
        const base64Content = attachment.content.toString('base64');
        
        resendAttachments.push({
          filename: attachment.filename,
          content: base64Content
        });
      }
    }
    
    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'Procad Website <onboarding@resend.dev>', // You can change this to your verified domain later
      to: recipient,
      subject: emailSubject,
      html: emailHtml,
      attachments: resendAttachments,
      replyTo: email // Set reply-to to the form submitter's email
    });
    
    console.log('Email sent successfully:', data);
    
    return NextResponse.json({ 
      success: true, 
      data: data 
    });
  } 
  catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
