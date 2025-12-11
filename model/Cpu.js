const mongoose = require('mongoose') /* mongoose library */

const cpuShema = new mongoose.Schema({
  id: String,
  manufacturer: String,
  specs: {
     model_name: String,
      cores: Number,
      threads: Number,
      base_clock: Number,
      boost_clock: Number,
      socket: String,
      consumption: Number,
      integrated_graphics: String
  }
}) /* Schema or Structure of The data */
module.exports = mongoose.model('Cpu' , cpuShema) /* Export data as Mongo Class Model to other files */
 
