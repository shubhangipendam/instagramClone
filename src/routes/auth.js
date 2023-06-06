const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET } = require('../key')
const loggedIn =require('../middleware/requireLoigin')


router.get('/protected',loggedIn,(req,res)=>{
    res.send('hello world')
})
router.get('/', (req, res) => {
    res.send('hello world')
})



// router.post('/signup', (req, res) => {
//     // res.send(req.body)
//     // console.log(req.body)

//     const { name, email, password } = req.body
//     if (!name || !email || !password) {
//         return res.status(422).send({ error: 'plz send all file' })
//     }
//     // console.log(req.body)
//     //    res.send({message:"successfuly send"})

//     User.findOne({ email: email })
//         .then((savedUser) => {
//             if (savedUser) {
//                 return res.status(422).send({ error: 'user already exists with this email' })
//             }

//             bcrypt.hash(password, 12)
//                 .then(hashedpassword => {

//                     const user = new User({
//                         name,
//                         email,
//                         password:hashedpassword
//                     })

//                     user.save()

//                         .then(user => {
//                             res.json({ message: ' save successfully  ' })
//                             console.log(req.body)
//                         })
//                         .catch(error => {
//                             console.log(error)
//                         })

//                 })


//         })
//         .catch(error => {
//             console.log(error)
//         })

// })

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) { return res.status(422).send({ error: " add email or password  " }) }

    User.findOne({ email: email })
        .then(saveduser => {
            if (!saveduser) { return res.status(422).send({ error: "email or password is invalid " }) }
            bcrypt.compare(password, saveduser.password)
                .then(doMatch => {
                    if (doMatch) { 
                        // return res.status(200).send({ massage: 'successfully signed in ' }) 
                        const token = jwt.sign({_id:saveduser._id},JWT_SECRET)
                        res.send({token:token})
                    }
                    else{ return res.status(442).send({ error: "invalid eamil or password" })}

                })
                .catch(error=>{
                    console.log(error)
                })
        })
        .catch(error=>{
            console.log(error)
        })

})


module.exports = router