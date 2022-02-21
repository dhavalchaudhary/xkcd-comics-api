require('isomorphic-fetch');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 5000;

app.use(cors())

const generateAPIUrl = (id = null) => {
    let api_url = 'https://xkcd.com/'
    if(id){
        api_url = `${api_url}${id}/`
    }
    api_url = `${api_url}info.0.json`;
    return api_url
}

app.get('/comics', (req, res, next) => {
    const {id = null} = req.query;
    const url = generateAPIUrl(id)
    fetch(url)
        .then(result => result.json())
        .then(data => {
            res.send(data)
        })
        .catch(_ => {
            next("There was an error in getting the comics")
        })
})

app.get('/health/check', (_, res) => {
    res.send('OK');
})

app.listen(process.env.PORT || PORT,() => {
    console.log(`App started on ${PORT}`)
} )