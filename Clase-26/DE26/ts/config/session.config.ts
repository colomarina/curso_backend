import MongoStore from "connect-mongo";

export const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://colito:LM753951@cluster0.yjnag.mongodb.net/ecommerce',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
  secret: 'kira753951',
  resave: false,
  saveUninitialized: true,
  rolling:true,
  cookie: {
    maxAge:60000
  }
}