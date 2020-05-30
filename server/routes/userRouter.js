const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

router.post('/register', (req, res) => {

    const user = new User(req.body);
    console.log(user);
    user.save((err, userInfo) => {
        if (err) return res.json({ registerSuccess: false, err });

        return res.status(200).json({ registerSuccess: true });
    });
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, userInfo) => {
        if (err) return res.json({ loginSuccess: false, err });
        if (!userInfo) return res.json({ loginSuccess: false, message: 'we cannot find the user' });

        userInfo.comparePassword(password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: 'password is not correct' });

        });

        userInfo.generateToken((err, user) => {
            if (err) return res.json({ tokenSuccess: false, err });

            res.cookie('x_auth', user.token).status(200).json({ tokenSuccess: true, userId: user._id });
        });
    })
})

module.exports = router;