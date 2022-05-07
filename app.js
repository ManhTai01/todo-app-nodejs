var express = require('express');
var app = express();
var mongoose=require('mongoose')
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const { redirect } = require('express/lib/response');
app.use(bodyParser.urlencoded({ extended: true })); 
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'))
mongoose.connect("mongodb://localhost:27017/todo-app")
// routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))

app.get('/', function (req, res) {
    Item.find({}, function (err, f) {
        if (f.length === 0) {
            Item.insertMany(d, function (err) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('succsess');
                }
            })
            res.redirect("/");
        }
        else {
            res.render("list", { newItem: f });
        }
    });
});

app.post('/', function (req, res) {
    var i = req.body.n;
    const item = new Item({
        name:i
    })
    item.save()
    res.redirect("/");
});
app.post("/delete",function(req, res){
    Item.findByIdAndRemove(req.body.checkbox, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("deleted");
            res.redirect("/")
        }
    })
})
app.post("/update",function(req, res){
    Item.findByIdAndRemove(req.body.checkbox, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("deleted");
            res.redirect("/")
        }
    })
})
app.listen(3000, function () {
    console.log('listen on port 3000')
});