const db = require('../../config/database');

class UserModel {
    static getAllUsers(callback) {
        const query = 'SELECT * FROM users';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
    static createUser(username, password, role, callback) {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [username, password, role], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = UserModel;