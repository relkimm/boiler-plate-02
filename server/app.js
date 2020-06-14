const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');



app.listen(port, () => console.log(`express app listening on port ${port}!`));

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDb connected...')).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api', (req, res) => res.send('hello nodemon!'));
app.use('/api/users', require('./routes/userRouter'));
