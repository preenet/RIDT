const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const app = express()

// init chatkit
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:2265d954-0085-464f-971d-6e8759b23438',
  key: '8d8fb0d4-9c9e-43ce-b297-c16595716dde:vdsOsHGL3L/HJV9ssjCmkAgHOQbghueFDtL9m6Rpwt4=',
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// create users
app.post('/users', (req, res) => {
  const { username } = req.body
  console.log(username);
  chatkit
    .createUser({
    id: username,
    name: username
     })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})
const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
