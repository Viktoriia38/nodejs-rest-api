const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Vika:tJqjcCymgzZRA0h1@cluster0.lcnxs2e.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.log(error.message));

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
