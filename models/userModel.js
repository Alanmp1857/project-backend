const mongoose = require('mongoose');

const dblink = `mongodb://Punisher007:tya!Hjzy6LjxYqW@ac-7bjdvak-shard-00-00.du8egil.mongodb.net:27017,ac-7bjdvak-shard-00-01.du8egil.mongodb.net:27017,ac-7bjdvak-shard-00-02.du8egil.mongodb.net:27017/?ssl=true&replicaSet=atlas-yb6gbv-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const dblink = `mongodb+srv://Punisher007:tya!Hjzy6LjxYqW@cluster0.du8egil.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dblink)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(error => console.log(error));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    firstname: String,
    lastname: String,
    image: {
        type: String
    },
    age: {
        type: Number
    }
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;