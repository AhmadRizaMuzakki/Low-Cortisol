const express = require('express');
const router = express.Router();
const PengumumanController = require('../controllers/Pengumuman/PengumumanController');
const SiswaController = require('../controllers/Induk_Akademik/SiswaController');
const MapelController = require('../controllers/Induk_Akademik/MapelController');
const GuruController = require('../controllers/Induk_Akademik/GuruController');
const KelasController = require('../controllers/Induk_Akademik/KelasController');
const PenilaianController = require('../controllers/Penilaian/PenilaianController');
const PenjadwalanController = require('../controllers/Penjadwalan/PenjadwalanController');
const KehadiranController = require('../controllers/Kehadiran/KehadiranController');
const RegisterController = require('../controllers/Authtentication/RegisterController');
const LoginController = require('../controllers/Authtentication/loginController');
const Auth = require('../Middleware/auth');
const Authorize = require('../Middleware/authorize');

router.get('/', (req, res) => {
    res.send('Hello World home');
});

// router.get('/users', UserController.index);
// router.post('/users', UserController.store);
// router.put('/users/:id', UserController.update);
// router.delete('/users/:id', UserController.destroy);


// route data induk akademik
router.get('/siswa/biodata', Auth, Authorize('siswa'), SiswaController.show);
router.put('/siswa/biodata', Auth, Authorize('siswa'), SiswaController.updateBiodata);
router.get('/siswa/kelas', Auth, Authorize('siswa'), SiswaController.showKelas);
router.get('/siswa', Auth, Authorize('admin', 'guru'), SiswaController.index);
router.get('/siswa/:id', Auth, Authorize('admin', 'guru'), SiswaController.showById);
router.post('/siswa', Auth, Authorize('admin', 'guru'), SiswaController.store);
router.put('/siswa/:id', Auth, Authorize('admin', 'guru'), SiswaController.update);
router.delete('/siswa/:id', Auth, Authorize('admin', 'guru'), SiswaController.destroy);

router.get('/mapel', Auth, Authorize('admin', 'guru'), MapelController.index);
router.get('/mapel/:id', Auth, Authorize('admin', 'guru'), MapelController.show);
router.post('/mapel', Auth, Authorize('admin', 'guru'), MapelController.store);
router.put('/mapel/:id', Auth, Authorize('admin', 'guru'), MapelController.update);
router.delete('/mapel/:id', Auth, Authorize('admin', 'guru'), MapelController.destroy);

router.get('/guru', Auth, Authorize('admin', 'guru'), GuruController.index);
router.get('/guru/:id', Auth, Authorize('admin', 'guru'), GuruController.show);
router.post('/guru', Auth, Authorize('admin', 'guru'), GuruController.store);
router.put('/guru/:id', Auth, Authorize('admin', 'guru'), GuruController.update);
router.delete('/guru/:id', Auth, Authorize('admin', 'guru'), GuruController.destroy);

router.get('/kelas', Auth, Authorize('admin', 'guru'), KelasController.index);
router.get('/kelas/:id', Auth, Authorize('admin', 'guru'), KelasController.show);
router.post('/kelas', Auth, Authorize('admin', 'guru'), KelasController.store);
router.put('/kelas/:id', Auth, Authorize('admin', 'guru'), KelasController.update);
router.delete('/kelas/:id', Auth, Authorize('admin', 'guru'), KelasController.destroy);

// route data penilaian
router.get('/penilaian', Auth, Authorize('admin', 'guru', 'siswa'), PenilaianController.index);
router.post('/penilaian', Auth, Authorize('admin', 'guru'), PenilaianController.store);
router.put('/penilaian/:id', Auth, Authorize('admin', 'guru'), PenilaianController.update);
router.delete('/penilaian/:id', Auth, Authorize('admin'), PenilaianController.destroy);

// route data penjadwalan
router.get('/penjadwalan', Auth, Authorize('admin', 'guru', 'siswa'), PenjadwalanController.index);
router.post('/penjadwalan', Auth, Authorize('admin', 'guru'), PenjadwalanController.store);
router.put('/penjadwalan/:id', Auth, Authorize('admin', 'guru'), PenjadwalanController.update);
router.delete('/penjadwalan/:id', Auth, Authorize('admin'), PenjadwalanController.destroy);

// route data kehadiran
router.get('/kehadiran', Auth, Authorize('admin', 'guru', 'siswa'), KehadiranController.index);
router.post('/kehadiran', Auth, Authorize('admin', 'guru'), KehadiranController.store);
router.put('/kehadiran/:id', Auth, Authorize('admin', 'guru'), KehadiranController.update);
router.delete('/kehadiran/:id', Auth, Authorize('admin'), KehadiranController.destroy);

// route data pengumuman
router.get('/pengumuman', Auth, Authorize('admin', 'guru', 'siswa'), PengumumanController.index);
router.post('/pengumuman', Auth, Authorize('admin', 'guru'), PengumumanController.store);
router.put('/pengumuman/:id', Auth, Authorize('admin', 'guru'), PengumumanController.update);
router.delete('/pengumuman/:id', Auth, Authorize('admin'), PengumumanController.destroy);

router.post('/register', RegisterController.register);
router.post('/login', LoginController.login);
module.exports = router;