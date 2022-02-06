const model = require('../model/index.js');

const bcrypt = require('bcrypt');

const { Op } = require("sequelize");

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
      res.render("template/dokter/login", {
        errorMessage: message,
        successMessage: success
      });
    } catch (err) {
      console.log(err);
    }
  };


exports.postLogin = async (req, res, next) => {
    try {
        const dokter= await model.dokter.findOne({where:{email:req.body.email}});
        if(dokter == null ){
          req.flash('error', 'Email Tidak Terdaftar');
          return res.redirect('/dokter/login'); 
        }
        if(bcrypt.compareSync(req.body.password,dokter.password)){
            req.session.loggedAdmin = true;
            return res.redirect('/dokter');
        }else{
          req.flash('error', 'Password Tidak Cocok');
          return res.redirect('/dokter/login'); 
        }
    } catch (err) {
        console.log(err);
    }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/dokter/login');
  });
};

exports.getIndex = async(req, res, next)=>{
    res.render('template/base_dokter',{
        getUrl:'index',
    })
};

exports.obat_data = async(req, res, next)=>{
    let data = await model.obat.findAll();
    res.render('template/base_dokter',{
        getUrl:'obat_data',
        data:data
    })
}

exports.obat_tambah = async(req, res, next)=>{
    res.render('template/base_dokter',{
        getUrl:'obat_tambah',
        data:''
    })
}

exports.obat_tambah_post = async(req, res, next)=>{
    try {
        await model.obat.create({
            nama_obat:req.body.nama_obat,
            harga_jual:req.body.harga_jual,
            harga_beli:req.body.harga_beli
        })
       return res.status(200).redirect('/dokter/obat_data');
    } catch (error) {
        throw new Error(error);
    }
}

exports.obat_masuk_tambah = async(req, res, next)=>{
    res.render('template/base_dokter',{
        getUrl:'obat_masuk_tambah',
        id_obat:req.params.id_obat,
    })
}

exports.obat_masuk_tambah_post = async(req, res, next)=>{
    try {
        let obat = await model.obat.findOne({where:{id_obat:req.body.id_obat}});
        let jumlah_obat = parseInt(obat.jumlah) + parseInt(req.body.jumlah); 
        await model.obat.update({jumlah:jumlah_obat},{where:{id_obat:req.body.id_obat}});
        await model.obat_masuk.create({id_obat:req.body.id_obat,jumlah:req.body.jumlah,supplier:req.body.supplier});
        return res.status(200).redirect('/dokter/obat_data');
    } catch (error) {
        throw new Error(error);
    }
}

exports.pasien_data = async(req, res)=>{
    try {
        const pasien = await model.pasien.findAll();
        res.render('template/base_dokter',{
            data:pasien,
            getUrl:'/pasien_data'
        })
    } catch (error) {
        
    }
}

exports.rekam_medis = async(req, res, next)=>{
    try {
        let data = await model.catatan_medis.findAll({where:{id_pasien:req.params.id_pasien}});
        res.render('template/base_dokter',{
            data:data,
            getUrl:'rekam_medis',
            id_pasien:req.params.id_pasien
        });
    } catch (error) {
        throw new Error(error);
    }
}

exports.rekam_medis_tambah = async(req, res, next)=>{
    res.render('template/base_dokter',{
        getUrl:'rekam_medis_tambah',
        data:'',
        id_pasien:req.params.id_pasien,
        id_catatan_medis:''
    });
}

exports.rekam_medis_update = async(req, res, next)=>{
    let data = await model.catatan_medis.findOne({where:{id_catatan_medis:req.params.id_catatan_medis}})
    res.render('template/base_dokter',{
        getUrl:'rekam_medis_tambah',
        data:data,
        id_catatan_medis:req.params.id_catatan_medis,
        id_pasien:''
    });
}

