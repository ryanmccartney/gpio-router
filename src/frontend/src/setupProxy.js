const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.BACKEND_PORT || "80";
const host = process.env.BACKEND_HOST || "backend";
const scheme = process.env.BACKEND_SCHEME || "http";

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: `${scheme}://${host}:${port}`,
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware("/socket.io", {
            target: `${scheme}://${host}:${port}`,
            ws: true,
            changeOrigin: true,
        })
    );
};
