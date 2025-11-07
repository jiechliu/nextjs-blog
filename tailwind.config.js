/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            fontSize: '16px',
            h1: {
              fontSize: '2.25rem',
              fontWeight: '700',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
            },
            p: {
              marginBottom: '1.25rem',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}