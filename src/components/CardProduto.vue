<template>
	<div class="title d-flex justify-center">
		<v-row class="mt-10">
			
			<v-col cols="12" md="4">
				<v-card
					class="mx-auto mb-3"
					max-width="400"
					height="auto"
					color="#0d0d0d"
				>
					<v-img height="auto" :src="product_image"></v-img>

					<div class="d-flex flex-column">
						<span class="name mx-auto pt-4">{{ product_name }}</span>
						<span class="sub-title">{{ product_description }}</span>
					</div>

					<div class="portion">{{}}</div>

					<div class="pa-5">
						<button class="custom-button" @click="goToProduct">
							Ver produto
						</button>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { uuid } from "vue-uuid";
import { supabase } from "@/config/supabase";


export default {
	data() {
		return {
			product_image: "",
			product_name: "",
			product_description: "",
			product_link: "",
		};
	},
	async created() {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
			if (error || !user) {
				console.error("Não foi possível obter os dados do usuário.");
				return;
			}
			console.log("User Metadata:", user.user_metadata);

			this.product_image = user.user_metadata?.product_image || "";
			this.product_name = user.user_metadata?.product_name || "";
			this.product_description = user.user_metadata?.product_description || "";
			this;
			this.product_link = user.user_metadata?.product_link || "";
		} catch (err) {
			console.error("Erro ao obter dados do usuário:", err);
		}
	},
	methods: {
		goToProduct() {
			if (this.product_link) {
				window.open(this.product_link, "_blank", "noopener,noreferrer");
			} else {
				console.error("Link do produto não disponível ");
			}
		},
	},
};
</script>

<style scoped>
.v-col-4 {
	margin: auto;
}

.title {
	display: flex;
	text-align: center;
}

.portion {
	font-size: 0.87rem;
	font-weight: 500;
	display: block;
	margin: auto;
	width: 80%;
	margin-top: 15px;
}

.custom-button {
	margin: auto;
	width: 90%;
	height: 120px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 44px;
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	border-radius: 3px;
	cursor: pointer;
	color: #000000;
	background-color: #ffd200;
	transition: ease-out 0.2s;
}

.button-register {
	align-content: center;
}
.name {
	color: #ebebeb;
	flex-grow: 1;
	max-height: 45px;
	font-size: 1rem;
	font-weight: 600;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.sub-title {
	display: block;
	font-size: 1.5rem;
	font-weight: 700;
	color: #ffd200;
	margin-left: 40px;
}
</style>
