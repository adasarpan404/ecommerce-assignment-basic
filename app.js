const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes");
const morgan = require("morgan");
const app = express();

dotenv.config();
app.use(morgan('dev'))
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!"));
app.use(express.json())
app.use("/", router);
const server = app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});
