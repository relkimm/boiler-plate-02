const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) next(err);

                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    const user = this;

    bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    let user = this;

    const token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);

        cb(null, user);
    });
}

userSchema.statics.findByToken = function (token, cb) {
    let user = this;

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return cb(err);

        user.findOne({ _id: decoded, token: token }, (err, user) => {
            if (err) return cb(err);

            cb(null, user);
        })
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };