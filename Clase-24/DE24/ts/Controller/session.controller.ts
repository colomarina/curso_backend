module.exports = {

  create: (req: any, res: any) => {
    if(!req.query.username) {
      res.render("pages/login");
    } else if(req.query.username === 'kira') {
      req.session.user = req.query.username;
      req.session.admin = true;
      res.send(`Login success ${req.session.user} is Admin!!`)
    } else if(req.query.username){
      req.session.user = req.query.username;
      res.redirect('/api/productos')
    }
  },
  delete: (req:any, res: any) => {
    req.session.destroy();
    setTimeout(() => {
      res.redirect('/api/login')
    }, 2000);
  }
}