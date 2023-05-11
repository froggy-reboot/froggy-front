/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        'real-screen': 'calc(var(--vh) * 100)',
      },
    },
    colors: {
      green: {
        100: '#00A688',
        50: '#65D4A5',
        30: '#A2E0AF',
        10: '#D8FFE3',
      },
      yellow: {
        100: '#FFF6A7',
        50: '#FFFFC8',
      },
      black: {
        100: ' #000000',
        50: '#949494',
        30: '#E7E7E7',
        10: '#F5F5F5',
      },
      red: '#F8746B',
      white: '#FFFFFF',
    },
    fontSize: {
      Title: ['20px', { fontWeight: '700' }],
      Navbar: ['18px', { fontWeight: '700' }],
      Body: [
        '16px',
        { fontWeight: '400', lineHeight: '20.5px', letterSpacing: '-0.3px' },
      ],
      Link: ['16px', { fontWeight: '400', letterSpacing: '-0.3px' }],
      Tag: ['14px', { fontWeight: '500' }],
      Callout: ['13px', { fontWeight: '400', letterSpacing: '-0.3px' }],
      Caption: ['13px', { fontWeight: '300' }],
      Board: ['11px', { fontWeight: '400' }],
      BoardSub: ['12px', { fontWeight: '400' }],
    },
    minHeight: {
      'real-screen': 'calc(var(--vh) * 100)',
    },
  },
  plugins: [],
};
