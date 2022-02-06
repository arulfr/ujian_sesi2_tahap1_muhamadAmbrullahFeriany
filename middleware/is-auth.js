module.exports = (req, res, next) => {
    if(!req.session.loggedAdmin){
        return res.redirect('/dokter/login');
    }
    next();
}