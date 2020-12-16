export default function ( { store, route } ) {
	store.commit( 'jobs/addView', route.path );
};
