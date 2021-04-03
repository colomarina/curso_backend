var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://be-ecommerce-default-rtdb.firebaseio.com/"
});

const db = admin.firestore()

const query = db.collection('perritos')

let doc = query.doc('1')
doc.create({name: 'kira', age: 1})
  .then(
    () => {
      console.log('Se creo!')
    }
  )