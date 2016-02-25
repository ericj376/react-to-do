var TodoList = React.createClass({
	render: function() {
		var self = this;

		var todosList = self.props.todos.map(function(t){
			return (
				<div className="panel panel-default">
		  			<div className="panel-heading">
		    			<h3 className="panel-title"> { t.name } </h3>
		 			</div>
		  			<div className="panel-body">
		    			<p> { t.description } </p>
		    		</div>
		    		<div className="panel-footer">
		    			<p> { t.dueDate } </p>
		  			</div>
		  			
		  			<button className="btn btn-warning" onClick={ self.props.handleDelete.bind(null, t._id) } >Delete</button>
				</div>
			)
		});

		return (
			<div>
				<p> { todosList } </p>
			</div>
		);
	}
});

var TodoForm = React.createClass({
	getInitialState: function() {
		return {
			name: '',
			description: '',
			dueDate: ''
		}
	},

	handleNameChange: function(evt, field) {
		this.setState({
			name: evt.target.value
		});
		console.log(this.state);
	},

	handleDescriptionChange: function(evt) {
		this.setState({
			description: evt.target.value
		});
		console.log(this.state);
	},

	handleDueDateChange: function(evt) {
		this.setState({
			dueDate: evt.target.value
		});
		console.log(this.state);
	},

	formSubmitted: function(evt) {
		evt.preventDefault();

		var name = this.state.name;
		var description = this.state.description;
		var dueDate = this.state.dueDate;

		this.props.createNewTodo(name, description, dueDate);

		this.setState({
			name: '',
			description: '',
			dueDate: ''
		});
	},

	render: function() {

		return (
				<form role="form">
					<legend>Add To-Do</legend>
				
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="name" placeholder="Name..." />
					</div>
				
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="Description..." />
					</div>
				
					<div className="form-group">
						<label htmlFor="dueDate">Due Date</label>
						<input onChange={this.handleDueDateChange} value={this.state.dueDate} type="date" className="form-control" id="dueDate" placeholder="Due Date..." />
					</div>
				
					<button onClick={this.formSubmitted} className="btn btn-primary" >Add To-Do</button>
				</form>
		)
	}
});

var App = React.createClass({

	getInitialState: function() {
		return {
			todos: []
		}
	},

	loadTodosFromServer: function() {
		var self = this;

		$.ajax({
			url: '/api/todo',
			method: 'GET'
		}).done(function(data) {
			self.setState({
				todos: data
			});	
		});
	},

	componentDidMount: function() {
		this.loadTodosFromServer();
	},

	handleDelete: function(todoId) {
		var self = this;

		$.ajax( {
			url: '/api/todo/' + todoId,
			method: 'DELETE'
		}).done(function() {
			self.loadTodosFromServer();
		});
	},

	createNewTodo: function(name, description, dueDate) {
		var self = this;

		console.log('in createNewTodo');

		$.ajax( {
			url: '/api/todo',
			method: 'POST',
			data: {name, description, dueDate}
		}).done(function(newTodo) {
			self.loadTodosFromServer();
		}).fail(function(err) {
			console.log(err);
			alert("Create To-Do Failed!");
		});
	},
	
	render: function() {
		return (
			<div>
				<div>
					<h3> TODO LIST </h3>
					< TodoList todos={ this.state.todos } handleDelete={this.handleDelete} />
				</div>

				<div>
					< TodoForm createNewTodo={this.createNewTodo} />
				</div>
			</div>
		)
	}
});

React.render(<App />, document.getElementById('app'));