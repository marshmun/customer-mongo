const express = require('express');
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const app = express();
const dbUrl = "mongodb://localhost:27017/person";

let DB;
let TIYPEOPLE;

const mustache = require("mustache-express")


mongoClient.connect(dbUrl, function (err, db) {
    if (err) {
        console.warn("Error connecting to database", err);
    }

    DB = db;
    TIYPEOPLE = db.collection("dbpersons");
});

// TIYPEOPLE.find({}).toArray(function (err, foundPeople) {
//     if (err) {
//         res.status(500).send(err);
//     }

//     res.send(foundPeople);
// });

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get("/", function (req, res) {
    TIYPEOPLE.find({}).toArray(function (err, foundPeople) {
        if (err) {
            res.status(500).send(err)
        }
        res.render("index", { listedUsers: foundPeople });
    })
});
app.get("/employed", function (req, res) {
    TIYPEOPLE.find({ "job": { $ne: null } }).toArray(function (err, foundPeople) {
        if (err) {
            res.status(500).send(err)
        }
        res.render("index", { listedUsers: foundPeople });
    })
})

app.get("/unemployed", function (req, res) {
    TIYPEOPLE.find({ "job": null }).toArray(function (err, foundPeople) {
        if (err) {
            res.status(500).send(err)
        }
        res.render("index", { listedUsers: foundPeople });
    })
})
app.use(express.static('views'))

app.get("/:id", function (req, res) {
    res.render("indvProfile", { listedUsers: data.users[req.params.id] });
});

app.use(express.static('views'))


app.listen(4000, function () {
    console.log('Successfuly started express app!');
});



