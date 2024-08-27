import { defineStore } from "pinia";

export const userStore = defineStore("user", {
	// O state e aonde vai vc vai definir as variaves e o valor inicial
	state: () => ({ token: null, email: null, id: null }),
	// como vai recuperar os valores
	getters: {},
	// como vc vai alterar o valor
	actions: {
		setUser(user) {
			this.email = user.email;
			this.token = user.token;
			this.id = user.id;
		},
	},
});
