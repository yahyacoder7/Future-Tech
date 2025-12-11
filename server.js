/* ==================== initialization ==================== */

const path = require('path')
console.log('PATH Library Sucessfull 🟢')
const express = require('express');
console.log('Express Library Sucessfull 🟢')
const fs = require('fs').promises
const server = express()
console.log('Express Function Library Sucessfull 🟢')
const Cpu = require('./model/Cpu')
const port = 3000;

/*======================= Routs =================================*/

const cpuRouts = require('./routes/cpuRoutes')
server.use(cpuRouts)
/* ========================== Middleware ========================== */

server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, "public")));
server.use(express.json())

/* ========================= Paths ===================================*/

const cpuDataFilePath = path.join(__dirname, 'data', 'cpu-data.json')
const gpuDataFilePath = path.join(__dirname, 'data', 'gpu-data.json')
const viewsPath = path.join(__dirname, "views")
server.set('views', viewsPath)

/*============================= Data Base ==============================*/

const mongos = require('mongoose')
const uri = "mongodb+srv://admin:Ik21BfGCeaC5cd@cluster0.9ddjivp.mongodb.net/?appName=Cluster0"

mongos.connect(uri).then(() => { console.log('Connection To Mongodb sucessfull 🟢') }).catch((err) => {
  console.log('connection faild 🔴')
  console.log(err)
})

/* ========================= Functions ===============================*/
async function getData(type) {
  try {
    let fileData;
    if (type === 'cpu') {
      fileData = await fs.readFile(cpuDataFilePath) //fileData is String
    }
    else {
      fileData = await fs.readFile(gpuDataFilePath)
    }

    const Data = JSON.parse(fileData)  // Transform fileData To Arrsy that already has Objects
    return Data;

  } catch (error) {
    console.log('Error reading data from ' + path + ': ' + error)
    return [];
  }

}

async function saveData(data, type = 'cpu') {
  const dataToString = JSON.stringify(data, null, 2)
  if (type === 'gpu') {
    await fs.writeFile(gpuDataFilePath, dataToString)
    return;
  } else {
    await fs.writeFile(cpuDataFilePath, dataToString)
    return;
  }

}



/* ========================= Routes ===============================*/

server.get('/', (req, res) => {
  res.sendFile(path.join(viewsPath, "index.htm"))
})
server.get('/add', (req, res) => {
  res.sendFile(path.join(viewsPath, "add.html"))
})
server.get('/delete', (req, res) => {
  res.sendFile(path.join(viewsPath, "delete.html"))
})


server.get('/sign-up', (req, res) => {
  res.sendFile(path.join(viewsPath, "sign-up.htm"))
})
/*server.post('/sign-up', async (req, res) => {
    try {
        let fileData = await fs.readFile('users.json', 'utf-8')
        console.log(fileData)
        let users = JSON.parse(fileData)
        console.log(users)
        users.push(req.body)
        await fs.writeFile('users.json', JSON.stringify(users, null, 2));
        res.json({
            success: true,
            message: 'respone was send successflly'
        })
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ success: false, message: "Error saving data" });
    }

})*/


server.get('/gpu', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/motherboards', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/ram', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/storage', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/case', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/monitors', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/powersupply', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/accessories', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);
})

server.get('/build-pc', (req, res) => {
  res.send(`
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:#ffffff;
  ">
    <h1 style="
      font-family: Arial, sans-serif;
      color: #4da6ff;
      font-size: 48px;
      letter-spacing: 2px;
      margin:0;
    ">
      Coming Soon
    </h1>
  </div>
`);

})

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`)
})