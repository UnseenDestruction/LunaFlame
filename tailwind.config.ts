import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        orbit1: 'spinOrbit1 4s linear infinite',
        orbit2: 'spinOrbit2 14s linear infinite',
        orbit3: 'spinOrbit3 18s linear infinite',
        orbit4: 'spinOrbit4 22s linear infinite',
        orbit5: 'spinOrbit5 26s linear infinite',
        orbit6: 'spinOrbit6 30s linear infinite',
      },
      keyframes: {
        spinOrbit1: {
          '0%': { transform: ' translateX(0px) rotate(-20deg) ' },
          '5%': { transform: 'translateX(-20px) translateY(20px) rotate(-20deg)' },
          '10%': { transform: 'translateX(-40px) translateY(30px) rotate(-20deg)' },
          '15%': { transform: 'translateX(-30px) translateY(40px) rotate(-20deg)' },
          '20%': { transform: 'translateX(-40px) translateY(55px) rotate(-10deg)' },
          '25%': { transform: 'translateX(-50px) translateY(66px) rotate(-10deg)' },
          '30%': { transform: 'translateX(-70px) translateY(80px) rotate(-10deg)' },
          '35%': { transform: 'translateX(-80px) translateY(90px) rotate(-5deg)' },
          '40%': { transform: 'translateX(-90px) translateY(100px) rotate(-5deg)' },
          '45%': { transform: 'translateX(-100px) translateY(110px) rotate(10deg)' },
          '50%': { transform: 'translateX(-110px) translateY(110px) rotate(10deg)' },
          '55%': { transform: 'translateX(-120px) translateY(110px) rotate(10deg)' },
          '60%': { transform: 'translateX(-130px) translateY(120px) rotate(10deg)' },
          '65%': { transform: 'translateX(-140px) translateY(120px) rotate(10deg)' },
          '70%': { transform: 'translateX(-150px) translateY(130px) rotate(10deg)' },
          '75%': { transform: 'translateX(-160px) translateY(135px) rotate(10deg)' },
          '80%': { transform: 'translateX(-170px) translateY(135px) rotate(30deg)' },
          '85%': { transform: 'translateX(-180px) translateY(135px) rotate(30deg)' },
          '90%': { transform: 'translateX(-190px) translateY(148px) rotate(30deg)' },
          '95%': { transform: 'translateX(-200px) translateY(148px) rotate(30deg)' },
          '100%': { transform: 'translateX(-210px) translateY(148px) rotate(30deg)' },
        },
        spinOrbit2: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        spinOrbit3: {
          '0%': { transform: 'rotate(0deg) translateX(200px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(200px) rotate(-360deg)' },
        },
        spinOrbit4: {
          '0%': { transform: 'rotate(0deg) translateX(250px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(250px) rotate(-360deg)' },
        },
        spinOrbit5: {
          '0%': { transform: 'rotate(0deg) translateX(300px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(300px) rotate(-360deg)' },
        },
        spinOrbit6: {
          '0%': { transform: 'rotate(0deg) translateX(350px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(350px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
