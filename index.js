const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

app.get('/', (req, res) => {
    res.send('Node.js Running');
});



let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
            headers: {
                'X-CMC_PRO_API_KEY': `${process.env.API_PASS}`,
            },
        });
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    }
    if (response) {
        // success
        const jsonData = response.data;
        console.log(jsonData);
        resolve(jsonData);

        app.get('/jsonData', (req, res) => {
            res.send(jsonData)
        });
    }
});

app.listen(port, () => {
    console.log('Listening to port ', port);
})