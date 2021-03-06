<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in menuItems"
					:key="i"
					:to="item.to"
					router
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"/>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			:clipped-left="clipped"
			fixed
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
			<v-btn
				icon
				@click.stop="miniVariant = !miniVariant"
			>
				<v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
			</v-btn>
			<v-btn
				icon
				@click.stop="clipped = !clipped"
			>
				<v-icon>mdi-application</v-icon>
			</v-btn>
			<v-btn
				icon
				@click.stop="fixed = !fixed"
			>
				<v-icon>mdi-minus</v-icon>
			</v-btn>
			<v-toolbar-title v-text="title"/>
			<v-spacer/>
			<v-btn
				icon
				@click.stop="rightDrawer = !rightDrawer"
			>
				<v-icon>mdi-menu</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt/>
			</v-container>
		</v-main>
		<v-navigation-drawer
			v-model="rightDrawer"
			:right="right"
			temporary
			fixed
		>
			<v-list>
				<v-list-item @click.native="right = !right">
					<v-list-item-action>
						<v-icon light>
							mdi-repeat
						</v-icon>
					</v-list-item-action>
					<v-list-item-title>Switch drawer (click me)</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-footer
			:absolute="!fixed"
			app
		>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
// Vuex
import {mapGetters} from 'vuex';

export default {
	data() {
		return {
			clipped: false,
			drawer: false,
			fixed: false,
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Vuetify.js',
			log: true,
		};
	},
	computed: {
		...mapGetters( {
			isLoggedIn: 'auth/loggedIn',
		} ),
		menuItems() {
			return (this.isLoggedIn)
				? [
					{icon: 'mdi-apps', title: 'Home', to: '/'},
					{icon: 'mdi-account-multiple-outline', title: 'Jobs', to: '/jobs'},
					{icon: 'mdi-checkbox-marked-circle-outline', title: 'ToDo', to: '/todo'},
					{icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire'},
					{icon: 'mdi-guy-fawkes-mask', title: 'About', to: '/about'},
					{icon: 'mdi-logout', title: 'Log Out', to: '/logout'}
				]
				: [
					{icon: 'mdi-apps', title: 'Home', to: '/'},
					{icon: 'mdi-account-multiple-outline', title: 'Jobs', to: '/jobs'},
					{icon: 'mdi-checkbox-marked-circle-outline', title: 'ToDo', to: '/todo'},
					{icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire'},
					{icon: 'mdi-guy-fawkes-mask', title: 'About', to: '/about'},
					{icon: 'mdi-login', title: 'Log In', to: '/login'}
				];
		}
	},
};
</script>
