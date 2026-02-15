import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));
// collect api keys 
app.get('/env/config', (req, res) => {
    res.json({
        transportapiKey: process.env.TRANSPORT_API_KEY,
        transportapiId: process.env.TRANSPORT_API_ID,
        pexelsapiKey: process.env.PEXELS_KEY,
        pexelsimageId: process.env.PEXELS_IMAGE_ID
    });
});
// local host 
app.listen(PORT, () => {
    console.log(` server is runnig at http://localhost:${PORT}`)
})



