/** @format */

const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongodb } = require("./connect");
const staticRoute = require("./routes/staticRouter");
const app = express();
const URL = require("./models/url");
const path = require("path");

const PORT = 3002;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/new", async (req, res) => {
  const allUrl = await URL.find();
  return res.render("home", {
    urls: allUrl,
  });
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

connectToMongodb("mongodb://localhost:27017/short-url").then(() => {
  console.log("mongodb connected succesfully");
});

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  }
});

app.listen(PORT, () => {
  console.log("server is listening at port 3002");
});
