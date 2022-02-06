const express = require('express');

const router = express.Router();

const dokterController = require('../controller/dokterController');

const isAuth = require('../middleware/is-auth')

router.get('/login',dokterController.login);

router.post('/login',dokterController.postLogin);

router.post('/logout',dokterController.postLogout);

router.get('/',isAuth,dokterController.getIndex);

router.get('/obat_data',isAuth,dokterController.obat_data);

router.get('/obat_tambah',isAuth,dokterController.obat_tambah);

router.post('/obat_tambah',isAuth,dokterController.obat_tambah_post)

router.get('/obat_masuk_tambah/:id_obat',isAuth,dokterController.obat_masuk_tambah);

router.post('/obat_masuk_tambah',isAuth,dokterController.obat_masuk_tambah_post);

router.get('/pasien_data',isAuth,dokterController.pasien_data);

router.get('/rekam_medis/:id_pasien',isAuth,dokterController.rekam_medis);

router.get('/rekam_medis_tambah/:id_pasien',isAuth,dokterController.rekam_medis_tambah);

router.post('/rekam_medis_tambah',isAuth,dokterController.rekam_medis_tambah_post);

router.get('/rekam_medis_delete/:id_catatan_medis',isAuth,dokterController.rekam_medis_delete);

router.get('/rekam_medis_update/:id_catatan_medis',isAuth,dokterController.rekam_medis_update);

router.post('/rekam_medis_update',isAuth,dokterController.rekam_medis_update_post);

router.get('/pemeriksaan_input/:id_catatan_medis',isAuth,dokterController.pemeriksaan_input);

router.post('/pemeriksaan_input',isAuth,dokterController.pemeriksaan_input_post);

router.get('/pemeriksaan_data/:id_pasien',isAuth,dokterController.pemeriksaan_data);

router.get('/transaksi/:id_pemeriksaan',isAuth,dokterController.transaksi);

router.post('/transaksi_tambah',isAuth,dokterController.transaksi_tambah);

router.get('/transaksi_data',isAuth,dokterController.transaksi_data);

module.exports = router;