import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		screens:{
			'txl':'1308px'
		},
		fontFamily: {
			inter: ['var(--font-inter)'],
			'editorial-new': ['var(--font-editorial-new)']
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(-10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-5px)' }
  			},
  			'shimmer': {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' }
  			},
  			'glow': {
  				'0%, 100%': { 
  					'box-shadow': '0 0 20px 2px rgba(139, 92, 246, 0.3)',
  					transform: 'scale(1)'
  				},
  				'50%': { 
  					'box-shadow': '0 0 30px 4px rgba(139, 92, 246, 0.5)',
  					transform: 'scale(1.01)'
  				}
  			},
  			'bounce-gentle': {
  				'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
  				'50%': { transform: 'translateY(-3px) rotate(1deg)' }
  			},
  			'slide-in': {
  				'0%': { transform: 'translateX(-200%) translateY(-50%)', opacity: '0' },
  				'100%': { transform: 'translateX(-50%) translateY(0)', opacity: '1' }
  			},
  			'shimmer-gold': {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' }
  			},
  			'pulse-subtle': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.8' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'float': 'float 3s ease-in-out infinite',
  			'shimmer': 'shimmer 2s infinite',
  			'glow': 'glow 4s ease-in-out infinite',
  			'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
  			'slide-in': 'slide-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  			'shimmer-gold': 'shimmer-gold 2s ease-in-out infinite',
  			'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
