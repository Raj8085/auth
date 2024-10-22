require("dotenv").config();
const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/restful-auth-apis')
mongoose.connect('mongodb+srv://patelrajeev10342:IjF9uRRJJJkisQzZ@authcluster.apnpr.mongodb.net/?retryWrites=true&w=majority&appName=authCluster')

const express = require("express");
const path = require('path')
const app = express();
app.use(express.json());
const PORT = 3008;
const userRoute = require('./routes/userRoute');
const authRoute = require("./routes/authRoute");
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.set('views', path.join(__dirname, 'views'));
app.use("/api",userRoute);
app.use("/",authRoute);

app.get("/test",async(req,res)=>{
    return res.render('home')
})

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));


