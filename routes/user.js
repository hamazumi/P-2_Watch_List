const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const db = require('../models')

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded(true))
const router = express.Router()


// displays profile page for current user
router.post('/', (req, res) => {
    let currentUser = req.body.username

    res.render('profile', { username: currentUser })
})

router.get('/', (req, res) => {
    res.render('profile')
})



router.get('/logout', (req, res) => {
    res.render('index', {logout: true})
})

module.exports = router;