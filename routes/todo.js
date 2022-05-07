const router = require("express").Router();
const { redirect } = require("express/lib/response");
const Todo = require("../models/Todo");

// routes
router
  .post("/add/todo", (req, res) => {
    const todo= req.body
    var status = ""
    if (todo.status === "0") {
      status=false
    }
    else {
      status=true
    }

    const newTodo = new Todo({
      name: todo.name,
      status: status
    })
    newTodo.save()
      .then(() => {
        console.log("success");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })
  .get("/update/status/:_id", (req, res) => {
    var status = ""
      if (req.query.status === "false") {
        status=true
      }
      else {
        status=false
      }
      Todo.updateOne({_id: req.params._id},{$set: {"status": status}})
      .then(() => {
        console.log("update Todo Successfully!");
        res.redirect("/");


      })
      .catch((err) => console.log(err));
  })
  .get("/update/:_id",(req, res) => {    
      Todo.find({_id: req.params._id}, (err,data) =>{  
        if(err){  
            console.log(err)  
        }  
        res.render('editTodo', { edata: data })  
        
      })

    })  
  .post('/update/todo/:_id',(req,res)=>{  
    const todo = req.body
    var status = ""
      if (todo.status === "0") {
        status=false
      }
      else {
        status=true
      }
    Todo.updateOne({ _id: req.params._id }, {
      $set: {
        "name":todo.name,
        "status": status
      }
    })
      .then(() => {
        console.log("update Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

module.exports = router;


