const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const db = require('../models')

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded(true))
const router = express.Router()


// displays profile page for current user
router.post('/', async (req, res) => {
 let currentUser = await db.user.findOrCreate({
        where: {
        user: req.body.username
        }
    })
    console.log("USER.JS username= " + currentUser[0].dataValues.user)
    res.render('user', { username: currentUser[0].dataValues.user })

})


router.get('/', (req, res) => {
    res.render('user')
})



router.get('/logout', (req, res) => {
    res.render('index', {logout: true})
})

module.exports = router;