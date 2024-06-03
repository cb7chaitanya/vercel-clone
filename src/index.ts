import express from "express"
import cors from "cors"
import simpleGit from "simple-git"
import { generateId, getAllFiles } from "./utils"
import path from "path"

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.post("/upload", async (req,res) => {
    try{
        const url = req.body.url
        const id = generateId()
        await simpleGit().clone(url,`out/${id}`)

        const files = getAllFiles(path.join(__dirname,`out/${id}`))

        return res.json({
            msg: "Repo URL Recieved",
            url: url,
            id
        })
    } catch(err:any){
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
})


app.listen(3000, () => console.log("Server is running on port 3000"))