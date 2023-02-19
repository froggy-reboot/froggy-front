/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      green: {
        100: '#65D4A5',
        50: '#A2E0AF',
        30 : '#D8FFE3'
      },
      yellow: {
        100: '#FFF6A7',
        50 : '#FFFFC8'
      },
      black: {
        100: ' #000000',
        50: '#949494',
        30: '#E7E7E7',
        10 : '#F5F5F5'
      },
      white : '#FFFFFF'
    },
    fontSize: {
      Title: [
        '20px',
        { fontWeight: '700' },
      ],
      Navbar: [
        '18px',
        { fontWeight: '700' },
      ],
      Body: [
        '16px',
        { fontWeight: '400', lineHeight: '20.5px', letterSpacing: '-0.3px' },
      ],
      Link: [
        '16px',
        { fontWeight: '400', letterSpacing: '-0.3px' },
      ],
      Tag: [
        '14px',
        { fontWeight: '500' },
      ],
      Callout: [
        '13px',
        { fontWeight: '400', letterSpacing: '-0.3px' },
      ],
      Caption: [
        '13px',
        { fontWeight: '300' },
      ],

    }
  },
  plugins: [],
};
