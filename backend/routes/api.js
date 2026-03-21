const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Login/UserController');
const StudentController = require('../controllers/Induk_Akademik/StudentController');
const PenilaianController = require('../controllers/Penilaian/PenilaianController');
const PenjadwalanController = require('../controllers/Penjadwalan/PenjadwalanController');
const KehadiranController = require('../controllers/Kehadiran/KehadiranController');

router.get('/', (req, res) => {
    res.send('Hello World home');
});

router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

router.get('/students', StudentController.index);
router.post('/students', StudentController.store);
router.put('/students/:id', StudentController.update);
router.delete('/students/:id', StudentController.destroy);

router.get('/penilaian', PenilaianController.index);
router.post('/penilaian', PenilaianController.store);
router.put('/penilaian/:id', PenilaianController.update);
router.delete('/penilaian/:id', PenilaianController.destroy);

router.get('/penjadwalan', PenjadwalanController.index);
router.post('/penjadwalan', PenjadwalanController.store);
router.put('/penjadwalan/:id', PenjadwalanController.update);
router.delete('/penjadwalan/:id', PenjadwalanController.destroy);

router.get('/kehadiran', KehadiranController.index);
router.post('/kehadiran', KehadiranController.store);
router.put('/kehadiran/:id', KehadiranController.update);
router.delete('/kehadiran/:id', KehadiranController.destroy);


module.exports = router;