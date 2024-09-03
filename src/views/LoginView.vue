<template>
	<div class="login">
		<MenuBar />
		<UserLogin />
	</div>
</template>

<script>
import UserLogin from "@/components/UserLogin.vue";

import MenuBar from "@/components/MenuBar.vue";

export default {
	components: { UserLogin, MenuBar },
	name: "LoginPage",
};
</script>

<style scoped></style>
