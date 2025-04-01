
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// DuoMate custom colors
				duoblue: {
					DEFAULT: '#3B82F6',
					50: '#EBF2FF',
					100: '#D7E6FF',
					200: '#B0CFFF',
					300: '#88B8FF',
					400: '#61A1FF',
					500: '#3B82F6',
					600: '#0A5CE8',
					700: '#0748B5',
					800: '#053582',
					900: '#02214F',
				},
				duopurple: {
					DEFAULT: '#8B5CF6',
					50: '#F3EEFF',
					100: '#E9DDFF',
					200: '#D0BBFF',
					300: '#B799FF',
					400: '#9E77FF',
					500: '#8B5CF6',
					600: '#6B2EF5',
					700: '#5011DD',
					800: '#3B0CA5',
					900: '#27086D',
				},
				duodark: {
					DEFAULT: '#121212',
					50: '#404040',
					100: '#363636',
					200: '#2C2C2C',
					300: '#232323',
					400: '#1A1A1A',
					500: '#121212',
					600: '#0A0A0A',
					700: '#070707',
					800: '#030303',
					900: '#000000',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(139, 92, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.2)',
						opacity: '0.8'
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(139, 92, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)',
						opacity: '1' 
					},
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-up': 'scale-up 0.5s ease-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-duoblue': 'linear-gradient(90deg, #3B82F6, #60A5FA)',
				'gradient-duopurple': 'linear-gradient(90deg, #8B5CF6, #A78BFA)',
				'gradient-duo': 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
				'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			boxShadow: {
				'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
				'glow-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
				'glow-duo': '0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.3)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
