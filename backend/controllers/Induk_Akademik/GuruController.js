const GuruModel = require('../../models/induk_akademik/GuruModel');

class GuruController {
    index(req, res) {
        res.send('Hello World guru');
    }
    store(req, res) {
        res.send('Hello World');
    }
    update(req, res) {
        res.send('Hello World');
    }
    destroy(req, res) {
        res.send('Hello World');
    }
}
module.exports = new GuruController();