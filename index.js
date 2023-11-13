import express from 'express';
import cors from 'cors';
import axios from 'axios'

const app = express();
const port = 3001; 

app.use(cors());

app.get('/apiCall', async (req, res) => {
    try {
        const apiData = await axios.get('https://arbeitnow.com/api/job-board-api');

        res.json(apiData.data);
    } catch (e) {
        console.error('Error making API call:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send("Currently in BACKEND");
});

app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});