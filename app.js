var express = require("express");
var fs = require("fs"); //file system for read file
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var id = 0;

app.get('/', function(req, res) {
    res.send("Sample for REST");
})

//Get all user
app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

//Show by ID
app.get('/showbyID/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

//Add 1 User
app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        // data["user4"] = user["user4"];
        data["user" + (Object.keys(data).length + 1)] = req.body; //ตรงนี้ควรใส่ลูปเพื่อให้มันสามารถวนใส่ข้อมูลของมันได้เอง เหมือนเป็นอาร์เรย์ วนใส่ข้อมุลลงอาร์เรย์ตัวนึงอ่ะ
        req.body.id = Object.keys(data).length;
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

//Add Multi user
app.post('/addMultiUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        // data["user4"] = user["user4"];
        (req.body).forEach((item, index) => {
            data["user" + (Object.keys(data).length + 1)] = item;
            item.id = Object.keys(data).length; 
        })
        
        //data[id] = req.body; //ตรงนี้ควรใส่ลูปเพื่อให้มันสามารถวนใส่ข้อมูลของมันได้เอง เหมือนเป็นอาร์เรย์ วนใส่ข้อมุลลงอาร์เรย์ตัวนึงอ่ะ
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

//Delete by ID
app.delete('/deleteUser/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);

        delete users["user" + req.params.id];

        console.log(users);
        res.end(JSON.stringify(users));
    });
})

//Delete
app.delete('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data[id];

        console.log(data);
        res.end(JSON.stringify(data));
    });
})

var server = app.listen(8080, function () {
    var port = server.address().port

    console.log("Sample code for RESTful API run at ", port)
})