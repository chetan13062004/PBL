const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Define the schema for the users collection
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb+srv://chetanbochare13pict:chetan@cluster0.znhdwjf.mongodb.net/SIGNUP?retryWrites=true&w=majority&appName=Cluster0');

var db = mongoose.connection;
db.on('error', (err) => console.error("Error in connecting to db:", err));
db.once('open', () => console.log("Connected to database"));

app.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        name: name,
        email: email,
        password: password
    });

    newUser.save()
        .then((user) => {
            console.log("Record inserted successfully:", user);
            return res.redirect('signup.html');
        })
        .catch((err) => {
            console.error("Error inserting data:", err);
            return res.status(500).send("Error inserting data");
        });
});



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
