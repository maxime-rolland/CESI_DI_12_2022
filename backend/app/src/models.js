
// On import notre ODM
const mongoose = require('mongoose')

// ON créé un schéma (design de la bdd)
const raspberrySchema= mongoose.Schema({
    mac:{type:String, required:true},
    nom:String,
    dateCreation:{type:Date, default:Date.now()},
    dateDerniereConnexion:Date,
    etatLeds: [{ label: String, etat: Boolean }],
})

// On exporte le modèle créé à partir du schéma
// On a accès à l'ensemble des fonctions permettant de manipuler (CRUD)
// Create Read Upadate Delete 
// Depuis le modèle
module.exports=mongoose.model("raspberryModel",raspberrySchema)