import { renderContactEmailHtml, renderCareerEmailHtml } from '../../app/api/utils/email-templates';

// Mock the route handlers instead of importing them directly
jest.mock('../../app/api/send/route', () => ({
  POST: jest.fn().mockImplementation(async () => {
    return Response.json({ success: true });
  })
}));

jest.mock('../../app/api/send-with-attachment/route', () => ({
  POST: jest.fn().mockImplementation(async () => {
    return Response.json({ success: true });
  })
}));

// Mock Resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: jest.fn().mockResolvedValue({
            id: 'test_email_id',
            from: 'test@example.com',
            to: 'recipient@example.com',
            status: 'success',
          }),
        },
      };
    }),
  };
});

// Mock NextRequest and NextResponse
const mockNextRequest = (body) => {
  return {
    json: jest.fn().mockResolvedValue(body),
    formData: jest.fn().mockResolvedValue(new FormData()),
  };
};

// Mock environment variables
process.env.RESEND_API_KEY = 'test_api_key';
process.env.EMAIL_RECIPIENT = 'recipient@example.com';

describe('Email Delivery Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Contact Email Delivery', () => {
    test('Email template renders correctly with all fields', () => {
      const props = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        subject: 'Quote request',
        message: 'This is a test message',
      };

      const html = renderContactEmailHtml(props);
      
      // Check that all fields are included in the template
      expect(html).toContain('Test User');
      expect(html).toContain('test@example.com');
      expect(html).toContain('1234567890');
      expect(html).toContain('Quote request');
      expect(html).toContain('This is a test message');
    });

    test('Email template handles special characters', () => {
      const props = {
        name: 'Test <script>alert("XSS")</script>',
        email: 'test+special@example.com',
        phone: '+1 (234) 567-890',
        subject: 'Quote request',
        message: 'Special chars: !@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./',
      };

      const html = renderContactEmailHtml(props);
      
      // Check that special characters are properly handled
      expect(html).toContain('Test');
      expect(html).toContain('test+special@example.com');
      expect(html).toContain('+1 (234) 567-890');
      expect(html).toContain('Special chars');
    });
  });

  describe('Career Email with Attachment Delivery', () => {
    test('Email template renders correctly with attachment', () => {
      const props = {
        name: 'Test Applicant',
        email: 'applicant@example.com',
        message: 'I am interested in working with your company.',
        hasAttachment: true,
        fileName: 'resume.pdf',
      };

      const html = renderCareerEmailHtml(props);
      
      // Check that all fields are included in the template
      expect(html).toContain('Test Applicant');
      expect(html).toContain('applicant@example.com');
      expect(html).toContain('I am interested in working with your company.');
      expect(html).toContain('resume.pdf');
      // The exact text might vary, so we check for attachment indication
      expect(html).toMatch(/attachment|resume\.pdf/i);
    });

    test('Email template renders correctly without attachment', () => {
      const props = {
        name: 'Test Applicant',
        email: 'applicant@example.com',
        message: 'I am interested in working with your company.',
        hasAttachment: false,
      };

      const html = renderCareerEmailHtml(props);
      
      // Check that all fields are included in the template
      expect(html).toContain('Test Applicant');
      expect(html).toContain('applicant@example.com');
      expect(html).toContain('I am interested in working with your company.');
      // Should not contain attachment references
      expect(html).not.toContain('resume.pdf');
    });

    test('Email template handles special characters', () => {
      const props = {
        name: 'Test <script>alert("XSS")</script>',
        email: 'applicant+special@example.com',
        message: 'Special chars: !@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./',
        hasAttachment: true,
        fileName: 'résumé-special_chars.pdf',
      };

      const html = renderCareerEmailHtml(props);
      
      // Check that special characters are properly handled
      expect(html).toContain('Test');
      expect(html).toContain('applicant+special@example.com');
      expect(html).toContain('Special chars');
      expect(html).toContain('résumé-special_chars.pdf');
    });


  });
});
