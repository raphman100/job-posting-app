export default {
	getViews ( state ) {
		return ( path ) => {
			let count = 0;
			if ( state.views.get( path ) !== undefined ) {
				count = state.views.get( path );
			}
			return count;
		};
	},
};
