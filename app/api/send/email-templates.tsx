import * as React from 'react';

export interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailProps> = ({
  name,
  email,
  phone,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ background: '#1e3a8a', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0' }}>New Contact Form Submission</h1>
    </div>
    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderTop: 'none' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#374151' }}>
        You have received a new message from the contact form on your website.
      </p>
      <div style={{ marginTop: '24px', background: '#f9fafb', padding: '16px', borderRadius: '4px' }}>
        <p style={{ margin: '8px 0', color: '#374151' }}><strong>Name:</strong> {name}</p>
        <p style={{ margin: '8px 0', color: '#374151' }}><strong>Email:</strong> {email}</p>
        <p style={{ margin: '8px 0', color: '#374151' }}><strong>Phone:</strong> {phone}</p>
        <p style={{ margin: '8px 0', color: '#374151' }}><strong>Subject:</strong> {subject}</p>
        <div style={{ margin: '16px 0' }}>
          <p style={{ margin: '0 0 8px 0', color: '#374151' }}><strong>Message:</strong></p>
          <div style={{ background: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            {message.split('\n').map((line, i) => (
              <p key={i} style={{ margin: '8px 0', color: '#4b5563' }}>{line}</p>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '24px', borderTop: '1px solid #e5e7eb', paddingTop: '16px', color: '#6b7280', fontSize: '14px' }}>
        <p>This email was sent from the Procad website contact form.</p>
      </div>
    </div>
  </div>
);

export interface CareerEmailProps {
  name: string;
  email: string;
  message: string;
  fileUrl?: string;
  fileName?: string;
  hasAttachment?: boolean;
}

export const CareerEmailTemplate: React.FC<CareerEmailProps> = ({
  name,
  email,
  message,
  fileUrl,
  fileName,
  hasAttachment,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ background: '#1e3a8a', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ margin: '0' }}>New Career Application</h1>
    </div>
    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderTop: 'none' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#374151' }}>
        You have received a new career application from your website.
      </p>
      <div style={{ marginTop: '24px', background: '#f9fafb', padding: '16px', borderRadius: '4px' }}>
        <p style={{ margin: '8px 0', color: '#374151' }}><strong>Name:</strong> {name}</p>
        <p style={{ margin: '8px 0', color: '#374151' }}><strong>Email:</strong> {email}</p>
        <div style={{ margin: '16px 0' }}>
          <p style={{ margin: '0 0 8px 0', color: '#374151' }}><strong>Message:</strong></p>
          <div style={{ background: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            {message.split('\n').map((line, i) => (
              <p key={i} style={{ margin: '8px 0', color: '#4b5563' }}>{line}</p>
            ))}
          </div>
        </div>
        {hasAttachment && fileUrl && fileName ? (
          <div style={{ margin: '16px 0', background: '#f0f9ff', padding: '12px', borderRadius: '4px', border: '1px solid #bae6fd' }}>
            <p style={{ margin: '0 0 8px 0', color: '#0369a1' }}><strong>Attachment:</strong></p>
            <p style={{ margin: '8px 0', color: '#0369a1' }}>
              <strong>File:</strong> {fileName}
            </p>
            <p style={{ margin: '8px 0' }}>
              <a 
                href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${fileUrl}`} 
                style={{ 
                  display: 'inline-block', 
                  padding: '8px 16px', 
                  background: '#0284c7', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                Download File
              </a>
            </p>
          </div>
        ) : (
          <p style={{ margin: '16px 0', color: '#6b7280', fontStyle: 'italic' }}>
            <strong>Note:</strong> No CV attachment was included with this application.
          </p>
        )}
      </div>
      <div style={{ marginTop: '24px', borderTop: '1px solid #e5e7eb', paddingTop: '16px', color: '#6b7280', fontSize: '14px' }}>
        <p>This email was sent from the Procad website career application form.</p>
      </div>
    </div>
  </div>
);
