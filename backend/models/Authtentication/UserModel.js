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
    static deleteUser(id, callback) {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = UserModel;