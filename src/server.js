/* ==================== initialization ==================== */

const path = require('path')
const express = require('express');
const { split } = require('postcss/lib/list');
const fs = require('fs').promises
const server = express()
const port = 3000;

/* ========================== Middleware ========================== */

server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, "..", "public")));
server.use(express.json())

/* ========================= Paths ===================================*/

const dataFilePath = path.join(__dirname, 'cpu-data.json')
const viewsPath = path.join(__dirname, "..", "public", "views")
server.set('views', viewsPath)


/* ========================= Functions ===============================*/
async function getCpuData() {
  const fileData = await fs.readFile(dataFilePath) //fileData is String
  const cpusData = JSON.parse(fileData)  // Transform fileData To Arrsy that already has Objects
  return cpusData;
}
async function saveData(data) {
  const dataToString = JSON.stringify(data, null, 2)
  await fs.writeFile(dataFilePath, dataToString)
}

server.get('/', (req, res) => {
  res.sendFile(path.join(viewsPath, "index.htm"))
})

server.get('/cpu-add', (req, res) => {
  res.sendFile(path.join(viewsPath, "add-cpu.htm"));
})
server.get('/cpu', async (req, res) => {

  try {

    /* res.json(cpusData)
      res.sendFile(path.join(viewsPath, "cpu.htm"))*/
    res.render('cpu', { cpus: await getCpuData() });

  } catch (error) {
    console.log('error happened:' + `${error}`)
    res.json({
      success: false,
      message: "hmmm.. somthing wrong we trying to fix it don't woory "
    })
  }

})
server.post('/cpu-add', async (req, res) => {
  try {
    const reqData = req.body
    const cpuList = await getCpuData()
    let nextID = cpuList.length + 1;
    const currentID = 'cpu' + String(nextID).padStart(3, '0')

    const structuredCPU = {
      id: currentID,
      manufacturer: reqData.manufacturer.toUpperCase(),

      specs: {
        model_name: reqData.model_name.toUpperCase() || null,
        cores: Number(reqData.cores) || null,
        threads: Number(reqData.threads) || null,
        base_clock: Number(reqData.base_clock) || null,
        boost_clock: Number(reqData.boost_clock) || null,
        socket: reqData.socket.toUpperCase() || null,
        consumption: Number(reqData.consumption) || null,
        integrated_graphics: reqData.integrated_graphics.toUpperCase() || null
      }
    }

    cpuList.push(structuredCPU);
    saveData(cpuList)

    console.log("✅ Data saved successfully!");

    res.json({
      success: true
    });

  } catch (error) {

    console.error("❌ Error happened:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})
server.delete('/cpu-delete/:id', async (req, res) => {
  try {
    const tragetId = req.params.id;
    const cpuDataList = await getCpuData()
    const newCpuList = cpuDataList.filter(cpu => cpu.id != tragetId)

    if (newCpuList.length === cpuDataList.length) {
      return res.status(404).json({
        success: false,
        message: "ID not found"
      })
    }
    res.status(200).json({
      success: true,
      message: `The Cpu Number ${tragetId} has benn deleted`
    })
    await saveData(newCpuList)

  } catch (error) {
    console.log('error: ' + error)
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }

})
server.put('/cpu-update/:id', async (req, res) => {
  try {
    const updates = req.body

    const targetId = req.params.id

    let cpuDataList = await getCpuData()

    const index = cpuDataList.findIndex(cpu => cpu.id == targetId)

    if (index == -1) {
      res.status(404).json({
        success: false,
        message: "ID don't found"
      })

      return;
    }
    cpuDataList[index] = {
      ...cpuDataList[index],
      ...updates,
      specs: {
        ...cpuDataList[index].specs,
        ...(updates.specs || {})
      }
    }
    saveData(cpuDataList)

    res.status(200).json({
      success: true,
      message: `the cpu ${targetId} has been edited`
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }

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