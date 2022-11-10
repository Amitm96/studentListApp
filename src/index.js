const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const router = require("./routes/route")
const app = express();

app.use(cors())
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Amitmaz96:5YOiTjMdLmeCiWAC@cluster1.mdpsbcj.mongodb.net/studentsDB?retryWrites=true&w=majority" , {useNewUrlParser : true})
.then(() => console.log("Mongodb is connected"))
.catch((err) => console.log(err.message))

app.use("/" , router);

app.listen(5000 , () => console.log("App running on port 5000"))