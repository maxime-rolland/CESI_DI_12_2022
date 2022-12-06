const mongoose = require('mongoose')

const raspberrySchema= mongoose.Schema({
    mac:String,
    nom:String,
    etatLeds: [{ label: String, etat: Boolean }],
})

module.exports=mongoose.model("raspberryModel",raspberrySchema)