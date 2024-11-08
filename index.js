const express=require("express");
const urlRoute=require("./routes/url")
const app=express();

const PORT=3002;

app.use("/url",urlRoute);

app.listen(PORT,()=>{
    console.log("server is listening at port 3002");
})
