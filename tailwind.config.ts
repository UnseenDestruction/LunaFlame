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
        'xs': { 'min': '426px', 'max': '459px' },
        'xxs':  { 'min': '400px', 'max': '425px' },
        'sssm':  { 'min': '460px', 'max': '478px' },
        'ssmm':  { 'min': '479px', 'max': '519px' },
        'ssm':  { 'min': '520px', 'max': '578px' },
        'sssmm':  { 'min': '579px', 'max': '639px' },
        'mmd':  { 'min': '831px', 'max': '1024px' },
      },
    },
  },

  plugins: [],
} satisfies Config;
