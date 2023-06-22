const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/Auth",
    createProxyMiddleware({
      target: "https://rfp-backend.onrender.com",
      changeOrigin: true,
    })
  );
};
