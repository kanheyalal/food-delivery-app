const mongoose = require('mongoose');
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connection establised');
}).catch((err) => {
    console.log('connection failed');
})


