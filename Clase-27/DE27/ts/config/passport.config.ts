import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import { createHash, isValidPassword } from "../DB/index.db";
import { userModel } from "../DB/models/user.model";
import { userFacebookModel } from '../DB/models/userFacebook.model';
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use('login', new LocalStrategy(
  {
    passReqToCallback: true
  }, (
    req: any, username: any, password: any, done: any
  ) => {
  userModel.findOne({ 'username': username }, (err: any, user: any) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      console.log(`User Not Found with username: ${username}`);
      return done(null, false, console.log('message', 'User Not Found'))
    }
    if (!isValidPassword(user, password)) {
      console.log('Invalid Password');
      return done(null, false, console.log('message', 'Invalid Password'))
    }
    return done(null, user)
  })
}
));

passport.use('singup', new LocalStrategy(
  {
    passReqToCallback: true
  }, (req: any, username: any, password: any, done: any) => {
    const findOrCreateUser = () => {
      userModel.findOne({ 'username': username }, (err: any, user: any) => {
        // console.log(`Username: ${username}, Password: ${password}, User: ${user}, REQUEST: ${req.body}`)
        if (err) {
          console.log(`Error in SingUp: ${err}`);
          return done(err);
        }
        if (user) {
          console.log('User already exists');
          return done(null, false, { message: 'User Already Exists' })
        } else {
          let newUser = new userModel();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.body.email;
          newUser.nombre = req.body.nombre;
          newUser.apellido = req.body.apellido;
          newUser.save((err: any) => {
            if (err) {
              console.log(`Error in Saving user: ${err}`);
              throw err;
            }
            console.log('User registration succesful')
            return done(null, newUser)
          })
        }
      })
    }
    process.nextTick(findOrCreateUser);
  })
);

passport.use(new FacebookStrategy({
  clientID: '1833584373478234',
  clientSecret: 'c64f741c6c4e75fdd580162fd59d3d86',
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken:any, refreshToken:any, profile:any, cb:any) => {
  const findOrCreate = () => {
    userFacebookModel.findOne({ 'facebookId': profile.id }, (err: any, user: any) => {
      // console.log(`Username: ${username}, Password: ${password}, User: ${user}, REQUEST: ${req.body}`)
      console.log(profile)
      if (err) {
        console.log(`Error in SingUp: ${err}`);
        return cb(err);
      }
      if (user) {
        console.log('User already exists');
        console.log(user);
        return cb(null, user)
      } else {
        console.log(profile)
        let newUser = new userFacebookModel();
        newUser.facebookId = profile.id;
        newUser.username = profile.displayName;
        newUser.save((err: any) => {
          if (err) {
            console.log(`Error in Saving user: ${err}`);
            throw err;
          }
          console.log('User registration succesfully')
          return cb(null, newUser)
        })
      }
    })
  }
  process.nextTick(findOrCreate);
}))

passport.serializeUser((user: any, done: any) => {
  done(null, user._id)
})

passport.deserializeUser((id: any, done: any) => {
  userModel.findById(id, (err: any, user: any) => {
    done(err, user);
  })
})

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('pages/login')
  }
}

export const inicializarPassport = passport.initialize()

export const sessionPassport = passport.session()
