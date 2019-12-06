const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require('express-jwt');
const PORT = process.env.PORT || 5000;
require('dotenv').config()

app.use(morgan("dev"));
app.use(express.json());


//connect to db
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/todo-auth-example",
{ useNewUrlParser: true },
(err) => {
    if (err) throw err;
    console.log("Connected to the database");
}
);

app.use("/api", expressJwt({secret: process.env.SECRET}))
app.use('/auth', require('./routes/auth'))
app.use("/api/todo", require("./routes/todo"));

// app.use((err, req, res, next) => {
//     console.error(err);
//     return res.send({ message: err.message });
// });

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`);
});
