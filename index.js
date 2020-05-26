const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { User } = require('./models/User');

app.listen(port, () => console.log(`express app listening on port ${port}!`));

mongoose.connect('mongodb+srv://chillgu:abcd1234@boiler-plate-12xps.mongodb.net/test?retryWrites=true&w=majority', {
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
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });
})