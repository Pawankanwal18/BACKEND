const mongoose = require('mongoose');

async function main() {

    await mongoose.connect(process.env.DB_CONNECT_KEY);


    //code likhna shuru ho gaya


}

module.exports = main;
//added and module added