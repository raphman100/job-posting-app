const UrlUtils = {
	extractID( uri ) {
		return uri.substr( uri.length - 36 );
	}
}

export default UrlUtils;
