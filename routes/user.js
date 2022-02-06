const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');
const authUser = require('../middleware/auth_user')

router.get('/',authUser,userController.getIndex);

router.get('/rekam_medis/:id_pasien',authUser,userController.rekam_medis);

router.get('/pemeriksaan_data/:id_pasien',authUser,userController.pemeriksaan_data);

router.get('/login',userController.login);

router.post('/login',userController.postLogin);

router.post('/logout',userController.postLogout);

router.get('/register',userController.register);

router.post('/register',userController.postRegister);

module.exports = router;