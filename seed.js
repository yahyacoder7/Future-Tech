const mongoose = require('mongoose')
const fs = require('fs').promises
const Cpu = require('./model/Cpu')
const connectDB = require('./config/database')

connectDB()
const importantData = async () => {
    try {
        const oldData = await fs.readFile('./data/cpu-data.json', 'utf-8')
        const cpus = JSON.parse(oldData)

        await Cpu.deleteMany();
        console.log('Ols Data Destroyed...')

        await Cpu.insertMany(cpus)
        console.log('Data Impored Sucessfully')
        process.exit()

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
importantData();