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
		<v-card class="mx-auto mt-10 mb-10 custom-scope" max-width="400">
			<v-form ref="form" validate-on="input">
				<v-card-title class="text-center">
					<span class="title-edit">Cadastrar Categoria</span>
				</v-card-title>

				<v-text-field
					v-model="newCategory.name"
					label="Nome da Categoria"
					variant="filled"
					required
				></v-text-field>

				<v-textarea
					v-model="newCategory.description"
					label="Descrição da Categoria"
					rows="1"
					variant="filled"
					auto-grow
					required
				></v-textarea>

				<v-text-field
					v-model="newCategory.image_url"
					label="URL da Imagem"
					variant="filled"
					type="url"
					required
				></v-text-field>

				<div class="pa-5">
					<button class="custom-button" @click.prevent="createCategory">
						Adicionar Categoria
					</button>
				</div>
			</v-form>
		</v-card>
	</div>
</template>

<script>
import { supabase } from "@/config/supabase";
import { Icon } from "@iconify/vue";
export default {
	name: "CardRegisterCateogires",
	components: { Icon },
	data() {
		return {
			newCategory: {
				name: "",
				description: "",
				image_url: "",
			},
		};
	},
	methods: {
		async createCategory() {
			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();

			const categoryData = {
				...this.newCategory,
				user_id: user.id,
			};
			const { data, error } = await supabase
				.from("categories")
				.insert([categoryData])
				.select();

			if (error) {
				console.error("Erro ao criar categoria:", error.message);
				return;
			}

			if (data && data.length > 0) {
				this.$emit("category-added", data[0]);
				this.newCategory = { name: "", description: "", image_url: "" };
				alert("Categoria criada com sucesso");
				this.goToHome();
			} else {
				console.error("Nenhuma categoria foi criada. Dados retornados:", data);
			}
		},

		goToHome() {
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
.title-edit {
	font-size: 1.5rem;
	font-weight: bold;
	color: #ffd200;
}
.custom-button {
	background-color: #ffd200;
	color: #141414;
	padding: 10px 16px;
	border: none;
	cursor: pointer;
	border-radius: 4px;
	font-size: 1rem;
	width: 100%;
}
.custom-button:hover {
	background-color: #e6c200;
}
.icon-home {
	margin-left: 200px;
	margin-top: 100px;
}
</style>
