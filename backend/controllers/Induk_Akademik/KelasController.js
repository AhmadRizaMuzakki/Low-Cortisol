const KelasModal = require('../../models/induk_akademik/KelasModal');

class KelasController {
    index(req, res) {
        res.send('Hello World kelas');
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
module.exports = new KelasController();