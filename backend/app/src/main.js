// IMPORT LIB EXTERNES
// Import du microFramework express https://expressjs.com/fr/
const express = require('express')
// Import de l'ODM mongoose https://mongoosejs.com/
const mongoose = require('mongoose')

// IMPORT INTERNES
// Import des modèles, un modèle est Élément qui contient les données ainsi que de la logique en rapport avec les données 
const raspberryModel = require('./models')

// On créée une instance d'express "app"
const app = express()

const port = 3000

// Permet à express de récupèrer du json en post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route par défaut (/)
app.get('/', (req, res) => {
    // On retourne à l'aide de res
  res.send('Hello World! ❤️❤️❤️❤️😭👌💻👌👌👌')
})

// Lors d'un get sur la route /leds
// On cherche à obtenir depuis notre raspberry l'état des leds de ce dernier
// la fonction est asynchrone, car on attend les actions avec la bdd
app.get('/leds', async(req, res) => {
    // On récupère le paramètre mac passé en get
    let mac = req.query.mac
    
    if(mac){
        // On vérifie s'il existe déjà en bdd, sinon on le créé avec des valeurs
        // par défaut
        let raspberry = await raspberryModel.findOne({"mac":mac})
        if(!raspberry){
            raspberry = await raspberryModel.create(
                {
                "mac":mac,
                "nom":mac, 
                etatLeds:[,
                    {
                        label:"Jaune",
                        etat:true
                    },
                    {
                        label:"Vert",
                        etat:true
                    },
                    {
                        label:"Rouge",
                        etat:true
                    },
                ]})
        }
        // on met à jour la date de dernière connexion
        raspberry.dateDerniereConnexion=Date.now()
        // On sauvegarde notre objet (à jour)
        await raspberry.save()
        // on retourne le tableau etatLeds pour traitement par le raspberry
        let result = raspberry.etatLeds
        res.send(result)
    }else{
        res.send({'result':null})
    }    
})

// Récupère l'ensemble des raspberrys présents en base
app.get('/raspberries', async(req,res)=>{
    let raspberries = await raspberryModel.find()
    res.send(raspberries)
})

// On récupère un raspberry en particulier à partir de son id passé en paramètre
app.get('/raspberry/:id', async(req,res)=>{
    let id = req.params.id
    let toReturn={}
    
    if(id){
        let raspberry = await raspberryModel.findById(id)
        if(raspberry){
            toReturn=raspberry
        }
    }

    res.send(toReturn)
})

// On met à jour l'état des LEDs d'un raspberry
// L'id du raspberry à modifier est passé en param
// le contenu d'etatLeds (contient les 3 valeurs des leds) est passé dans le body du post
// au format json
app.post('/raspberry/:id/ledsChange', async (req, res)=>{
    // Je recherche le raspberry en bdd
    let raspberry = await raspberryModel.findById(req.params.id)
    if(raspberry){
        // Je remplace la propriété etatLeds de l'objet raspberry par le JSON envoyé en post
        raspberry.etatLeds=req.body
        // mongoose ne détecte pas nativement les modification "deep" il faut lui indiquer ce que l'on a modifié
        raspberry.markModified('etatLeds')
        // on sauvegarde en base nos modifs
        await raspberry.save()
    }
})

// On récupère les informations d'identification à la bdd depuis les variables d'environnement
let userBdd=process.env.MONGO_INITDB_ROOT_USERNAME
let passwordBdd=process.env.MONGO_INITDB_ROOT_PASSWORD 
// On essaye de se connectzer à la base de donnée
mongoose
  .connect("mongodb://mongo:27017/ledsDB", { 
    "authSource": "admin",
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "user": userBdd,
    "pass": passwordBdd
   })
  .then(() => {
    // On lance un serveur qui écoute sur le port définit au début du fichier
    app.listen(port, () => {

        console.log(`Example app listening on port ${port}`)
      
      })
  })

