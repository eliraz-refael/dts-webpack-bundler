# dts-webpack-bundler

This Webpack plugin generate a single TypeScript *.d.ts declaration file per entry (per chunk) using [dts-bundle](https://github.com/TypeStrong/dts-bundle).

### Installation

```shell
$ npm install dts-webpack-bundler --save-dev
```

### Usage

##### First you need to add the following to tsconfig.json:
### NOTE: currently this plugin support only declaration files that are gathered into a single folder so, please make sure your having using `"declarationDir"` properly.

```javascript
{
    "compilerOptions": {
        // ...
        "declaration": true,
        "declarationDir": "./typings/"
    }
}
```

##### Then in your webpack.config.js:

```javascript
const DtsWebpackBundler = require('dts-webpack-bundler');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'index.js'
    },
    plugins: [
        new DtsPlugin({
			libName: 'library-name',
			typingsDir: path.resolve(process.cwd(), 'typings'),
			outputDir: path.resolve(process.cwd(), 'build'),
			deleteSource: true // deletes the typings folder after bundling it.
        })
    ]
}
```

### Have Fun!