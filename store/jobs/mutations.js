export default {
	addView ( state, path ) {
		let count = 1;
		if ( state.views.get( path ) !== undefined ) {
			count = state.views.get( path ) + 1;
		}
		state.views.set( path, count );
	},
};
