import { defineStore } from "pinia";

export const userStore = defineStore("user", {
	// O state e aonde vai vc vai definir as variaves e o valor inicial
	state: () => {
		const savedUser = localStorage.getItem("user");

		if (!savedUser) {
			return { token: null, email: null, id: null };
		}

		return JSON.parse(savedUser);
	},
	// como vai recuperar os valores
	getters: {
		user() {
			return { email: this.email, token: this.token, id: this.id };
		}
	},
	// como vc vai alterar o valor
	actions: {
		login(user) {
			localStorage.setItem("token", user.token);
			localStorage.setItem("user", JSON.stringify(user));

			this.email = user.email;
			this.token = user.token;
			this.id = user.id;
		},
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("user");

			this.email = null;
			this.token = null;
			this.id = null;
		}
	},
});
