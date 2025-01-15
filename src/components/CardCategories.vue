<template>
	<!-- <div class="catalog"> -->
	<div class="category-list d-flex justify-center">
		<v-row class="mt-10">
			<v-col v-for="category in categories" :key="category.id" cols="12" md="4">
				<v-card
					class="mx-auto mb-3 position-relative"
					max-width="400"
					height="auto"
					color="#0d0d0d"
				>
					<v-img height="auto" :src="category.image_url" alt="Category Image" />

					<!-- Botão de exclusão com tooltip -->
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<div
								class="delete-button"
								style="position: absolute; top: 10px; right: 10px; z-index: 10"
								v-bind="attrs"
								v-on="on"
							>
								<icon
									icon="mdi:pencil"
									width="1.5em"
									height="1.5em"
									class="delete-icon"
									@click="editProduct(product)"
								></icon>
								<icon
									icon="mdi:delete"
									width="1.5em"
									height="1.5em"
									class="delete-icon"
									@click="deleteCategory(category.id)"
								></icon>
							</div>
						</template>
						<span>Excluir Catálogo</span>
					</v-tooltip>

					<div class="d-flex flex-column">
						<span class="name mx-auto pt-4">{{ category.name }}</span>
						<span class="sub-title">{{ category.description }}</span>
					</div>

					<div class="pa-5">
						<button class="custom-button" @click="goToCategory(category.id)">
							Ver Categoria
						</button>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
	<!-- </div> -->
</template>
<script>
import { Icon } from "@iconify/vue";

import { supabase } from "@/config/supabase";

export default {
	name: "",
	components: { Icon },
	data() {
		return {
			categories: [],
			newCategory: {
				name: "",
				description: "",
				image_url: "",
			},
		};
	},
	async mounted() {
		await this.fetchCategories();
	},
	methods: {
		// Buscar categorias do Supabase
		async fetchCategories() {
			const { data, error } = await supabase.from("categories").select("*");
			if (error) {
				console.error("Erro ao buscar categorias:", error.message);
			} else {
				this.categories = data;
			}
		},
		// deletando categorias
		async deleteCategory(categoryId) {
			// Confirmação do usuário
			const confirmDelete = confirm(
				"Tem certeza que deseja excluir esta categoria?",
			);
			if (!confirmDelete) return;

			try {
				// Exclusão no Supabase
				const { error } = await supabase
					.from("categories")
					.delete()
					.eq("id", categoryId);
				if (error) {
					console.error("Erro ao excluir categoria:", error.message);
					alert("Não foi possível excluir a categoria.");
					return;
				}

				// Atualização local: mantém apenas as categorias cujo id seja diferente de categoryId
				this.categories = this.categories.filter((category) => {
					console.log("Comparando:", category.id, "com", categoryId); // Para depuração
					return category.id !== categoryId;
				});

				// Feedback para o usuário
				alert("Categoria excluída com sucesso!");
			} catch (err) {
				console.error("Erro inesperado:", err);
				alert("Ocorreu um erro inesperado.");
			}
		},
	},
};
</script>
<style>
.catalog {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}

.category-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}

.category-form input {
	margin: 5px 0;
	padding: 10px;
	width: 300px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.category-form button {
	padding: 10px 20px;
	border: none;
	background-color: #007bff;
	color: white;
	border-radius: 4px;
	cursor: pointer;
}

.category-form button:hover {
	background-color: #0056b3;
}

.category-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 16px;
}

.category-card {
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
	width: 200px;
	text-align: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-card img {
	max-width: 100%;
	height: auto;
	border-radius: 8px;
}

.sub-title {
	display: block;
	font-size: 1.5rem;
	font-weight: 700;
	color: #ffd200;
	margin: auto;
}

.delete-icon {
	color: black;
	cursor: pointer;
	transition: color 0.3s ease; /* Transição suave */
}

/* Cor vermelha no hover */
.delete-icon:hover {
	color: red;
}
</style>
