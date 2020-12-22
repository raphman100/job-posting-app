export default {
	addTodo ( state, payload ) {
		console.log( `addTodo from ${ payload.where } : `, payload.data );
		state.todos.push( {
			id: payload.data.id,
			task: payload.data.task,
			done: payload.data.done,
			created: payload.data.created,
			completed: payload.data.completed,
		} );
	},
	clearTodos ( state ) {
		state.todos = [];
	},
	deleteDoneTodos ( state ) {
		state.todos = state.todos.filter( ( todo ) => todo.done !== true );
	},
	toggle ( state, todo ) {
		todo.done = !todo.done;
	},
};
