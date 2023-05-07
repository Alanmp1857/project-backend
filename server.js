const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");
const { addUserDetails, getUserDetails } = require('./controllers/userController');
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
const userModel = require('./models/userModel');

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //
};

const jwtCheck = auth({
    audience: 'https://bt-api.com',
    issuerBaseURL: 'https://braintumor-alzheimer-app.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());

// enforce on all endpoints
// app.use(jwtCheck);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/signin', async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get('https://braintumor-alzheimer-app.us.auth0.com/userinfo', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response.data);
        const { nickname, name } = response.data
        const user = await userModel.findOne({ username: response.data.nickname })
        if (!user) {
            await userModel.create({ username: nickname, name: name })
        }
        res.json({ message: "Signed In Successfully!", data: user })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal Server Error!💥" })
    }
})

app.post('/user/', addUserDetails)

app.get('/user/:username', getUserDetails)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res.status(status).send(message);
})