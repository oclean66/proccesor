const admin = require("firebase-admin");
const serviceAccount = require("../loterias-1k-firebase-adminsdk-odqc2-16b10f1c07.json");
const express = require("express");
const { fullDate } = require("./helpers/getters");
const getResultadosApi = require("./helpers/getResultadosApi.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://loterias-1k-default-rtdb.firebaseio.com",
    apiKey: "AIzaSyCA0OH7fKpze8NDArOp7vuYqsh9nMTEKFI",
    authDomain: "loterias-1k.firebaseapp.com",
    projectId: "loterias-1k",
    storageBucket: "loterias-1k.appspot.com",
    messagingSenderId: "86652922033",
    appId: "1:86652922033:web:d94a3279c69a303c8a9a90"
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
const port = process.env.PORT || 3000;

app.get("/updateLotery", (req, res) => {
    subirNodos();
    res.send('Do it')
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});


