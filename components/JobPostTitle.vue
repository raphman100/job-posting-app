<template>
	<v-card
		width="400"
		height="450"
		class="pa-5 ma-5"
		color="#ccc"
		light
		outlined
	>
		<v-img
			:src="job.company_logo"
			class="white--text align-end"
			gradient="to bottom, rgba( 0, 0, 0, 0.1 ), rgba( 0, 0, 0, 0.5 )"
			height="200px"
			contain
		/>
		<v-divider />
		<v-card-title
			class="headline font-weight-bold"
		>
			<p style="text-decoration: none !important;">
				{{ job.title }}
			</p>
		</v-card-title>
		<v-divider />
		<div>
			Views: {{ views }}
		</div>
	</v-card>
</template>

<script>
export default {
	name: 'JobPostTitle',
	props: {
		job: {
			type: Object,
			required: true,
			default: () => {}
		},
		views: {
			type: Number,
			required: false,
			default: () => 0
		},
	},
};
</script>

<style scoped>

</style>
