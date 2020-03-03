const express = require('express')
const router = express.Router()

require('./routes/event')(router)

module.exports = router
