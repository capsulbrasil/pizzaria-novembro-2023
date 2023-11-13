module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {
      config: {
        prefix: 'tw-',
        darkMode: 'class',
        content: ['./**/*.vue'],
        theme: {
          extend: {
            width: {
              '1/10': '10%',
              '1/14' : '7%'
            },
          }
        }
      },
    },
  },
}
