module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;',
      },
      screens: {
        'sm': '400px',
        'md': '750px',
        'lg': '1440px',
      },
    },
  },
  plugins: [],
}