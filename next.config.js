// /** @type {import('next').NextConfig} */
// import { NextFederationPlugin } from "@module-federation/nextjs-mf"

// const remotes = (isServer) => {
//   const location = isServer ? "ssr" : "chunks"
//   return {
//     host: `host@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
//   }
// }

// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, options) => {
//     config.plugins.push(
//       new NextFederationPlugin({
//         name: "products",
//         filename: "static/chunks/remoteEntry.js",
//         remotes: remotes(options.isServer),
//         exposes: {
//           "./ProductPage": "./src/pages/products/index.tsx",
//           // "./UsersForm": "@/pages/users/[id].tsx",
//         },
//         shared: {},
//         extraOptions: {
//           exposePages: true,
//         },
//       })
//     )
//     return config
//   },
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig