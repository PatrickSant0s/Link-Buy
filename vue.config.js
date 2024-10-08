const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,

	devServer: {
		proxy: {
			// Redirecionar chamadas à API para o Supabase
			"/auth/v1": {
				target: "https://xemmitbhfxuiagjsiqkq.supabase.co",
				changeOrigin: true, // Isso altera o cabeçalho de origem para evitar problemas de CORS
				secure: false, // Se o HTTPS causar problemas em desenvolvimento, definir como 'false'
			},
		},
	},

	pluginOptions: {
		vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
	},
});
