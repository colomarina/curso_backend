"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionPassport = exports.inicializarPassport = void 0;
require('dotenv').config();
const passport_1 = __importDefault(require("passport"));
const userFacebook_model_1 = require("../db/models/userFacebook.model");
const winston_config_1 = require("./winston.config");
const UserModel = require('../db/models/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password'
};
const strategyOptionsFacebook = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'picture.type(large)'],
    scope: ["email"],
    enableProof: true,
};
const strategyJWT = {
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};
const signup = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.create({ email, password });
        return done(null, user);
    }
    catch (error) {
        winston_config_1.logger.error(error);
        done(error);
    }
});
const login = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        const validate = yield user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Contraseña erronea' });
        }
        return done(null, user, { message: 'Logueado con éxito' });
    }
    catch (error) {
        winston_config_1.logger.error(error);
        return done(error);
    }
});
const loginFacebook = (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const findOrCreate = () => {
        userFacebook_model_1.userFacebookModel.findOne({ 'facebookId': profile.id }, (err, user) => {
            if (err) {
                return cb(err);
            }
            if (user) {
                return cb(null, user);
            }
            else {
                let newUser = new userFacebook_model_1.userFacebookModel();
                newUser.facebookId = profile.id;
                newUser.username = profile._json.name;
                newUser.email = profile._json.email;
                newUser.photo = profile._json.picture.data.url;
                newUser.save((err) => {
                    if (err) {
                        throw err;
                    }
                    return cb(null, newUser);
                });
            }
        });
    };
    process.nextTick(findOrCreate);
});
// Passport middleware to handle user registration
passport_1.default.use('signup', new localStrategy(strategyOptions, signup));
// Passport middleware to handle user login
passport_1.default.use('login', new localStrategy(strategyOptions, login));
// Passport middleware to handle user loginFacebook
passport_1.default.use('facebook', new FacebookStrategy(strategyOptionsFacebook, loginFacebook));
passport_1.default.use(new JWTstrategy(strategyJWT, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (error) {
        winston_config_1.logger.error(error);
        done(error);
    }
})));
exports.inicializarPassport = passport_1.default.initialize();
exports.sessionPassport = passport_1.default.session();
