const express = require('express')
const router = express.Router();
const User = require('./model/user')
const jwt = require('jsonwebtoken')


function verifyToken(req, res, next){
  if(!req.headers.authorization) {
      return res.status(401).send("Unauthorized Request")
  } else {
      let token = req.headers.authorization.split(' ')[1]
      if(token == null){
          return res.status(401).send("Unauthorized Request")
      } else {
         if(token !== null) {
          let payload = jwt.verify(token, 'secretkey')
          req.userId = payload ?  payload.subject : ''
          if(!req.userId) {
              return res.status(401).send("Unauthorized Request")
          }
         } else {
          return res.status(401).send("Unauthorized Request")
         }
          
          next() 
      }
    next()
  }
  
}


router.get('/', (req, res) => {
    res.send('Hi All')
})

router.post('/register', (req,res) => {
    const userData = req.body;
    let user = new User(userData)
    user.save((err,docs ) => {
        if(err) {
            console.log(err)
        } else {
          let payload = {subject: res._id}
          let token = jwt.sign(payload, "secretkey")
            res.status(200).send({token})
        }
    })
})


router.post('/login', (req,res) => {
    let userData = req.body
    User.findOne({email:userData.email},(err,resp) => {
        if(resp){
            if(resp.password == userData.password) {
                let payload = { subject: resp._id}
                let token = jwt.sign(payload,"secretkey")
                res.status(200).send({token})
            } else {
                console.log('user not found')
                res.status(401).send("Incorrect password")
            }
        } else {
            console.log('user not found')
            res.status(401).send( "user not found")
        }
    })
})

router.get('/events', (req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]

      res.status(200).json(events)
})


router.get('/special', verifyToken, (req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]

      res.status(200).json(events)
})
module.exports = router;