const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistem_sekolah'
});

db.connect(( err => {
    if(err){
        console.log('Error connecting to MySQL database');
    }else{
        console.log('Connected to MySQL database');
    }
}));

module.exports = db;