exports.rekam_medis_update_post = async(req, res, next)=>{
    //return res.json(req.body)
    await model.catatan_medis.update({keluhan:req.body.keluhan,diagnosa:req.body.diagnosa,tgl_catatan:req.body.tgl_catatan},{where:{id_catatan_medis:req.body.id_catatan_medis}});
    res.redirect(req.get('referer'));
}

exports.rekam_medis_tambah_post = async(req, res, next)=>{
    try {
        await model.catatan_medis.create({id_pasien:req.body.id_pasien,keluhan:req.body.keluhan,diagnosa:req.body.diagnosa,tgl_catatan:req.body.tgl_catatan});
        return res.redirect(`/dokter/rekam_medis/${req.body.id_pasien}`);
    } catch (error) {
        throw new Error(error);
    }
}

exports.rekam_medis_delete = async(req, res, next)=>{
    try {
        await model.catatan_medis.destroy({where:{id_catatan_medis:req.params.id_catatan_medis}});
       return res.redirect('back');
    } catch (error) {
        throw new Error(error);
    }
}

exports.pemeriksaan_input = async(req, res, next)=>{
    res.render('template/base_dokter',{
        getUrl:'pemeriksaan_input',
        id_catatan_medis:req.params.id_catatan_medis,
        data:''
    })
}

exports.pemeriksaan_input_post = async(req, res, next)=>{
    try {
        await model.pemeriksaan.create({
                                        id_catatan_medis:req.body.id_catatan_medis,
                                        tinggi_badan:req.body.tinggi_badan,
                                        berat_badan:req.body.berat_badan,
                                        tekanan_darah:req.body.tekanan_darah,
                                        kesimpulan:req.body.kesimpulan,
                                        tgl_pemeriksaan:req.body.tgl_pemeriksaan
                                        });
       return res.redirect('/dokter/pasien_data');
        
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
        res.render('template/base_dokter',{
            data: data,
            getUrl:'pemeriksaan_data'
        }) 
    } catch (error) {
        throw new Error(error);
    }
}

exports.transaksi = async (req, res, next)=>{
    try {
        let obat = await model.obat.findAll();
        res.render('template/base_dokter',{
            id_pemeriksaan: req.params.id_pemeriksaan,
            getUrl:'transaksi',
            obat:obat
        });   
    } catch (error) {
        throw new Error(error);
    }
}

exports.transaksi_tambah = async(req, res, next)=>{
    try {
        let obat = await model.obat.findOne({id_obat:req.body.id_obat});
        if(obat.jumlah >= req.body.jumlah){
            let sisa = obat.jumlah - req.body.jumlah;
            await model.obat.update({jumlah:sisa},{where:{id_obat:req.body.id_obat}});
            await model.obat_keluar.create({id_obat:req.body.id_obat,id_pemeriksaan:req.body.id_pemeriksaan,jumlah:req.body.jumlah,harg_jual:req.body.harg_jual});
            await model.transaksi.create({
                id_obat:req.body.id_obat,
                id_pemeriksaan:req.body.id_pemeriksaan,
                tgl_transaksi:req.body.tgl_transaksi,
                harga_obat:req.body.harga_obat,
                jumlah:req.body.jumlah,
                harga_pemeriksaan:req.body.harga_pemeriksaan
            })
            res.redirect('back');
        }else{
            redirect('refresh');
        }
    } catch (error) {
        throw new Error(error);
    }
}

exports.transaksi_data = async(req, res, next)=>{
    try {
        let transaksi = await model.transaksi.findAll({raw:true});
        let data = [];
        for (const row of transaksi) {
            row.obat = [];
            row.pemeriksaan = [];
            row.obat.push(await model.obat.findOne({where:{id_obat:row.id_obat}}));
            row.pemeriksaan.push(await model.pemeriksaan.findOne({where:{id_pemeriksaan:row.id_pemeriksaan}}));
            data.push(row);
        }
        res.render('template/base_dokter',{
            data:data,
            getUrl:'transaksi_data'
        })
    } catch (error) {
        throw new Error(error);
    }
}