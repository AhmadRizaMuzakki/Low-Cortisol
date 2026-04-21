require('dotenv').config();
const express = require('express');
const router = require('./routes/api');
const db = require('./config/database');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.get('/test-koneksi', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            res.json({
                message: 'koneksi database gagal',
            });
        } else {
            res.json({
                message: 'koneksi database berhasil',
                result: results
            });
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

