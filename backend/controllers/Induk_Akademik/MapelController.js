const MapelModel = require('../../models/induk_akademik/MapelModel');

class MapelController {
    index(req, res) {
        res.send('Hello World mapel');
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
module.exports = new MapelController();