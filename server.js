// require("dotenv").config();
// const mongoose = require('mongoose')
// // mongoose.connect('mongodb://127.0.0.1:27017/restful-auth-apis')
// mongoose.connect('mongodb+srv://patelrajeev10342:IjF9uRRJJJkisQzZ@authcluster.apnpr.mongodb.net/?retryWrites=true&w=majority&appName=authCluster')

// const express = require("express");
// const path = require('path')
// const cors = require("cors")
// const app = express();
// app.use(express.json());
// const PORT = 3008;
// const userRoute = require('./routes/userRoute');
// const authRoute = require("./routes/authRoute");
// app.set('view engine','ejs');
// app.set('views',path.resolve('./views'));
// app.set('views', path.join(__dirname, 'views'));
// app.use("/api",userRoute);
// app.use("/",authRoute);


// app.use()

// // app.use(cors({
// //     origin: 'http://localhost:3000',  // Frontend running on localhost
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
// //     allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
// //     credentials: true  // Allow credentials (cookies, authorization headers, etc.)
// //   }));
  
//   // Handle preflight requests (OPTIONS method)
// //   app.options('*', cors()); 

// app.options('*', (req, res) => {
//     console.log('Preflight request received:', req.headers);
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.sendStatus(200);
//   });
  


// app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));


// const express = require("express");
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/restful-auth-apis')
// mongoose.connect('mongodb+srv://patelrajeev10342:IjF9uRRJJJkisQzZ@authcluster.apnpr.mongodb.net/?retryWrites=true&w=majority&appName=authCluster')
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// const PORT = 3008;
// const userRoute = require("./routes/userRoute");
// const authRoute = require("./routes/authRoute");

// // CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:3000',  // Allow requests only from your frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
//   credentials: true,  
// };

// app.use(cors(corsOptions));  

// // JSON Parsing middleware
// app.use(express.json());

// app.use("/api", userRoute);
// app.use("/", authRoute);

// // Handle preflight requests (OPTIONS method)
// app.options('*', cors(corsOptions));

// // Start the server
// app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));








require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();
const PORT = 3008;
const connectDB = require("./connectDb/mongConnect")

connectDB()


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests only from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow sending cookies or authorization headers
};

// Middleware
app.use(cors(corsOptions));  // Apply CORS middleware
app.use(express.json());  // JSON Parsing middleware



// Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
app.use("/api", userRoute);
app.use("/", authRoute);

// Handle preflight requests (OPTIONS method)
app.options('*', cors(corsOptions));

// Start the server
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));