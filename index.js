const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongodb } = require("./connect");
const app = express();
const URL = require("./models/url");
const PORT = 3002;

app.use(express.json());
connectToMongodb("mongodb://localhost:27017/short-url").then(() => {
  console.log("mongodb connected succesfully");
});

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry=await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp:Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectUrl)
});

app.listen(PORT, () => {
  console.log("server is listening at port 3002");
});
