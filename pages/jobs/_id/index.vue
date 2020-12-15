<template>
	<v-layout
		column
		justify-center
		align-center
	>
		<JobPost
			:job="currentJobPost"
			:views="views( $route.path )"
		/>
	</v-layout>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Axios
import axios from 'axios';

// Components
import JobPost from '@/components/JobPost';

// Utils
import UrlUtils from '@/utils/url-utils';

export default {
	components: {
		JobPost,
	},
	data() {
		return {
			currentJobPost: {},
		};
	},
	async asyncData( { params, error } ) {
		console.log( 'as _id: ', params.id );
		console.log( 'route name: ', $nuxt.$route.name );
		if ( params.id ) {
			try {
				const uri = params.id;
				const id = UrlUtils.extractID( uri );
				const { data } = await axios.get( `http://localhost:3000/api/positions/${ id }.json` );
				// console.log( 'data: ', data );
				console.log( 'route path: ', $nuxt.$route.path );
				return { currentJobPost: data };
			} catch ( error ) {
				console.error( { message: 'No jobs found. 2', statusCode: 404 } );
			}
		}
	},
	head() {
		return {
			title: this.getMetaTitle(),
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.getMetaDescription(),
				}
			],
		};
	},
	computed: {
		...mapGetters( {
			views: 'getViews',
		} ),
	},
	methods: {
		getMetaTitle() {
			return this.currentJobPost.title + ' at ' + this.currentJobPost.company;
		},
		getMetaDescription() {
			return 'Apply for the position: ' + this.currentJobPost.title + ' at ' + this.currentJobPost.company;
		},
	},
	middleware: 'views',
};
</script>

<style scoped>

</style>
