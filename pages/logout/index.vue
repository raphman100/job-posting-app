<template>
	<v-row>
		<v-col class="text-center">
			<h3>You are being redirected</h3>
		</v-col>
	</v-row>
</template>

<script>
export default {
	head() {
		return {
			title: 'Logout',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Logout'
				}
			]
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			await this.$store.dispatch( 'logout' );
			await this.$router.push( '/' );
		}
	},
};
</script>

<style scoped>

</style>
