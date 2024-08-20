<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import { supabase } from "@/config/supabase";

export default {
	name: "App",

	data: () => ({
		//
	}),
	created: () => {
		console.log(supabase);
	},
};
</script>
