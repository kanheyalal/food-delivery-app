const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

require('./db/conn');

app.use(require('./router/User'));
app.use(require('./router/Meals'));
app.use(require('./router/Cart'));

app.listen(8000, ()=> {
    console.log('listening port at 8000');
})