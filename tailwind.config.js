/**
 * tailwind.config.js — Makkah Tech | Shared Tailwind CDN Config
 * Loaded via <script src="tailwind.config.js"></script> after the CDN script.
 * Replaces all inline tailwind.config = {} blocks across every page.
 */
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#f0f4ff',
                    100: '#e0e9ff',
                    200: '#c1d3ff',
                    300: '#92b2ff',
                    400: '#5c8aff',
                    500: '#2550ff',
                    600: '#1a3de6',
                    700: '#152fb3',
                    800: '#12268f',
                    900: '#112273',
                    950: '#0a1144',
                },
                accent: {
                    gold: '#FFD700',
                    cyan: '#00F5FF',
                    neon: '#39FF14',
                },
                dark: {
                    bg:      '#020617',
                    card:    '#0f172a',
                    surface: '#1e293b',
                    text:    '#f1f5f9',
                },
                light: {
                    bg:      '#f8fafc',
                    card:    '#ffffff',
                    surface: '#f1f5f9',
                    text:    '#0f172a',
                },
            },
            fontFamily: {
                sans:    ['Outfit', 'sans-serif'],
                arabic:  ['El Messiri', 'IBM Plex Sans Arabic', 'sans-serif'],
            },
            animation: {
                'gradient':    'gradient 8s linear infinite',
                'float':       'float 6s ease-in-out infinite',
                'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                    '50%':      { 'background-size': '200% 200%', 'background-position': 'right center' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%':      { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [
        function({ addVariant }) {
            addVariant('light', '.light &');
        },
    ],
};
