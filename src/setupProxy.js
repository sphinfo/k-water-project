
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {

	//수자원공사 Geoserver TestServer
	app.use(
		createProxyMiddleware('/waterGeo',{
			target: 'http://221.147.56.180:28080/geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/waterGeo': ''
            }
		})
	);

	app.use(
		createProxyMiddleware('/egisGeo',{
			target: 'https://egisapp.me.go.kr/geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/egisGeo': ''
            }
		})
	);

	

	app.use(
		createProxyMiddleware('/vworld',{
			target: 'https://api.vworld.kr/',
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

};