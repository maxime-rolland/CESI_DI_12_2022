const mongoose = require('mongoose')

const raspberrySchema= mongoose.Schema({
    mac:String,
    nom:String,
    dateCreation:{type:Date, default:Date.now()},
    dateDerniereConnexion:Date,
    etatLeds: [{ label: String, etat: Boolean }],
})

module.exports=mongoose.model("raspberryModel",raspberrySchema)