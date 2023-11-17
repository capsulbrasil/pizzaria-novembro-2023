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
              '1/14' : '7%',
              '28p': '28%',
              'lst': '317px'
            },
            padding: {
              '1/1': '1%'
            },
            margin: {
              '1/1': '-1px',
              '2/2': '-0.3%',
              'hpx': '0.2%'
            }
          }
        }
      },
    },
  },
}
