module.exports = {

  create: (req: any, res: any) => {
    if(!req.query.username) {
      res.render("pages/login");
    } else if(req.query.username){
      req.session.user = req.query.username;
      res.redirect('/api/productos')
    }
  },
  delete: (req:any, res: any) => {
    req.session.destroy( (err:any) => {
      if (err) {
        console.log(err)
      } else {
        setTimeout(() => {
          res.redirect('/api/login')
        }, 2000);
      }
    })
  }
}