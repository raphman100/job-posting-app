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
									<h2>Current ToDos</h2>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="( todo, index ) in todos"
								:key="index"
								class="todo-table-rows"
							>
								<v-layout
									justify-start
									align-center
								>
									<td>
										<label>
											<input type="checkbox" :checked="todo.done" v-on:change="toggle( todo )">
										</label>
										<span :class="{ done: todo.done }">{{ todo.task }}</span>
									</td>
								</v-layout>
							</tr>
						</tbody>
						<v-divider/>
						<tfoot>
							<v-container>
								<v-form
									@submit.prevent="submit()"
								>
										<v-row justify="space-between">
											<v-col>
												<v-text-field
													v-model="todo"
													label="Enter New ToDo Here"
													@keydown.enter="submit()"
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
							</v-container>
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
	},
	mounted() {
		firebase.firestore().collection( 'todos' ).get().then( ( res ) => {
			res.forEach( ( rec ) => {
				// console.log( 'rec.data 1: ', rec.data() );
				this.$store.commit( 'todos/setTodo', rec.data() );
			} );
		} );

	},
	methods: {
		submit() {
			if ( this.todo ) {
				this.$store.commit( 'todos/addTodo', {
					task: this.todo,
					done: false,
					created: DateUtils.formatCurrentDateTime( 'yyyy-mm-dd'),
					completed: null
				} );
				this.todo = '';
			}
		},
		deleteDoneTodos() {
			console.log( 'Delete done' );
			this.$store.commit( 'todos/deleteDoneTodos' );
		},
		toggle( todo ) {
			this.$store.commit( 'todos/toggle', todo );
		},
	},
};
</script>

<style lang="scss">
.todo-table {
	width: 50%;
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
	}
}
</style>
