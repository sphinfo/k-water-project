
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {

	//수자원공사 Geoserver TestServer
	app.use(
		createProxyMiddleware('/waterGeo',{
			target: 'http://121.152.185.126:18081/geoserver',
			changeOrigin: true,
            pathRewrite: {
                '^/waterGeo': ''
            }
		})
	)

	app.use(
		createProxyMiddleware('/vworld',{
			target: 'https://api.vworld.kr/',
			changeOrigin: true,
            pathRewrite: {
                '^/vworld': ''
            }
		})
	)


	app.use(
		createProxyMiddleware('/api',{
			target: 'http://121.152.185.126:18080/api/',
			changeOrigin: true,
			pathRewrite: {
				'^/api': ''
			}
		})
	)

	app.use(
		createProxyMiddleware('/wamis',{
			target: 'http://www.wamis.go.kr:8080/wamis/openapi/',
			changeOrigin: true,
			pathRewrite: {
				'^/wamis': ''
			}
		})
	)

};