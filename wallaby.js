var wallabyWebpack = require('wallaby-webpack');
var path = require('path');

var compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
);

compilerOptions.module = 'CommonJs';

module.exports = function(wallaby) {
  // create alias from tsconfig
  var alias = {};
  for (var p in compilerOptions.paths) {
    var aliasPath = compilerOptions.paths[p][0];
    alias[p] = path.join(wallaby.projectCacheDir, aliasPath);
  }

  var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'wallabyTest.js',
      'apps/**/*.spec.js',
      'libs/**/*.spec.js'
    ],

    module: {
      rules: [
        { test: /\.css$/, loader: ['raw-loader', 'css-loader'] },
        { test: /\.html$/, loader: 'raw-loader' },
        {
          test: /\.ts$/,
          loader: '@ngtools/webpack',
          include: /node_modules/,
          query: { tsConfigPath: 'tsconfig.json' }
        },
        {
          test: /\.js$/,
          loader: 'angular2-template-loader',
          exclude: /node_modules/
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'less-loader'] },
        {
          test: /\.scss$|\.sass$/,
          loaders: [
            'raw-loader',
            {
              loader: 'sass-loader',
              options: { includePaths: ['./apps/**/src/styles'] }
            }
          ]
        },
        { test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000' }
      ]
    },

    resolve: {
      extensions: ['.js', '.ts'],
      modules: [
        path.join(wallaby.projectCacheDir, 'libs'),
        path.join(wallaby.projectCacheDir, 'apps'),
        'node_modules'
      ],
      alias: alias
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  });

  return {
    files: [
      { pattern: 'wallabyTest.ts', load: false },
      {
        pattern: 'apps/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)',
        load: false
      },
      { pattern: 'apps/**/*.d.ts', ignore: true },
      { pattern: 'apps/**/*spec.ts', ignore: true },
      {
        pattern: 'libs/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)',
        load: false
      },
      { pattern: 'libs/**/*.d.ts', ignore: true },
      { pattern: 'libs/**/*spec.ts', ignore: true }
    ],

    tests: [
      { pattern: 'apps/**/*spec.ts', load: false },
      { pattern: 'libs/**/*spec.ts', load: false }
    ],

    testFramework: 'jasmine',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    middleware: function(app, express) {
      var path = require('path');
      app.use(
        '/assets',
        express.static(path.join(__dirname, 'libs/assets'))
      );
    },

    env: {
      kind: 'chrome'
    },

    postprocessor: webpackPostprocessor,

    setup: function() {
      window.__moduleBundler.loadTests();
    },

    debug: true,

    filesWithNoCoverageCalculated: [
      '**/main.ts',
      '**/environments/**/*',
      '**/**/*.module.ts'
    ]
  };
};
