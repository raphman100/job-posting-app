<template>
	<v-container>
		<h1>About Job Postings App</h1>
		<p>
			This app will allow us to show all the jobs published by the GitHub's Jobs Public API
		</p>
	</v-container>
</template>

<script>
export default {
	head() {
		return {
			title: 'About the Job Posting App',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Find the best programming jobs here'
				}
			]
		};
	},
};
</script>

<style scoped>

</style>
