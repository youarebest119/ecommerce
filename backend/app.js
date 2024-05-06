const express = require("express");
const errorMiddleware = require("./middlewares/error");
const dotenv = require("dotenv");
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const cors = require('cors');
dotenv.config();
const app = express();
const { DB_URI } = require("./utils/constants");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors({
    origin: "*"
}));
app.use(express.static(__dirname + '/images'));


mongoose.Promise = global.Promise;
const connectDb = async () => {
    await mongoose.connect(DB_URI, {});
}

connectDb();

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const { createProducts } = require("./data");
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/user", userRoutes)



app.get('/', function (req, res) {
    res.status(200).send(`Welcome`);
});
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)',
        success: false,
    })
});

// app.use((error, req, res, next) => {
//     res.status(error.status || 500).send({
//         error: {
//             status: error.status || 500,
//             message: error.message || "Internal Server Error",
//         },
//     });
// });

// createProducts();

app.use(errorMiddleware)

module.exports = app;