module.exports = {
	devServer: {
		proxy: {
			"^/api": {
				// target: "http://192.168.2.104:8000", //设置调用的接口域名和端口
				target:'http://localhost:8000',
				changeOrigin: true, //是否跨域
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	}
}