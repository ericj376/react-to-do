{ 
	"name": "CRUD", 
	"id": 1, 
	"dueDate": "11/11/16", 
	"description": "get the just...", 

}

{ 	
"GET /toDos": { 
	"desc": "returns all toDo", 
	"response": "200 application/json", 
	"data": [{}, {}, {}] 
},

"GET /toDos/:id": 
{ 
	"desc": "returns one toDo respresented by its id", 
	"response": "200 application/json", 
	"data": {} 
},

"POST /toDos": 
{ 
	"desc": "create and returns a new toDo uisng the posted object as the toDo", 
	"response": "201 application/json", 
	"data": {} 
},

"PUT /toDos/:id": 
{ 
	"desc": "updates and returns the matching toDo with the posted update object", 
	"response": "200 application/json", 
	"data": {} 
},

"DELETE /toDos/:id": 
{ 
	"desc": "deletes and returns the matching toDo", 
	"response": "200 application/json", 
	"data": {} 
} 
}