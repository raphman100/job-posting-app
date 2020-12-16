<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-card-text>
						<v-container>
							<v-form @submit.prevent="submit()">
								<v-layout row>
									<v-flex xs12>
										<v-text-field
											v-model="email"
											id="email"
											label="Email"
											type="email"
											required
										/>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field
											v-model="password"
											id="password"
											label="Password"
											type="password"
											required
										/>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field
											v-model="confirmPassword"
											id="confirmPassword"
											label="Confirm Password"
											type="password"
											:rules="[ comparePasswords ]"
										/>
									</v-flex>
								</v-layout>
								<v-layout>
									<v-flex xs12>
										<v-btn type="submit">Log In</v-btn>
									</v-flex>
								</v-layout>
							</v-form>
						</v-container>
					</v-card-text>
				</v-card>
				<v-snackbar
					v-model="snackbar"
					:timeout="timeout"
					:color="color"
					centered
				>
					{{ text }}
				</v-snackbar>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
// Firebase Auth
import firebase from 'firebase/app';
import 'firebase/auth';

// Vuex
import { mapGetters } from 'vuex';

export default {
	head() {
		return {
			title: 'Login',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Login'
				}
			]
		};
	},
	data: () => ( {
		email: '',
		password: '',
		confirmPassword: '',
		error: '',
		snackbar: false,
		color: 'info',
		timeout: 3000,
		text: '',
	} ),
	computed: {
		...mapGetters( {
			isLoggedIn: 'auth/loggedIn',
		} ),
		comparePasswords() {
			return this.password !== this.confirmPassword ? 'Passwords do not match' : true;
		},
	},
	methods: {
		submit() {
			if ( this.email.length > 0 && this.password.length > 0 ) {
				firebase
					.auth()
					.signInWithEmailAndPassword( this.email, this.password )
					.then( data => {
						data.user
							.updateProfile( {
								displayName: this.email,
							} )
							.then( () => {
								firebase.auth().onAuthStateChanged(user => {
									this.$store.dispatch("auth/fetchUser", user)
										.then( () => {
											this.text = `${ user.displayName } was successfully logged in`;
											this.snackbar = true;
											setTimeout( () => { this.$router.push( '/' ) }, this.timeout );
										} );
								} );
							} );
					} )
					.catch( err => {
						console.log( 'Firebase error: ', err.message );
						this.snackbar = true;
					} );
			}
		},
	},
};
</script>

<style scoped>

</style>
