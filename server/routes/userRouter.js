const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middlewares/auth');

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

router.get('/auth', auth, (req, res) => {
    const user = req.user;

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 0 ? false : true,
        isAuth: true
    })
});

router.get('/logout', auth, (req, res) => {
    const user = req.user;

    User.findOneAndUpdate({ _id: user._id }, {
        token: ''
    }, (err, user) => {
        if (err) return res.json({ logoutSuccess: false, err });

        res.status(200).json({
            logoutSuccess: true
        });
    })
})

module.exports = router;