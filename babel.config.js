module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV === 'development');

  const presets = [
    [
      '@babel/env',
      {
        targets: {
          ie: '11',
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1'
        },
        useBuiltIns: 'usage',
        modules: false,
        corejs: {
          'version': 3,
          'proposals': true
        }
      }
    ],
    '@babel/react'
  ];

  const plugins = [
    [
      'import',
      {
        'libraryName': 'antd',
        'style': true
      }
    ]
    // [
    //   '@babel/plugin-proposal-decorators',
    //   {
    //     'legacy': true
    //   }
    // ],
    // [
    //   '@babel/plugin-proposal-class-properties',
    //   {
    //     'loose': true
    //   }
    // ]
  ];

  return {
    comments: true,
    presets,
    plugins
  };
};
