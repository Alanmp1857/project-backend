const mongoose = require('mongoose');

const dblink = `mongodb+srv://Punisher007:nBDKJbMPCcpLVZ4H@cluster0.du8egil.mongodb.net/?retryWrites=true&w=majority`;

// Add options to increase timeout limit
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
};

// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Connected to MongoDB!");
// });

mongoose.connect(dblink, { useNewUrlParser: true, useUnifiedTopology: true })
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
    image: {
        type: String
    },
    age: {
        type: Number
    }
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
