const express = require('express');
const router = require('./routes/api');
const app = express();

app.use('/api', router);
app.use(express.json());
app.use(express.urlencoded());


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});