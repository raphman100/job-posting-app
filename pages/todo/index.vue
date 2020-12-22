<template>
	<v-row>
		<v-col class="text-center">
			<img
				src="@/static/Gravatar.png"
				alt="Vuetify.js"
				class="mb-5"
				height="100px"
				width="100px"
			>
			<h1>My ToDo List</h1>
			<v-layout
				justify-center
			>
				<v-simple-table
					justify-center
					class="todo-table"
				>
					<template v-slot:default>
						<thead>
							<tr>
								<th class="text-left">
									<h3>Current ToDos</h3>
								</th>
								<th class="text-right">
									<h3>Completed</h3>
								</th>
							</tr>
						</thead>
						<tbody v-if="hasToDos">
							<tr
								v-for="( todo, index ) in todos"
								:key="index"
								class="todo-table-rows"
							>
								<td class="text-left">
									<label>
										<input
											type="checkbox"
											:checked="todo.done"
											:disabled="todo.done"
											v-on:change="toggle( todo )">
									</label>
									<span :class="{ done: todo.done }">{{ showTask( todo ) }}</span>
								</td>
								<td class="text-right">
									{{ todo.completed || '' }}
								</td>
							</tr>
						</tbody>
						<v-divider/>
						<tfoot>
							<tr>
								<td colspan="2">
									<v-form
										@submit.prevent="submit()"
									>
											<v-row justify="space-between">
												<v-col>
													<v-text-field
														v-model="todo"
														label="Enter New ToDo Here"
													/>
												</v-col>
												<v-col>
													<v-btn
														align-end
														color="warning"
														style="margin-top: 0.75rem;"
														@click="deleteDoneTodos()"
													>
														Delete Completed
													</v-btn>
												</v-col>
											</v-row>
									</v-form>
								</td>
							</tr>
						</tfoot>
					</template>
				</v-simple-table>
			</v-layout>
		</v-col>
	</v-row>
</template>

<script>
import { mapState } from 'vuex';
import DateUtils from '@/utils/date-utils';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
	head() {
		return {
			title: 'My ToDo List',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'My ToDo List'
				}
			]
		};
	},
	data() {
		return {
			todo: '',
		};
	},
	computed: {
		...mapState( {
			todos: ( state ) => state.todos.todos,
		} ),
		hasToDos() {
			return this.todos.length > 0;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			await this.$store.commit( 'todos/clearTodos' );
			firebase.firestore().collection( 'todos' ).get().then( ( res ) => {
				console.log( 'res: ', res );
				res.forEach( ( rec ) => {
					console.log( 'rec.data: ', rec.data() );
					this.$store.commit( 'todos/addTodo', { data: rec.data(), where: 'init' } );
				} );
				console.log( 'mounted: ', this.todos );
			} );

		},
		submit() {
			console.log( '***submit called***' );
			if ( this.todo ) {
				let createDate = DateUtils.formatCurrentDateTime( 'YYYY-MM-DD HH:mm:ss')
				console.log( 'submit: ', this.todo );
				firebase.firestore().collection( 'todos' ).add( {
				} ).then( ( res ) => {
					firebase.firestore().collection( 'todos' ).doc( res.id ).set( {
						task: this.todo,
						done: false,
						created: createDate,
						completed: null,
					} ).then( ( res ) => {
						this.$store.commit( 'todos/addTodo', {
							data: {
								id: res.id,
								task: this.todo,
								done: false,
								created: createDate,
								completed: null,
							},
							where: 'submit',
						} )
					} ).then( () => {
						this.todo = '';
					} )
				} )
			}
		},
		deleteDoneTodos() {
			firebase.firestore().collection( 'todos' ).get().then( ( res ) => {
				console.log( 'delete res: ', res );
				res.forEach( ( rec ) => {
					console.log( 'rec.data: ', rec.data() );
					this.$store.commit( 'todos/addTodo', { data: rec.data(), where: 'init' } );
				} );
				console.log( 'mounted: ', this.todos );
			} );

			console.log( 'Delete done' );
			this.$store.commit( 'todos/deleteDoneTodos' );
		},
		toggle( todo ) {
			this.$store.commit( 'todos/toggle', todo );
		},
		showTask( todo ) {
			return todo.task;
		},
	},
};
</script>

<style lang="scss">
.todo-table {
	width: 75%;
	padding: 1.0rem 2.0rem;

	.todo-table-rows {
		margin-left: 1.5rem;
	}

	.input[type=checkbox]:checked label {
		text-decoration: line-through;
		color: yellow;
	}

	.done {
		text-decoration: line-through;
		color: goldenrod;
	}
}
</style>
