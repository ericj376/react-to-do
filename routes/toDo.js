var express = require('express');
var router = express.Router();

var ToDo = require('../models/toDo');
router.route('/toDo')
.post(function(req, res){

		var toDo = new ToDo();
		
		toDo.name = req.body.name;
		toDo.id = req.body.id;
		toDo.dueDate = req.body.dueDate;
		toDo.description = req.body.description;

		toDo.save(function(err, toDo){
			if(err){
				res.status(400).json(err);
			} else {
				res.json(toDo);
			}
		})
	})

.get(function(req, res){
	ToDo.find(function(err, toDo){
		if(err){
			console.log(err);
			res.status(400).end();
		} else {
			res.json(toDo);
		}
	})
});

router.route('/toDo/:toDo_id')
.get(function(req, res){
	ToDo.findById(req.params.toDo_id, function(err, toDo){
		if(err){
			console.log(err)
		} else {
			res.json(toDo);
		}
	})
})

.put(function(req, res){
	ToDo.findById(req.params.toDo_id, function(err, toDo){
		if(err){
			console.log(err)
		} else {
			
			toDo.name = req.body.name || toDo.name;
			toDo.id = req.body.id || toDo.id;
			toDo.dueDate = req.body.dueDate || toDo.dueDate;
			toDo.description = req.body.description || toDo.description;

			toDo.save(function(err){
				if (err){
					console.log(err)
				} else {
					res.json({title: 'toDo updated'});
				}
			})
		}
	})
})

.delete(function(req, res){
	ToDo.remove({_id: req.params.toDo_id}, function(err, toDo){
		if (err){
			console.log(err)
		} else {
			res.json({title:"Deleted successfully"})
		}
	})
});

module.exports = router;