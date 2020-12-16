<template>
	<v-container fluid style="margin: 0; padding: 0; width: 100%">
		<v-layout wrap>
			<v-row>
				<v-col
					v-for="job in allJobs"
					:key="job.id"
				>
					<NuxtLink :to="buildUrl( job )">
						<JobPostTitle
							:job="job"
							:views="views( buildUrl( job ) )"
							v-if="job.company_logo !== null && job.title !== null"
						/>
					</NuxtLink>
				</v-col>
			</v-row>
		</v-layout>
	</v-container>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';

// Axios
import axios from 'axios';

// Firebase
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';

// Components
import JobPostTitle from '@/components/JobPostTitle';

export default {
	components: {
		JobPostTitle,
	},
	data() {
		return {
			allJobs: [],
		};
	},
	head() {
		return {
			title: 'Job Postings',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'All Job Postings from Github'
				}
			]
		};
	},
	computed: {
		...mapGetters( {
			views: 'jobs/getViews',
		} ),
	},
	mounted() {
		// firebase.firestore().collection( 'todos' ).get().then( ( res ) => {
		// 	console.log( 'res: ', res );
		// } );
	},
	async asyncData( { params, error } ) {
		try {
			const { data } = await axios.get( 'http://localhost:3000/api/positions.json?search=node' );
			return { allJobs: data };
		} catch ( error ) {
			console.error( { message: 'No jobs found. 1', statusCode: 404 } );
		}
	},
	methods: {
		buildUrl( job ) {
			return '/jobs/' + this.$slugify( job.id, job.title );
		},
	},
};
</script>
