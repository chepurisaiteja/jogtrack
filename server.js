const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const app = express();
var moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.get("/", (req, res) => {
//   res.sendFile("/jogtrack/src/app/app.component.html");
// });
var mongoUrl =
  "mongodb+srv://sai:sai@cluster0.uhyla.mongodb.net/test?retryWrites=true&w=majority";

var db;
var usercol;
MongoClient.connect(
  "mongodb+srv://sai:sai@cluster0.uhyla.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    db = client.db("tracker");
    usercol = db.collection("userdeatils");

    if (err) return console.error(err);
    console.log("Connected to Database");
  }
);

app.use(express.static(path.join(__dirname, "./dist/jogtrack")));

app.post("/entries", (req, res) => {
  usercol.insertOne(req.body).then((result) => {
    console.log(req.body);
    // res.redirect("/");
    res.send({ message: "success", result: result });
  });
});


app.post("/data", (req, res) => {
  let d=req.body.date;
  let curr;
  console.log(d.length + d);
  let len=d.length;
  let d1;
  if(len==0)
  {
    console.log(len)
    curr=new Date();
    console.log("1");
  }
  else{
  d1=new Date(d);   
curr=new Date((moment(d1).format("YYYY-MM-DD")));
console.log("2");
}
   console.log(curr);
console.log(curr   + curr.getDay());
let last = new Date(curr);

if (curr.getDay() == 0) {
  curr.setDate(curr.getDate() - 1);
}
let week = []

for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}

// let day = curr.getDate() - curr.getDay() + 1;
// let first = new Date(curr.setDate(day)).toISOString().slice(0, 10);
// let day1=last.getDate()-last.getDay()+7;
// last = new Date(last.setDate(day1)).toISOString().slice(0, 10);
// console.log(last + "  " + first)
let first=week[0];
 last=week[6];
var query = { date: { $gte: first, $lte: last } };

usercol.find(query).toArray(function (err, result) {
  if (err) throw err;
//     let dist = 0;
//     let time = 0;
//     let l = result.length;
//     var  jsonObj=[];
//     for (i = 0; i < l; i++) {
//       let da=new Date(result[i].date);
//       let da1=da.getDay();
//         console.log(weekday[da1]);
//                item = {}
//                item ["label"] = weekday[da1];
//                item ["value"] = result[i]['distance'];
//                jsonObj.push(item);    
//     }
//     console.log("average distance " + Math.round(dist / l));
//     console.log("average speed" + Math.round(dist / time));
//     console.log(first);
//     console.log(last);
// console.log(jsonObj)
  res.send({ message: "success", result: result });
});
});

app.listen(3000, function () {
  console.log("listening on 3000");
});