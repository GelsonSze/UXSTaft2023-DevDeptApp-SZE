import express from 'express';
import cors from 'cors';
import axios from 'axios'
import ViteExpress from 'vite-express'

const app = express();
// ViteExpress.config({ mode: "production" })
const port = 3001; 

app.use(cors());

app.get('/apiCall', async (req, res) => {
    try {
        var pageNumber = req.query.pageNumber;
        const apiData = await axios.get(`https://arbeitnow.com/api/job-board-api?page=${pageNumber}`);
        console.log(apiData.data)
        res.json(apiData.data);
    } catch (e) {
        console.error('Error making API call:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

ViteExpress.listen(app, port, ()=> console.log(`Vite Express server running on port: ${port}`))