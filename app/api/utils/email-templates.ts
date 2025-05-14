// Simple HTML email templates without React dependencies

export interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function renderContactEmailHtml(props: ContactEmailProps): string {
  const { name, email, phone, subject, message } = props;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f7fa; min-width: 100%; padding: 20px 0;">
        <tr>
          <td align="center" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <tr>
                <td align="center" valign="middle" style="background-color: #1e3a8a; padding: 30px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px 30px 20px;">
                  <p style="margin: 0 0 20px; font-size: 16px; color: #4a5568;">
                    You have received a new message from the contact form on your website.
                  </p>
                  
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 15px; color: #4a5568;"><strong style="color: #2d3748; font-weight: 600;">Name:</strong> ${name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 15px; color: #4a5568;"><strong style="color: #2d3748; font-weight: 600;">Email:</strong> <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 15px; color: #4a5568;"><strong style="color: #2d3748; font-weight: 600;">Phone:</strong> ${phone}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 15px; color: #4a5568;"><strong style="color: #2d3748; font-weight: 600;">Subject:</strong> ${subject}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0 5px;">
                              <p style="margin: 0 0 10px; font-size: 15px; color: #2d3748; font-weight: 600;">Message:</p>
                              <div style="background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0; padding: 15px;">
                                ${message.split('\n').map(line => `<p style="margin: 0 0 10px; font-size: 15px; color: #4a5568;">${line}</p>`).join('')}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; color: #718096;">
                          This email was sent from the Procad website contact form.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export interface CareerEmailProps {
  name: string;
  email: string;
  message: string;
  hasAttachment?: boolean;
  fileName?: string;
}

export function renderCareerEmailHtml(props: CareerEmailProps): string {
  const { name, email, message, hasAttachment, fileName } = props;
  
  const attachmentSection = hasAttachment && fileName
    ? `
      <tr>
        <td style="padding: 15px 0 5px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ebf8ff; border-radius: 6px; border: 1px solid #bee3f8; margin-top: 10px;">
            <tr>
              <td style="padding: 15px;">
                <p style="margin: 0 0 10px; font-size: 15px; color: #2b6cb0; font-weight: 600;">Attachment:</p>
                <p style="margin: 0; font-size: 15px; color: #2c5282;">
                  <strong style="font-weight: 600;">File:</strong> ${fileName}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    : `
      <tr>
        <td style="padding: 15px 0 5px;">
          <p style="margin: 0; font-size: 14px; color: #718096; font-style: italic;">
            <strong>Note:</strong> No CV attachment was included with this application.
          </p>
        </td>
      </tr>
    `;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Career Application</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f7fa; min-width: 100%; padding: 20px 0;">
        <tr>
          <td align="center" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <tr>
                <td align="center" valign="middle" style="background-color: #1e3a8a; padding: 30px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Career Application</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px 30px 20px;">
                  <p style="margin: 0 0 20px; font-size: 16px; color: #4a5568;">
                    You have received a new career application from your website.
                  </p>
                  
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 15px; color: #4a5568;"><strong style="color: #2d3748; font-weight: 600;">Name:</strong> ${name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 15px; color: #4a5568;"><strong style="color: #2d3748; font-weight: 600;">Email:</strong> <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0 5px;">
                              <p style="margin: 0 0 10px; font-size: 15px; color: #2d3748; font-weight: 600;">Message:</p>
                              <div style="background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0; padding: 15px;">
                                ${message.split('\n').map(line => `<p style="margin: 0 0 10px; font-size: 15px; color: #4a5568;">${line}</p>`).join('')}
                              </div>
                            </td>
                          </tr>
                          ${attachmentSection}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; color: #718096;">
                          This email was sent from the Procad website career application form.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
