import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { 'min': '432px', 'max': '459px' },
        'xxs':  { 'min': '400px', 'max': '431px' },
        'sssm':  { 'min': '460px', 'max': '519px' },
        'ssm':  { 'min': '520px', 'max': '639px' },
      },
    },
  },

  plugins: [],
} satisfies Config;
