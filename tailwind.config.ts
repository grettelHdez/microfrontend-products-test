import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        sky: "#1677ff",
      },

      width: {
        450: "450px",
        500: "500px",
        520: "520px",
        550: "550px",
        "60%": "40%",
      },

      height: {
        450: "450px",
        500: "500px",
        520: "520px",
        550: "550px",
        623: "623px",
      },

      maxWidth: {
        450: "450px",
      },

      maxHeight: {
        623: "623px",
      },
    },
  },
  plugins: [],
}
export default config
