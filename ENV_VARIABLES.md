# Environment Variables

This document lists all the environment variables used in the Procad website.

## Required Environment Variables

- `RESEND_API_KEY`: Your Resend API key for sending emails (used for contact form)
- `EMAIL_RECIPIENT`: The email address that will receive form submissions
- `EMAIL_PASSWORD`: The password for the email account specified in EMAIL_RECIPIENT (used for sending attachments)

## How to Set Up

1. Create a `.env` file in the root of the project
2. Add the environment variables listed above with their values
3. Restart the development server if it's running

Example `.env` file:
```
RESEND_API_KEY=your_resend_api_key_here
EMAIL_RECIPIENT=your_email@example.com
```

## Notes

- For development and testing, you can use your personal email as the `EMAIL_RECIPIENT`
- For production, make sure to use the company's official email address
- The Resend API key should be kept secret and not committed to version control
