<template>
	<div style="background-color: #141414; width: 100%">
		<MenuBar />
		<button class="button-register" @click="goRegisterProduct">
			Registrar Produto
		</button>
		<div class="d-flex justify-center">
			<div class="content">
				<h1 class="title">Produtos</h1>
			</div>
		</div>

		<div></div>
	</div>
</template>

<script>
import CardRegisterProduct from "@/components/CardRegisterProduct.vue";
export default {
	name: "categoryView",
	components: { CardRegisterProduct },

	methods: {
        goRegisterProduct() {
            this.$router.push("/registerProduct")
        }
    },
};
</script>

<style scoped>
.button-register {
	position: absolute;
	right: 20%;
	top: 25%;
	width: 8%;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	font-size: 0.75rem;
	font-weight: 700;
	border-radius: 3px;
	cursor: pointer;
	color: #000000;
	background-color: #ffd200;
	transition: ease-out 0.2s;
}
.title {
	color: #ffd200;
	text-align: center;
}
</style>
