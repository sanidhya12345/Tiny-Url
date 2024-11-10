const express=require("express");
const urlRoute=require("./routes/url")
const {connectToMongodb}=require("./connect")
const app=express();

const PORT=3002;

app.use(express.json())
connectToMongodb('mongodb://localhost:27017/short-url').then(()=>{
    console.log("mongodb connected succesfully")
})


app.use("/url",urlRoute);

app.listen(PORT,()=>{
    console.log("server is listening at port 3002");
})
