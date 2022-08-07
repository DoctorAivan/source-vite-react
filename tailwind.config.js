module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        smile: 'smile 2s ease-in-out infinite',
        textOpacity: 'textOpacity 1.75s ease-in-out infinite',
        buttonActive: 'buttonActive 1.75s ease-in-out infinite',
        zoomIn: 'zoomIn 1.75s ease-in-out infinite',
        viewIn: 'viewIn 1s ease 1 forwards',
        fadeIn: 'fadeIn 1.25s ease 1 forwards',
        modal: 'modal 0.5s ease 1 forwards',
        loading: 'loading 3s linear infinite',
      },
      keyframes: {
        smile: {
          '0%, 100%': { transform: 'rotate(-12deg)' },
          '50%': { transform: 'rotate(12deg)' },
        },
        textOpacity: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        buttonActive: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' },
        },
        zoomIn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.075)' },
        },
        viewIn: {
          '0%': { opacity: '0' },
          '5%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        modal: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        loading: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }
    }
  },
  plugins: [],
}