import express from 'express';
import cors from 'cors';
import axios from 'axios'
import ViteExpress from 'vite-express'

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
// ViteExpress.config({ mode: "production" })
const port = 3001; 

app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.get('/apiCall', async (req, res) => {
    try {
        const apiData = await axios.get('https://arbeitnow.com/api/job-board-api');

        res.json(apiData.data);
    } catch (e) {
        console.error('Error making API call:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname, 'dist/index.html');
});

ViteExpress.listen(app, port, ()=> console.log(`Vite Express server running on port: ${port}`))