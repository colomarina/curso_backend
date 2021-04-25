import { Request, Response } from 'express';

module.exports = {

  getRoot: (req: Request, res: Response) => {
    res.send("Bienvenido")
  },
  
  getLogin: (req: Request, res: Response) => {
    if(req.isAuthenticated()){
      let user = req.user;
      // console.log('Usuario logueado');
      res.json({user})
    } else {
      // console.log('Usuario no logueado');
      res.render('pages/login')
    }
  },
  
  getSingup: (req: Request, res: Response) => {
    res.render('pages/register')
  },

  postLogin: (req: Request, res: Response) => {
    res.redirect('/api/productos')
  },
  
  postSingup: (req: Request, res: Response) => {
    res.redirect('/api/productos')
  },
  
  getFaillogin: (req: Request, res: Response) => {
    res.render('pages/loginError')
  },
  
  getFailsingup: (req: Request, res: Response) => {
    res.render('pages/registerError')
  },
  
  getLogout: (req: Request, res: Response) => {
    let user:any = req.user;
    req.logout();
    res.render('pages/logout',{
      tituloUsuario: user.username
    })
  },

  failRoute: (req: Request, res: Response) => {
    res.status(404).render('pages/error404')
  }

}