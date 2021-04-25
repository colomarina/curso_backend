import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import { createHash, isValidPassword } from "../DB/index.db";
import { userModel } from "../DB/models/user.model";
const LocalStrategy = require('passport-local').Strategy;

passport.use('login', new LocalStrategy(
  {
    passReqToCallback : true
  },(
    req:any, username:any, password:any, done:any
    ) => {
    userModel.findOne({'username': username}, (err:any, user:any) => {
      if (err){
        return done(err);
      }
      if (!user){
        console.log(`User Not Found with username: ${username}`);
        return done(null, false, console.log('message', 'User Not Found'))
      }
      if(!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false, console.log('message', 'Invalid Password'))
      }
      return done(null, user)
    })  
  }
));

passport.use('singup', new LocalStrategy(
  {
    passReqToCallback : true
  }, (req:any, res:any, username:any, password:any, done:any) => {
    const findOrCreateUser = () => {
      userModel.findOne({'username': username}, (err:any, user:any) => {
        if (err){
          console.log(`Error in SingUp: ${err}`);
          return done(err);
        }
        if (user){
          console.log('User already exists');
          return done(null, false,console.log('message', 'User Already Exists'))
        } else {
          let newUser = new userModel();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.body.email;
          newUser.nombre = req.body.nombre;
          newUser.apellido = req.body.apellido;
          newUser.save((err:any) => {
            if(err){
              console.log(`Error in Saving user: ${err}`);
              res.redirect('/registerError')
              // throw err;
            }
            // console.log('User registration succesful')
            return done(null, newUser)
          })
        }
      })  
    }
    process.nextTick(findOrCreateUser);
  })
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id)
})

passport.deserializeUser((id: any, done: any) => {
  userModel.findById(id, (err: any, user: any) => {
    done(err, user);
  })
})

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  if(req.isAuthenticated()){
    next()
  } else {
    res.redirect('pages/login')
  }
}

export const inicializarPassport =  passport.initialize()

export const sessionPassport =  passport.session()
