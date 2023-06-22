const { createProxyMiddleware } = require("http-proxy-middleware");

//function to setup proxy to call the backend server

module.exports = function (app) {
  app.use(
    "/Auth",
    createProxyMiddleware({
      target: "https://rfp-backend.onrender.com",
      changeOrigin: true,
    })
  );
};
