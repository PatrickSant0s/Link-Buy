<template>
	<!-- <div class="catalog"> -->
	<div class="category-list d-flex justify-center">
		<v-row class="mt-10">
			<v-col v-for="category in categories" :key="category.id" cols="12" md="4">
				<v-card
					class="mx-auto mb-3"
					max-width="400"
					height="auto"
					color="#0d0d0d"
				>
					<v-img height="auto" :src="category.image_url" alt="Category Image" />

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
import { supabase } from "@/config/supabase";

export default {
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
</style>
