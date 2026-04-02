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
}

module.exports = UserModel;