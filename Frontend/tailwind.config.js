import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scrollBack: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-3000% 0" },
        },
        scrollFront: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "5000% 0" },
        },
      },

      animation: {
        scrollBack: "scrollBack 200s linear infinite",
        scrollFront: "scrollFront 200s linear infinite",
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      backgroundImage: (theme) => ({
        "login-background": "url('./assets/login_bg.jpeg')",
      }),
      colors: {
        primary: "#065D2F",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#065D2F",
        },
      },
    ],
  },
};
