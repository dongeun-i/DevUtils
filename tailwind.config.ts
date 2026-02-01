// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base
        'bg-root': 'var(--bg-root)',
        'bg-surface': 'var(--bg-surface)',
        'bg-muted': 'var(--bg-muted)',

        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',

        // Brand
        'brand-primary': 'var(--brand-primary)',
        'brand-hover': 'var(--brand-hover)',
        'brand-soft': 'var(--brand-soft)',

        // Accent
        'accent-cyan': 'var(--accent-cyan)',
        'accent-cyan-bg': 'var(--accent-cyan-bg)',

        // State
        'state-success': 'var(--state-success)',
        'state-success-bg': 'var(--state-success-bg)',
        'state-error': 'var(--state-error)',
        'state-error-bg': 'var(--state-error-bg)',
        'state-warning': 'var(--state-warning)',
        'state-warning-bg': 'var(--state-warning-bg)',

        // Border & Divider
        'border-default': 'var(--border-default)',
        'border-focus': 'var(--border-focus)',
      },
    },
  },
  plugins: [],
};
export default config;
