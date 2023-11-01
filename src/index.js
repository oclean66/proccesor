const express = require("express");
const admin = require("firebase-admin");
// FIREBASE PROJECT CREDENTIALS
const serviceAccount = require("../firebase/loterias-1k-firebase-adminsdk-odqc2-16b10f1c07.json");
const { fullDate } = require("./helpers/getters");
const { getResultadosApi } = require("./helpers/services.js");
const { PORT } = require("./config");
const FIREBASE_CREDENTIALS = require("./config/firebase");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...FIREBASE_CREDENTIALS,
});

const db = admin.database();

const subirNodos = () => {
  let ref = db.ref(`resultados/${fullDate()}`);
  ref.once("value", function (snapshot) {
    if (snapshot.exists()) {
      getResultadosApi().then((e) => {
        ref.update(e);
      });
    } else {
      getResultadosApi().then((e) => {
        ref.set(e);
      });
    }
  });
};

const app = express();

app.get("/updateLotery", (_, res) => {
  subirNodos();
  res.send(`Loterias actualizadas - ${fullDate()}`);
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
