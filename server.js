const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");
const userModel = require('./models/userModel')
const { addUserDetails, getUserDetails } = require('./controllers/userController');

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/user', async (req, res) => {
    try {
        const user = req.body;
        console.log(user)
        let resp = await userModel.findOne({ username: user.username });
        // if (resp) {
        //     resp = {
        //         ...resp,
        //         user
        //     }
        //     await resp.save();
        // }
        // else {
        //     resp = await userModel.create(user);
        // }
        res.json({ message: "Data Uploaded!", data: resp })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: error })
    }
})

app.get('/user/:username', getUserDetails)

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

