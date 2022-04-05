const axios = require('axios');
const express = require('express');
const cors = require('cors');
let cron = require('node-cron');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Node.js Running');
});


// call api normaly

let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
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
        console.log('rased1');
        resolve(jsonData);

        app.get('/jsonData', (req, res) => {
            res.send(jsonData)
        });
    }
});

// Call api every 10 minutes

cron.schedule('*/10 * * * *', () => {
    console.log('running a task every 10 minute');

    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
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
            console.log('Rased2');
            resolve(jsonData);

            app.get('/jsonData', (req, res) => {
                res.send(jsonData)
            });
        }
    });

});


app.listen(port, () => {
    console.log('Listening to port ', port);
})