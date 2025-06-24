import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  // Ensure all relevant paths are included for purging unused CSS
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Optionally, add a safelist for any dynamic classes
  safelist: [
    'bg-primary', 'text-primary', 'bg-muted', 'text-muted-foreground',
    'bg-card', 'border-border', 'bg-background', 'text-foreground',
    'from-black/80', 'to-transparent', 'via-transparent',
    'bg-primary/10', 'bg-primary/20', 'bg-background/90',
    'bg-black/20', 'bg-black/10', 'bg-red-500', 'text-white',
    'shadow-lg', 'rounded-2xl', 'rounded-full', 'backdrop-blur-sm',
    'hover:text-primary', 'hover:bg-background', 'hover:bg-muted/80',
    'hover:text-foreground', 'hover:bg-background', 'hover:bg-primary',
    'hover:text-primary', 'hover:bg-muted', 'hover:bg-primary/10',
    'hover:bg-primary/20', 'hover:bg-black/20', 'hover:bg-black/10',
    'hover:bg-red-500', 'hover:text-white', 'hover:shadow-lg',
    'hover:rounded-2xl', 'hover:rounded-full', 'hover:backdrop-blur-sm',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
