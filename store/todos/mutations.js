export default {
	addTodo ( state, payload ) {
		console.log( 'payload: ', payload );
		state.todos.push( payload );
	},
	setTodo ( state, payload ) {
		state.todos.push( {
			completed: payload.completed,
			created: payload.created,
			done: payload.done,
			task: payload.task,
		} );
	},
	deleteDoneTodos ( state ) {
		state.todos = state.todos.filter( ( todo ) => todo.done !== true );
	},
	toggle ( state, todo ) {
		todo.done = !todo.done;
	},
};
