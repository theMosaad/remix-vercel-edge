/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // temperorary workaround untill we add "vercel-edge"
  serverBuildTarget: "cloudflare-workers",
  // override "cloudflare-workers"'s default "build/index.js"
  serverBuildPath: process.env.NODE_ENV === "development" ? "build/index.js" : "api/index.js",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
};
