/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-bms': "linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%) !important",
      },
      animation: {
        'anim-up': '0.4s ease 0s 1 normal none running upside',
      },
      keyframes: {
        // wiggle: {
        //   '0%, 100%': { transform: 'rotate(-3deg)' },
        //   '50%': { transform: 'rotate(3deg)' },
        // },
        upside: {
          '0%': { transform: 'translate3d(0px, 2000px, 0px)', visibility: 'visible' },
          '100%': { transform: 'translate3d(0px, 0px, 0px)' }
        }
      }
    },
  },
  plugins: [],
}
