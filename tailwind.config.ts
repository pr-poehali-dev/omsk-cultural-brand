import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['"Playfair Display"', 'serif'],
				body: ['"Montserrat"', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				gold: {
					DEFAULT: '#FFD700',
					light: '#FFE566',
					dark: '#CC9900',
				},
				omsk: {
					deep: '#060e1e',
					navy: '#0a1428',
					blue: '#1a2a4a',
					sky: '#1a0a3e',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-left': {
					from: { opacity: '0', transform: 'translateX(-60px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-right': {
					from: { opacity: '0', transform: 'translateX(60px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'float-city': {
					'0%, 100%': { transform: 'translateY(0px) scale(1.05)' },
					'50%': { transform: 'translateY(-18px) scale(1.07)' },
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'33%': { transform: 'translateY(-10px) translateX(5px)' },
					'66%': { transform: 'translateY(5px) translateX(-3px)' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 15px rgba(255,200,50,0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(255,200,50,0.7)' },
				},
				'ripple': {
					'0%': { transform: 'scale(1)', opacity: '0.8' },
					'100%': { transform: 'scale(3)', opacity: '0' },
				},
				'star-twinkle': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.3)' },
				},
				'aurora': {
					'0%, 100%': { opacity: '0.15' },
					'50%': { opacity: '0.35' },
				},
				'banner-glow': {
					'0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(255,200,50,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.6))' },
					'50%': { filter: 'drop-shadow(0 0 40px rgba(255,200,50,0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.6))' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.9s ease-out forwards',
				'fade-in': 'fade-in 1s ease-out forwards',
				'slide-left': 'slide-left 0.8s ease-out forwards',
				'slide-right': 'slide-right 0.8s ease-out forwards',
				'float-city': 'float-city 8s ease-in-out infinite',
				'float-slow': 'float-slow 12s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
				'ripple': 'ripple 2s ease-out infinite',
				'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
				'aurora': 'aurora 5s ease-in-out infinite',
				'banner-glow': 'banner-glow 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
