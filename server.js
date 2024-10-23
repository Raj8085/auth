require("dotenv").config();
const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/restful-auth-apis')
mongoose.connect('mongodb+srv://patelrajeev10342:IjF9uRRJJJkisQzZ@authcluster.apnpr.mongodb.net/?retryWrites=true&w=majority&appName=authCluster')

const express = require("express");
const path = require('path')
const cors = require("cors")
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


app.use(cors({
    origin: 'http://localhost:3000',  // Frontend running on localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true  // Allow credentials (cookies, authorization headers, etc.)
  }));
  
  // Handle preflight requests (OPTIONS method)
  app.options('*', cors()); 

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));


