const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:Ik21BfGCeaC5cd@cluster0.9ddjivp.mongodb.net/?appName=Cluster0"

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        
        console.log('Connection Sucessfully 🟢');


    } catch (err) {
        console.log('Connection Faild 🔴\n' + `➡: ${err.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;