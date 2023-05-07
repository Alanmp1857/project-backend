const userModel = require('../models/userModel')

const addUserDetails = async (req, res) => {
    try {
        const user = req.body;
        console.log(user)
        let resp = await userModel.findOne({ username: user.username });
        if (resp) {
            await userModel.updateOne({ username: user.username }, user)
        }
        else {
            resp = await userModel.create(user);
        }
        res.json({ message: "Data Uploaded!" })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: error })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username)
        const user = await userModel.findOne({ username: username })
        if (user) {
            res.json({
                message: 'user data',
                data: user
            })
        }
        else {
            res.status(404).json({ message: "User Not Found!" })
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: error })
    }
}

module.exports = { addUserDetails, getUserDetails }