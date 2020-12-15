const mutationTypes = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
	SET_USER: 'SET_USER',
	ADD_VIEW: 'ADD_VIEW',
	addTodo: 'addTodo',
	deleteDoneTodos: 'deleteDoneTodos',
};

const actionTypes = {
	fetchUser: 'fetchUser',
	logout: 'logout',
};

export default {
	namespaced: true,
	state: {
		// User Login Auth
		user: {
			loggedIn: false,
			data: null,
		},

		// Jobs
		views: new Map(),

		// ToDos
		todos: [],
	},
	getters: {
		// Jobs
		getViews( state ) {
			return ( path ) => {
				let count = 0;
				if ( state.views.get( path ) !== undefined ) {
					count = state.views.get( path );
				}
				return count;
			};
		},

		// Todos
	},
	mutations: {
		// User Login Auth
		[ mutationTypes.SET_LOGGED_IN ]( state, value ) {
			state.user.loggedIn = value;
		},
		[ mutationTypes.SET_USER ]( state, data ) {
			state.user.data = data;
			if ( data !== null ) {
				localStorage.setItem( 'refresh-token', data.refreshToken );
			} else {
				localStorage.removeItem( 'refresh-token' );
			}
		},

		// Jobs
		[ mutationTypes.ADD_VIEW ]( state, path ) {
			let count = 1;
			if ( state.views.get( path ) !== undefined ) {
				count = state.views.get( path ) + 1;
			}
			state.views.set( path, count );
		},

		// ToDos
		[ mutationTypes.addTodo ]( state, payload ) {
			state.todos.push( payload );
		},
		[ mutationTypes.deleteDoneTodos ]( state ) {
			state.todos = state.todos.filter( ( todo ) => todo.done !== true );
		},
	},
	actions: {
		// User Login Auth
		[ actionTypes.fetchUser ]( { commit }, user ) {
			commit( 'SET_LOGGED_IN', user !== null );
			if ( user ) {
				commit( 'SET_USER', {
					displayName: user.displayName,
					email: user.email,
					creationTime: user.metadata.creationTime,
					lastSignInTime: user.metadata.lastSignInTime,
					refreshToken: user.refreshToken,
					jwtToken: user.ya,
					uid: user.uid,
				} );
			} else {
				commit( 'SET_USER', null );
			}
		},
		// User Logout
		[ actionTypes.logout ]( { commit }, user ) {
			commit( 'SET_LOGGED_IN', false );
			commit( 'SET_USER', null );
		}
	},
};
