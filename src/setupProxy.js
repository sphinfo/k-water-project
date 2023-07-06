
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		createProxyMiddleware('/vworld',{
			target: 'http://api.vworld.kr/req/',
			changeOrigin: true,
            pathRewrite: {
                '^/vworld': ''
            }
		})
	);

	app.use(
		createProxyMiddleware('/starGeo',{
			target: 'http://221.147.56.177:58080//geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/starGeo': ''
            }
		})
	);

};