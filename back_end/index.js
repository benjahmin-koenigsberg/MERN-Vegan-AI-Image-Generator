import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import path from 'path'

dotenv.config();

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)



app.get('/', async (req, res) => {
    res.send('Hello from DALL-E')
})



    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

const startServer = async () => {

    try {
        connectDb(process.env.MONGO_URL)
        app.listen(8080, () => {
            console.log('Server has started port 8080 🚀')
        })
    } catch (error) {
        console.log(error)

    }

}

startServer()
