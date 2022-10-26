/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // temperorary workaround untill we add "vercel-edge"
  serverBuildTarget: "cloudflare-workers",
  // override "cloudflare-workers"'s default "build/index.js"
  serverBuildPath: process.env.NODE_ENV === "development" ? "build/index.js" : "api/index.js",
  server: process.env.NODE_ENV === "development" ? "./server-dev.js" : "./server-prod.js",
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
};
