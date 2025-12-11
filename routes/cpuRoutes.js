const express = require('express')
const router = express.Router();
const Cpu = require('../model/Cpu')



router.get('/cpu', async (req, res) => {

    try {
        const cpus = await Cpu.find()
        res.render('cpu', { cpus: cpus });
    } catch (error) {
        console.log('error happened:' + `${error}`)
        res.render('cpu', { cpus: [] })
        res.json({
            success: false,
            message: "hmmm.. somthing wrong we trying to fix it don't woory "
        })
    }

})
router.post('/add-cpu', async (req, res) => {

})
router.delete('/delete-cpu/:id', async (req, res) => {

})
router.put('/update-cpu/:id', async (req, res) => {

})

module.exports = router;