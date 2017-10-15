// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const path = require('path')

module.exports = {
  webpack: (config, { dev }) => {
    // Perform customizations to webpack config
    if(config.resolve.alias) {
      delete config.resolve.alias.react
      delete config.resolve.alias['react-dom']
    }
    config.devtool = 'source-map'

    config.module.rules.push(
      {
        test: /\.(css|less)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.less$/,
        use: ['babel-loader', 'raw-loader',
          {
            loader: 'less-loader',
            options: {
              paths: [
                path.resolve(__dirname, "css")
              ]
            }
          }
        ]
      }
    )
    // Important: return the modified config
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  }
}
