const model = require("../model/index.js");
const bcrypt = require('bcrypt');
const User = model.user;
const Pegawai = model.pegawai;
const { Op } = require("sequelize");
var nodemailer = require('nodemailer');
const router = require("../routes/user.js");


exports.getIndex = async(req, res, next)=>{
  try {
    const pasien = await model.pasien.findAll({where: {id_pasien:req.session.id_pasien}});
    res.render('template/base',{
        data:pasien,
        getUrl:'index'
    })
} catch (error) {
    throw new Error(error);
}
};

exports.rekam_medis = async(req, res, next)=>{
  try {
      let data = await model.catatan_medis.findAll({where:{id_pasien:req.params.id_pasien}});
      res.render('template/base',{
          data:data,
          getUrl:'rekam_medis',
          id_pasien:req.params.id_pasien
      });
  } catch (error) {
      throw new Error(error);
  }
}

exports.pemeriksaan_data = async(req, res, next)=>{
  try {
      let data_catatan = await model.catatan_medis.findAll({where:{id_pasien:req.params.id_pasien},raw:true});
      let data = [];
      for (const row of data_catatan) {
          row.pemeriksaan = [];
          let pemeriksaan = await model.pemeriksaan.findOne({where:{id_catatan_medis:row.id_catatan_medis},raw:true})
          if(pemeriksaan) {
              row.pemeriksaan.push(pemeriksaan)
              data.push(row);
          }else{
              return;
          }
      }
      //return res.json(data);
      res.render('template/base',{
          data: data,
          getUrl:'pemeriksaan_data'
      }) 
  } catch (error) {
      throw new Error(error);
  }
}

exports.register = async (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  try {
    res.render("template/user/register", {
      path: "/register",
      errorMessage:message
    });
  } catch (err) {
    console.log(err);
  }
};


exports.postRegister = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
  try {
    const cekEmail = await model.pasien.findOne({where:{email: req.body.email}});
    if(cekEmail == null){
              await model.pasien.create({
                nama:req.body.nama,
                email:req.body.email,
                alamat:req.body.alamat,
                telepon:req.body.telepon,
                password:hash,
                jenis_kelamin:req.body.jenis_kelamin,
                tempat_lahir:req.body.tempat_lahir,
                tgl_lahir:req.body.tgl_lahir
              });
            req.flash('success', 'Register Berhasil Silahkan Login');
            return res.redirect('/login');
    }else{
        req.flash('error', 'Email Sudah Digunakan Silahkan Pilih Email Lain');
        return res.redirect('/register');
    }

  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
    let message = req.flash('error');
    let success =req.flash('success');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    if (success.length > 0) {
      success = success[0];
    } else {
      success = null;
    }
    try {
      res.render("template/user/login", {
        path: "/login",
        errorMessage: message,
        successMessage: success
      });
    } catch (err) {
      console.log(err);
    }
  };


exports.postLogin = async (req, res, next) => {
    try {
        const pasien= await model.pasien.findOne({where:{email:req.body.email}});
        if(pasien == null ){
          req.flash('error', 'Email Tidak Terdaftar');
          return res.redirect('/login'); 
        }
        if(bcrypt.compareSync(req.body.password,pasien.password)){
            req.session.loggedIn = true;
            req.session.id_pasien = pasien.id_pasien;
            return res.redirect('/');
        }else{
          req.flash('error', 'Password Tidak Cocok');
          return res.redirect('/login'); 
        }
    } catch (err) {
        console.log(err);
    }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/login');
  });
};