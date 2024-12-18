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
					v-model="productName"
					name="Name"
					label="Name"
					variant="filled"
					:rules="usernameRules"
				></v-text-field>
				<v-textarea
					v-model="description"
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
					<button class="custom-button" @click.prevent="registerProduct">
						Cadastrar Produto
					</button>
				</div>
			</v-form>
		</v-card>
	</div>
</template>

<script>
import { uuid } from "vue-uuid";
import { Icon } from "@iconify/vue";
import { supabase } from "@/config/supabase";

export default {
	name: "CardRegisterProduct",
	components: { Icon },
	data() {
		return {
			productName: "",
			description: "",
			productLink: "",
			productImageURL: "",
			userCatalog: [],
		};
	},
	async created() {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
		if (error || !user) {
			console.error("Usuário não autenticado", error);
			return;
		}
		this.product_image = user.user_metadata?.product_image;
		console.log("Avatar URL:", this.product_image);

		this.fetchUserCatalog();
	},

	methods: {
		async uploadImage(event) {
			const productFile = event.target.files[0];
			const newID = uuid.v4();
			const filePath = `public/products/${newID}.png`;

			const { data, error } = await supabase.storage
				.from("products")
				.upload(filePath, productFile);

			if (error) {
				console.error("Erro ao fazer upload da imagem:", error);
				return;
			}

			const { data: imageData } = supabase.storage
				.from("products")
				.getPublicUrl(filePath);

			this.productImageURL = imageData.publicUrl;
			console.log("Imagem enviada com sucesso:", this.productImageURL);
		},

		async registerProduct() {
			if (
				!this.productName ||
				!this.description ||
				!this.productLink ||
				!this.productImageURL
			) {
				console.error("Por favor, preencha todas as informações do produto.");
				return;
			}

			const { data, error } = await supabase.from("product").insert([
				{
					name: this.productName,
					description: this.description,
					link: this.productLink,
					img_url: this.productImageURL,
				},
			]);
			if (error) {
				console.error("Erro ao atualizar o metadata do usuário:", error);
				return;
			}

			console.log("Produto cadastrado com sucesso!");

			this.goToHome();
		},

		goToHome() {
			this.$router.push("/");
		},

		async fetchUserCatalog() {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
			if (error || !user) {
				console.error("Usuário não autenticado", error);
				return;
			}

			const userId = user.id;

			const { data: catalog, error: catalogError } = await supabase
				.from("catalog")
				.select("*")
				.eq("user_id", userId);

			if (catalogError) {
				console.error("Erro ao buscar o catálogo do usuário:", catalogError);
				return;
			}

			console.log("Catálogo do usuário:", catalog);

			this.userCatalog = catalog || [];
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
