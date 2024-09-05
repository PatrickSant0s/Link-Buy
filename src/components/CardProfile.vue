<template>
	<v-card class="mx-auto card-profile mt-10" max-width="800" height="380px">
		<v-img
			height="150px"
			src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
			cover
		></v-img>
		<div class="d-flex flex-column">
			<v-avatar color="black" size="70" class="mb-3 icon-profile"
				><img src="" alt="" />
			</v-avatar>
			<span class="username">{{ user.username }}</span>
			<span class="email">{{ user.email }}</span>
		</div>
		<v-card-actions class="button">
			<v-btn variant="tonal">Editar</v-btn>
			<v-btn variant="tonal">Mudar Foto</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { userStore } from "@/store/userStore";
import { mapState } from "pinia";

export default {
	computed: {
		...mapState(userStore, ["user"]),
	},
};
</script>

<style scoped>
.card-profile {
	background-color: white;
}
.icon-profile {
	position: absolute;
	top: 24%;
	left: 6%;
}

.username {
	font-size: 12px;
	position: absolute;
	top: 40%;
	left: 60px;
	font-weight: 900;
	margin-top: 12px;
}
.email {
	font-size: 12px;
	position: absolute;
	top: 45%;
	left: 5px;
	font-weight: 600;
	margin-top: 12px;
}

.button {
	position: absolute;
	top: 80%;
}
</style>
