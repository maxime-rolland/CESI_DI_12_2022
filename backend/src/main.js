const express = require('express')
const mongoose = require('mongoose')
const raspberryModel = require('./models')


const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World! ❤️❤️❤️❤️😭👌💻👌👌👌')
})

// Lors d'un get sur la route /leds
app.get('/leds', async(req, res) => {
    // On récupère le paramètre mac passé en get
    let mac = req.query.mac
    
    if(mac){
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
        raspberry.dateDerniereConnexion=Date.now()
        await raspberry.save()
        let result = raspberry.etatLeds
        res.send(result)
    }else{
        res.send({'result':null})
    }    
  })

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

app.post('/raspberry/:id/ledsChange', async (req, res)=>{
    console.log("ledsChange")
    console.log(req.body)
    let raspberry = await raspberryModel.findById(req.params.id)
    console.log(raspberry.etatLeds)
    raspberry.etatLeds=req.body
    console.log(raspberry.etatLeds)
    raspberry.markModified('etatLeds')
    await raspberry.save()

})

app.get('/raspberries', async(req,res)=>{
    let raspberries = await raspberryModel.find()
    res.send(raspberries)
})
  
  mongoose
  .connect("mongodb://mongo:27017/ledsDB", { 
    "authSource": "admin",
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "user": "root",
    "pass": "example" 
   })
  .then(() => {
    app.listen(port, () => {

        console.log(`Example app listening on port ${port}`)
      
      })
  })

