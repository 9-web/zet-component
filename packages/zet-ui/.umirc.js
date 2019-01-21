export default {
  cssLoaderOptions: {
    camelCase: true,
  },
  plugins: [
    [
      'umi-plugin-library', {
        doc: {
          title: 'Zet UI',
          description: 'Modern UI library for React',
          wrapper: 'src/wrapper.js',
          // repository: 'https://github.com/smooth-code/smooth-ui',
          themeConfig: {
            // repository: 'https://github.com/smooth-code/smooth-ui',
            colors: {
              primary: '#bd4932',
              link: '#bd4932',
            },
            // logo: {
            //   src:
            //     'https://raw.githubusercontent.com/smooth-code/smooth-ui/master/resources/smooth-ui-logo-horizontal.png',
            //   width: 200,
            // },
          },
        },
      }
    ]
  ],
}
