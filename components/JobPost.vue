<template>
	<v-container>
		<v-card>
			<v-img
				:src="job.company_logo"
				class="white--text align-end"
				gradient="to bottom, rgba( 0, 0, 0, 0.1 ), rgba( 0, 0, 0, 0.5 )"
				height="200px"
				contain
			/>
			<v-divider />
			<v-card-title>
				<p>
					{{ job.title }} - Views: {{ views }}
				</p>
			</v-card-title>
			<v-card-text v-html="job.description" />
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'JobPost',
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
