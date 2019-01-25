export default {
  cssLoaderOptions: {
    camelCase: true,
  },
  plugins: [
    [
      'umi-plugin-library', {
        doc: {
          title: 'Zet Component',
          description: 'Zet Component UI library for React',
          wrapper: 'src/wrapper.js',
          files: "(docs||src)/**/*.mdx",
          typescript: true,
          // propsParser: false,
          // dest: '/dist',
          repository: 'https://github.com/9-web/zet-component',
          hashRouter: true,
          themeConfig: {
            repository: 'https://github.com/9-web/zet-component',
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
