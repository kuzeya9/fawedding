// Vercel Web Analytics initialization
import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject({
  mode: import.meta.env.MODE || 'production',
  debug: false
});
