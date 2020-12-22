const DateUtils = {
	formatCurrentDateTime( format ) {
		let date = new Date();
		return this.formatDate( date, format );;
	},
	formatDate( date, format ) {
		const map = {
			YYYY: date.getFullYear(),
			MM: date.getMonth() + 1,
			DD: date.getDate(),
			HH: date.getHours(),
			mm: date.getMinutes(),
			ss: date.getSeconds(),

		};
		return format.replace(/MM|DD|YYYY|HH|mm|ss/g, matched => map[ matched ]);
	},
}

export default DateUtils;
