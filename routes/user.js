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
    db.user.findOrCreate({
        where: {
        user: req.body.username
        }
    })
    res.render('user', { username: currentUser })
})


router.get('/', (req, res) => {
    res.render('user')
})



router.get('/logout', (req, res) => {
    res.render('index', {logout: true})
})

module.exports = router;