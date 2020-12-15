<template>
	<v-container fluid style="margin: 0; padding: 0; width: 100%">
		<v-layout wrap>
			<v-row>
				<v-col class="text-center">
					<img
						src="@/static/Gravatar.png"
						alt="Vuetify.js"
						class="mb-5"
						height="300px"
						width="300px"
					>
					<h1>Home</h1>
				</v-col>
			</v-row>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	head() {
		return {
			title: 'Home',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Home'
				}
			]
		};
	},
};
</script>
