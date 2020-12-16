export default {
	fetchUser ( { commit }, user ) {
		commit( 'login', user != null );
		if ( user ) {
			commit( 'setUser', {
				displayName: user.displayName,
				email: user.email,
				creationTime: user.metadata.creationTime,
				lastSignInTime: user.metadata.lastSignInTime,
				refreshToken: user.refreshToken,
				jwtToken: user.ya,
				uid: user.uid,
			} );
		}
	},
	logout ( { commit }, user ) {
		commit( 'login', false );
		commit( 'setUser', null );
	},
};
