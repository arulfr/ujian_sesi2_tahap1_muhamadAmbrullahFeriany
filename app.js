const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const SequelizeStore = require('express-session-sequelize')(session.Store);
const sequelize = require('./util/database');

const model = require('./model/index')

const userRoutes = require('./routes/user');
const dokterRoutes = require('./routes/dokter');

const flash = require('connect-flash');

// const sessionTime = 1000 * 60 * 60 * 1
var sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 7 * 24 * 60 * 60 * 1000
});

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

// var sessionStore = new MySQLStore({}, sequelize);

//==================setting session ===================================
app.use(session({
  secret: 'secretsecret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));


app.use((req,res,next)=>{
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedAdmin = req.session.loggedAdmin;
  res.locals.id_pasien = req.session.id_pasien;
  next();
});
// sessionStore.sync()

app.use(flash());

// model.bidang.hasMany(model.pegawai);

// model.pegawai.belongsTo(model.bidang);

// model.kegiatan.hasMany(model.pegawai);

// model.seksi.hasMany(model.pegawai);

// model.pegawai.belongsTo(model.seksi);

//=====================================================================
app.use('/dokter',dokterRoutes);
app.use(userRoutes)

app.use(express.static('public'));
app.use('/gambar',express.static(path.join(__dirname,'gambar')))

const server = http.createServer(app);
sequelize
  .sync({alter:true})
  .then(()=>{
    server.listen(3000);
  })