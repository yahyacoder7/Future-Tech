server.post('/add-:type', async (req, res) => {
  try {
    const type = req.params.type;
    const reqData = req.body
    console.log(`📥 New Request for: ${type}`);
    console.log("Data:", reqData);

    if (!reqData.manufacturer) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer cannot be empty"
      });
    }
    if (type === 'cpu') {
      const cpuList = await getData('cpu')
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
          consumption: reqData.consumption || null,
          integrated_graphics: reqData.integrated_graphics.toUpperCase() || null
        }
      }

      cpuList.push(structuredCPU);
      await saveData(cpuList, 'cpu')
    }
    else {
      const gpuList = await getData('gpu')
      let nextID = gpuList.length + 1;
      const currentID = 'gpu' + String(nextID).padStart(3, '0')

      const structuredGPU = {
        id: currentID,
        manufacturer: reqData.manufacturer.toUpperCase(),

        specs: {
          model_name: reqData.model_name.toUpperCase() || null,
          chipset: reqData.chipset || null,
          vram_size: Number(reqData.vram_size) || null,
          memory_type: reqData.memory_type || null,
          core_clock: Number(reqData.core_clock) || null,
          boost_clock: Number(reqData.boost_clock) || null,
          cooling: reqData.cooling || null,
        }
      }
      gpuList.push(structuredGPU);
      await saveData(gpuList, 'gpu');
    }

    console.log(`✅ ${type.toUpperCase()} DATA saved successfully!`);
    res.json({
      success: true,
      message: `${type.toUpperCase()} added successfully`
    });

  } catch (error) {

    console.error("❌ Error happened:", error);

    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }
})
server.delete('/delete-item/:type/:id', async (req, res) => {
  try {
    const tragetId = req.params.id;
    const type = req.params.type;
    const dataList = await getData(type)
    const newDataList = dataList.filter(element => element.id != tragetId)

    if (dataList.length === newDataList.length) {
      return res.status(404).json({
        success: false,
        message: "ID not found"
      })
    }
    await saveData(newDataList, type)

    res.status(200).json({
      success: true,
      message: `The ${type.toUpperCase()} Number ${tragetId} has benn deleted`
    })

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