export default {
	login( state, value ) {
		state.user.loggedIn = value;
	},
	setUser( state, data ) {
		state.user.data = data;
		if ( data != null ) {
			localStorage.setItem( 'refresh-token', data.refreshToken );
		} else {
			localStorage.removeItem( 'refreshToken' );
		}
	}
}
