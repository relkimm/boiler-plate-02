const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chillgu:abcd1234@boiler-plate-12xps.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDb connected...')).catch(err => console.log(err));



app.get('/', (req, res) => res.send('hello express!'));
app.listen(port, () => console.log(`express app listening on port ${port}!`));