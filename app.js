if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}

const express = require ('express')
const app = express ()
const cors = require('cors')
const port = process.env.PORT || 3001
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routes)
app.listen(port, ()=> {
  console.log('This app listening to ' +port)
})

module.exports=app