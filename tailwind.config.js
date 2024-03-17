module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      mobile: '480px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
  },
  plugins: [],
}
