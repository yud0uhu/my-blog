const TerserPlugin = require('terser-webpack-plugin')

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    config.output.webassemblyModuleFilename =
      (isServer ? '../' : '') + 'static/wasm/[modulehash].wasm'

    // Code Splitting
    config.optimization = {
      splitChunks: {
        chunks: 'async',
      },
    }

    // Minimize JS
    config.optimization.minimize = true
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        exclude: /\/_next\/static\/css\/a950528aa4c9e8db\.css/, // 不要なCSSファイルの除外
        extractComments: false, // コメントを削除
      }),
    ]

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/yud0uhu/my-blog/blob/main/**',
      },
    ],
    minimumCacheTTL: 60,
  },
}
