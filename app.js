const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require('path')

app.use(cors())

const fileStorage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, 'upload/')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now())
  }
})

const upload = multer({storage: fileStorage})

app.post('/upload', upload.single('oneFile'), (req, res)=>{
  console.log(req.body)
  console.log(req.file)
  res.status(200).json({msg: 'upload one file'})
})

app.post("/uploads", upload.array('manyFiles',5), (req,res)=> {
  console.log(req.body)
  for(let i=0; i<req.files.length; i++)
    console.log(req.files[i].filename)
  res.status(200).json({msg: 'upload many files '})
})

app.use((req,res) => res.json({msg: 'path not found'}))

app.listen(8000, ()=>console.log('Server on port 8000..'))