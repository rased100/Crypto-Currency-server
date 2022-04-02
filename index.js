const axios = require('axios');
const express = require('express');
const cors = require('cors');
let cron = require('node-cron');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// const port = 5000;

app.get('/', (req, res) => {
    res.send('Node.js Running');
});


let response = null;
new Promise(async (resolve, reject) => {
    try {
        // response = await axios.get('https://pro-api.coinmarketcap.com/v1/exchange/info', {
        // response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info', {
        // response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {

        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            // response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
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


let response2 = null;
new Promise(async (resolve, reject) => {
    try {
        response2 = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
            headers: {
                'X-CMC_PRO_API_KEY': `${process.env.API_PASS}`,
            },
        });
    } catch (ex) {
        response2 = null;
        // error
        console.log(ex);
        reject(ex);
    }
    if (response2) {
        // success
        const jsonData2 = response2.data;
        console.log(jsonData2);
        resolve(jsonData2);

        app.get('/jsonData2', (req, res) => {
            res.send(jsonData2)
        });
    }
});


// Call api every 10 minutes

// cron.schedule('*/10 * * * *', () => {
//     console.log('running a task every 10 minute');
//     let response = null;
//     new Promise(async (resolve, reject) => {
//         try {
//             response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
//                 headers: {
//                     'X-CMC_PRO_API_KEY': `${process.env.API_PASS}`,
//                 },
//             });
//         } catch (ex) {
//             response = null;
//             // error
//             console.log(ex);
//             reject(ex);
//         }
//         if (response) {
//             // success
//             const jsonData = response.data;
//             console.log(jsonData);
//             resolve(jsonData);

//             app.get('/jsonData', (req, res) => {
//                 res.send(jsonData)
//             });
//         }
//     });
// });





app.listen(port, () => {
    console.log('Listening to port ', port);
})