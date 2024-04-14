const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors")
const app = express();

dotenv.config();
app.use(cors())
app.use(morgan('dev'))
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!"));
app.use(express.json())
app.use("/", router);
const server = app.listen(4000, () => {
    console.log(`[server]: Server is running at http://localhost:4000`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});
