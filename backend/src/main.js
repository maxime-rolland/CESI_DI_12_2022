const express = require('express')
const mongoose = require('mongoose')
const raspberryModel = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! ❤️❤️❤️❤️😭👌💻👌👌👌')
})

app.get('/leds', async(req, res) => {
    let mac = req.query.mac

    console.log({mac})
    if(mac){
        let raspberry = await raspberryModel.findOne({"mac":mac})
        if(!raspberry){
            raspberry = await raspberryModel.create({"mac":mac,"nom":"default", etatLeds:[,
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
        
        console.log({raspberry})
        let result = raspberry.etatLeds
        res.send(result)
    }
    

    
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

