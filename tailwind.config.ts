import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mintgreen: '#afcc54'
      }
    },
  },
  plugins: [],
} satisfies Config;
