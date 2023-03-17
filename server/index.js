import express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import postRouter from "./routes/posts.js"
import dalleRoutes from "./routes/dalle.js"
import authRouter from "./routes/auth.js"
import connectDB from "./mongoDb/connec.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use('/api/v1/post',postRouter);
app.use('/api/v1/dalle',dalleRoutes);
app.use('/user',authRouter)


app.get('/', async(req,res)=>{
    res.send('Hello from DALL-E!');
})

const startServer = async ()=>{
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8000, () => console.log('Server has started on port http://localhost:8000'))

    } catch (error) {
        console.log(error);
    }    
}

startServer();