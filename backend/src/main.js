const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! ❤️❤️❤️❤️😭👌💻👌👌👌')
})

app.get('/leds', (req, res) => {
    let mac = req.query.mac
    console.log({mac})
    let result = [{label:"rouge", etat:true},{label:"vert", etat:false},{label:"jaune", etat:true}]
    res.send(result)

    
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
