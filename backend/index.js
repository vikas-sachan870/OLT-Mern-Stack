const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
const corsOptions = {
  origin: /\.onrender\.com$/,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
app.use(cors(corsOptions));
// Ensure your database connection file is correctly set up
require("./conn/conn");
// Import the user routes
const user = require("./routes/user");
const quizes =require("./routes/quiz");
const result =require("./routes/result");
app.use("/api/v1", user,quizes,result);

// Start the server
app.listen(1000, () => {
  console.log('Server listening on port 1000');
});
