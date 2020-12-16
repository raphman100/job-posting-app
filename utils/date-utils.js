const DateUtils = {
	formatCurrentDateTime( format ) {
		let date = new Date();

		return this.formatDate( date, format );
	},
	formatDate( date, format ) {
		console.log( 'date: ', date );
		console.log( 'format: ', format );
		const map = {
			yy: date.getFullYear().toString().slice( -2 ),
			yyyy: date.getFullYear(),
			mm: date.getMonth() + 1,
			dd: date.getDate(),
		};
		return format.replace(/mm|dd|yy|yyyy/gi, matched => map[ matched ]);
	},
}

export default DateUtils;
