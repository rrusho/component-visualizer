const config = {
  plugins: {
    // This is the crucial line. It MUST be '@tailwindcss/postcss'
    // for Tailwind v4 to work.
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
};

export default config;