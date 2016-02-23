var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDoSchema = new Schema({
	name: {
		type : String,
	 	required: true,	
	},
	id: {
		type: Number,
		required: true,
	},
	dueDate: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model('ToDo', ToDoSchema);