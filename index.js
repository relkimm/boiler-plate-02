const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { User } = require('./models/User');

app.listen(port, () => console.log(`express app listening on port ${port}!`));

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDb connected...')).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello nodemon!'));
app.post('/register', (req, res) => {

    const user = new User(req.body);
    console.log(user);
    user.save((err, userInfo) => {
        if (err) return res.json({ registerSuccess: false, err });

        return res.status(200).json({ registerSuccess: true });
    });
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, userInfo) => {
        if (err) return res.json({ loginSuccess: false, err });
        if (!userInfo) return res.json({ loginSuccess: false, message: 'we cannot find the user' });

        userInfo.comparePassword(password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: 'password is not correct' });

        });
    })

})