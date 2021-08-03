const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectDB = async ()=> {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('mongodb connected');
    } catch (err) {
        console.log(err.message);
//exit with success use 0 if you want to exit with failure use 1
        process.exit(1);
    }
};
//https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
module.exports = connectDB;