import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock environment variables
process.env = {
  ...process.env,
  RESEND_API_KEY: 'test_api_key',
  EMAIL_RECIPIENT: 'test@example.com',
};

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt || ''} {...props} />;
  },
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

// Setup mock for FormData
global.FormData = class {
  constructor() {
    this.data = {};
  }
  append(key, value) {
    this.data[key] = value;
  }
  get(key) {
    return this.data[key];
  }
  getAll(key) {
    return [this.data[key]];
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }
  delete(key) {
    delete this.data[key];
  }
  entries() {
    return Object.entries(this.data);
  }
};

// Mock File API
global.File = class {
  constructor(bits, name, options = {}) {
    this.name = name;
    this.size = bits.length;
    this.type = options.type || '';
  }
  arrayBuffer() {
    return Promise.resolve(new ArrayBuffer(this.size));
  }
  text() {
    return Promise.resolve(bits.join(''));
  }
};

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn((key) => (key === 'language' ? 'en' : null)),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

// Mock window.addEventListener for language change
window.addEventListener = jest.fn((event, callback) => {
  if (event === 'languageChange') {
    callback();
  }
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch.mockClear();
});

