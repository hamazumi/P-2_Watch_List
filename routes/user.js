//IMPORT ALL DEPENDENCIES 
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const db = require('../models')

//Access dependencies
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded(true))
const router = express.Router()

//ROUTES 

//POST ROUTE finds OR creates USER into USER Model. THEN RENDERS USER INFO
router.post('/', async (req, res) => {
 let currentUser = await db.user.findOrCreate({
        where: {
        user: req.body.username
        }
    })
let userId = currentUser[0].dataValues.id
    console.log("USER.JS username= " + currentUser[0].dataValues.id)
    res.render('user', { username: currentUser[0].dataValues.user, userId: userId})
})

router.get('/', (req, res) => {
    res.render('user')
})


router.get('/logout', (req, res) => {
    res.render('index', {logout: true})
})

module.exports = router;