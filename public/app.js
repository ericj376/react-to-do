var deleteToDo = function(){
	var id = $(event.target).closest('tr').attr('id');
	var toDo = $(event.target).closest('tr');
	
	if (confirm("Are you sure you want to make this To Do go away?")) {	
	$.ajax({//method that allows us to comm with our database aka =postman

		url: '/api/toDo/' + id,
		method: 'DELETE',
	}).done(function(){
		toDo.remove();
	})
}
}

var addToDo = function(event){
	event.preventDefault();
	var name = $('#name').val();
	var id = $('#id').val();
	var dueDate = $('#dueDate').val();
	var description = $('#description').val();
	var $table = $('#toDoTable');
	var toDo = {};
		toDo.name = name;
		toDo.id = id;
		toDo.dueDate = dueDate;
		toDo.description = description;
	
	$.ajax({
		url: '/api/toDo',
		method: "POST",
		data: toDo,
	}).done(function(data){
		console.log("worked", data);

		$table.append('<tr id=' + data._id + '>\
                   <td>' + data.name + '</td>\
                   <td>' + data.id + '</td>\
                   <td>' + data.dueDate + '</td>\
                   <td>' + data.description + '</td>\
                   <td><button class="btn btn-danger deleteToDo">Delete</button></td>\
                 </tr>'
               );
			
			$('.deleteToDo').on('click', deleteToDo);
	})
	$('#name').val("");
	$('#id').val("");
	$('#dueDate').val("");
	$('#description').val("");
}
$('.deleteToDo').on('click', deleteToDo);
$("#addToDo").on("click", addToDo);

//public side browser, not node, using jquery and html