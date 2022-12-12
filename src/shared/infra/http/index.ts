import express from "express";
import "../database/mongo/config"
import TodoRouter from "../../../modules/todo/routes/todo.router";


const app = express();
const PORT = process.env.PORT || 8000
app.use(express.json())

app.use("/", TodoRouter)

app.listen(PORT,()=>{
    console.log("Server connected")
})
