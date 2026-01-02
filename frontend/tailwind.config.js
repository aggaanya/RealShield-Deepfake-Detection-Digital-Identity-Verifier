/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // RealShield custom colors
        shield: {
          50:  "#eef7ff",
          100: "#d9edff",
          200: "#bce0ff",
          300: "#8acbff",
          400: "#4eabff",
          500: "#2689fb", // Primary brand blue
          600: "#106ae8",
          700: "#0f52cf",
          800: "#1444a7",
          900: "#173c83",
          950: "#12275a",
        },
        trust: {
          50:  "#eefdf6",
          100: "#d7f9ea",
          200: "#b1f1d6",
          300: "#7be4be",
          400: "#3ecfa1", // Success green
          500: "#1cb784",
          600: "#0e936b",
          700: "#0d7457",
          800: "#0f5c47",
          900: "#104c3c",
          950: "#062b23",
        },
        alert: {
          50:  "#fef3f3",
          100: "#ffe4e4",
          200: "#ffcfcf",
          300: "#fea6a6",
          400: "#fb6d6d",
          500: "#f13f3f", // Danger red
          600: "#db1e1e",
          700: "#c01919",
          800: "#9d1818",
          900: "#831a1a",
          950: "#470808",
        },
        neutral: {
          50:  "#f8f8f8",
          100: "#f0f0f0",
          200: "#e6e6e6",
          300: "#d1d1d1",
          400: "#b0b0b0",
          500: "#8f8f8f", // Gray
          600: "#757575",
          700: "#5c5c5c",
          800: "#3f3f3f",
          900: "#292929",
          950: "#171717",
        },
        // Tech theme colors
        tech: {
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
            950: "#172554",
          },
          indigo: {
            50: "#eef2ff",
            100: "#e0e7ff", 
            200: "#c7d2fe",
            300: "#a5b4fc",
            400: "#818cf8",
            500: "#6366f1",
            600: "#4f46e5",
            700: "#4338ca",
            800: "#3730a3",
            900: "#312e81",
            950: "#1e1b4b",
          },
          purple: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7e22ce",
            800: "#6b21a8",
            900: "#581c87",
            950: "#3b0764",
          },
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-shield": {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 hsla(213, 96%, 58%, 0.4)'
          },
          '50%': { 
            boxShadow: '0 0 0 15px hsla(213, 96%, 58%, 0)'
          }
        },
        "float": {
          '0%, 100%': { 
            transform: 'translateY(0)'
          },
          '50%': { 
            transform: 'translateY(-10px)'
          }
        },
        "scanning": {
          '0%': {
            backgroundPosition: '0% 0%'
          },
          '100%': {
            backgroundPosition: '100% 100%'
          }
        },
        "gradient": {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        },
        "shine": {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        },
        "pulse-tech": {
          '0%, 100%': {
            opacity: 0.6,
            transform: 'scale(1)'
          },
          '50%': {
            opacity: 0.9,
            transform: 'scale(1.05)'
          }
        },
        "grid-lines": {
          '0%': {
            backgroundPosition: '0 0'
          },
          '100%': {
            backgroundPosition: '100% 100%'
          }
        },
        "radar-scan": {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        "ping-slow": {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0
          }
        },
        "bounce-subtle": {
          '0%, 100%': { 
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-shield": "pulse-shield 2s infinite",
        "float": "float 6s ease-in-out infinite",
        "scanning": "scanning 2s ease-in-out infinite alternate",
        "gradient": "gradient 8s ease infinite",
        "shine": "shine 3s linear infinite",
        "pulse-tech": "pulse-tech 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "grid-lines": "grid-lines 20s linear infinite",
        "radar-scan": "radar-scan 4s linear infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "bounce-subtle": "bounce-subtle 3s ease-in-out infinite",
      },
      backgroundSize: {
        'size-200': '200% 200%',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
