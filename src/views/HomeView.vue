<template>
	<div style="background-color: #141414; height: 100vh; width: 100%">
		<MenuBar />
	</div>
</template>

<script>
// @ is an alias to /src
import MenuBar from "@/components/MenuBar.vue";

export default {
	name: "HomeView",
	components: {
		MenuBar,
	},
};
</script>
