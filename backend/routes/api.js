const express = require('express');
const router = express.Router();
// const UserController = require('../controllers/Authtentication/UserController');
const SiswaController = require('../controllers/Induk_Akademik/SiswaController');
const MapelController = require('../controllers/Induk_Akademik/MapelController');
const GuruController = require('../controllers/Induk_Akademik/GuruController');
const KelasController = require('../controllers/Induk_Akademik/KelasController');
const PenilaianController = require('../controllers/Penilaian/PenilaianController');
const PenjadwalanController = require('../controllers/Penjadwalan/PenjadwalanController');
const KehadiranController = require('../controllers/Kehadiran/KehadiranController');
const RegisterController = require('../controllers/Authtentication/RegisterController');

router.get('/', (req, res) => {
    res.send('Hello World home');
});

// router.get('/users', UserController.index);
// router.post('/users', UserController.store);
// router.put('/users/:id', UserController.update);
// router.delete('/users/:id', UserController.destroy);


// route data induk akademik
router.get('/siswa', SiswaController.index);
router.post('/siswa', SiswaController.store);
router.put('/siswa/:id', SiswaController.update);
router.delete('/siswa/:id', SiswaController.destroy);

router.get('/mapel', MapelController.index);
router.post('/mapel', MapelController.store);
router.put('/mapel/:id', MapelController.update);
router.delete('/mapel/:id', MapelController.destroy);

router.get('/guru', GuruController.index);
router.post('/guru', GuruController.store);
router.put('/guru/:id', GuruController.update);
router.delete('/guru/:id', GuruController.destroy);

router.get('/kelas', KelasController.index);
router.post('/kelas', KelasController.store);
router.put('/kelas/:id', KelasController.update);
router.delete('/kelas/:id', KelasController.destroy);

// route data penilaian
router.get('/penilaian', PenilaianController.index);
router.post('/penilaian', PenilaianController.store);
router.put('/penilaian/:id', PenilaianController.update);
router.delete('/penilaian/:id', PenilaianController.destroy);

// route data penjadwalan
router.get('/penjadwalan', PenjadwalanController.index);
router.post('/penjadwalan', PenjadwalanController.store);
router.put('/penjadwalan/:id', PenjadwalanController.update);
router.delete('/penjadwalan/:id', PenjadwalanController.destroy);

// route data kehadiran
router.get('/kehadiran', KehadiranController.index);
router.post('/kehadiran', KehadiranController.store);
router.put('/kehadiran/:id', KehadiranController.update);
router.delete('/kehadiran/:id', KehadiranController.destroy);

router.post('/register', RegisterController.register);
module.exports = router;