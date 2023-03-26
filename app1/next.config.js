const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "app1",
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          app2: `app2@http://localhost:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          './nav': './src/components/nav.js',
          './add': './src/utils/add.js',
          './multiplyByTwo': './src/utils/multiplyByTwo.js',
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
