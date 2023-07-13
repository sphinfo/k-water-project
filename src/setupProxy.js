
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		createProxyMiddleware('/vworld',{
			target: 'http://api.vworld.kr/',
			changeOrigin: true,
            pathRewrite: {
                '^/vworld': ''
            }
		})
	);

	app.use(
		createProxyMiddleware('/mapVworld',{
			target: 'https://map.vworld.kr/',
			changeOrigin: true,
            pathRewrite: {
                '^/mapVworld': ''
            }
		})
	);

	app.use(
		createProxyMiddleware('/starGeo',{
			target: 'http://221.147.56.177:58080/geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/starGeo': ''
            }
		})
	);

	app.use(
		createProxyMiddleware('/waterGeo',{
			target: 'http://221.147.56.177:58080/geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/waterGeo': ''
            }
		})
	);

};