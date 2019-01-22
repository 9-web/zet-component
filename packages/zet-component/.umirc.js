export default {
  cssLoaderOptions: {
    camelCase: true,
  },
  plugins: [
    [
      'umi-plugin-library', {
        doc: {
          title: 'Zet Component',
          description: 'Modern UI library for React',
          wrapper: 'src/wrapper.js',
          // dest: '/dist',
          repository: 'https://github.com/9-web/zet-component',
          themeConfig: {
            colors: {
              primary: '#bd4932',
              link: '#bd4932',
            },
            logo: {
              src:
                'http://www.zetyun.com/img/icon/logo.svg',
              width: 200,
            },
          },
        },
      }
    ]
  ],
}
