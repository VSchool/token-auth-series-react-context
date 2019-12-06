const express = require("express")
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.route('/signup')

    .post((req, res) => {
        User.findOne(
            {username: req.body.username.toLowerCase()},
            (err, existingUser) => {
                if(err) return res.status(500).send(err)
                if (existingUser !== null) return res.status(400).send(new Error('That username already exists!!'))
                const newUser = new User(req.body)
                newUser.save((err, user) => {
                    if (err) return res.status(500).send(err)
                    const token = jwt.sign(user.toObject(), process.env.SECRET)
                    return res.status(201).send({
                        success: true, 
                        user: user.toObject(),
                        token
                    })
                })
            }
        )
    })

    authRouter.post("/login", (req, res) => {
        User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
            if (err) return res.status(500).send(err);
            if (!user || user.password !== req.body.password) return res.status(403).send(new Error("Email or password are incorrect"));
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.send({
                token, 
                user: user.toObject(), 
                success: true})
        });
    });
    
    module.exports = authRouter;