<template>
	<div>
		<div class="icon-home">
			<icon
				icon="ion:home-sharp"
				width="6.2em"
				height="2.2em"
				style="color: #ffd200"
				@click="goToHome"
				cursor="pointer"
			></icon>
		</div>
		<v-card class="mx-auto mt-10 mb-10 custom-scope" max-width="400" height="">
			<v-form ref="form" validate-on="input">
				<v-card-title class="text-center">
					<span class="title-edit">Cadastrar Produto</span>
				</v-card-title>
				<v-text-field
					name="Name"
					label="Name"
					variant="filled"
					:rules="usernameRules"
				></v-text-field>
				<v-textarea
					v-model="bio"
					label="Descrição do Produto"
					rows="1"
					variant="filled"
					auto-grow
				></v-textarea>

				<v-text-field
					v-model="productLink"
					label="Link do Produto"
					variant="filled"
					type="url"
				></v-text-field>

				<div>
					<input
						type="file"
						id="fileInput"
						class="custom-file-input"
						@change="uploadImage"
					/>
					<label for="fileInput" class="custom-file-label"
						>Imagem do Produto</label
					>
				</div>

				<div class="pa-5">
					<button class="custom-button">Cadastrar Produto</button>
				</div>
			</v-form>
		</v-card>
	</div>
</template>

<script>
import { uuid } from "vue-uuid";
import { Icon } from "@iconify/vue";
export default {
	name: "CardRegisterProduct",
	components: { Icon },
	methods: {
		async uploadImage(event) {
			console.log(event.target);
			const avatarFile = event.target.files[0];
			const newID = uuid.v4();
			console.log(avatarFile);
			console.log("public/newID.png");
			const { data, error } = await supabase.storage
				.from("user-profile-image")
				.upload(`public/${newID}.png`, avatarFile);
		},
		goToHome() {
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
.custom-file-input {
	display: none;
}

.custom-file-label {
	display: inline-block;
	background-color: #ffd000a9;
	color: #141414;
	padding: 8px 16px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	margin-left: 10px;
}

.custom-file-label:hover {
	background-color: #ffd200;
}
.icon-home {
	margin-left: 200px;
	margin-top: 100px;
}
</style>
