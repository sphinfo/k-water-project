
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
		createProxyMiddleware('/ceGeo',{
			target: 'http://112.218.1.244:38000/geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/ceGeo': ''
            }
		})
	);

};