const admin = require("firebase-admin");
const serviceAccount = require("../Apikey.json");
const express = require("express");
const { fullDate } = require("./configApi/api.js");
const getResultadosApi = require("./helpers/getResultadosApi.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://api1kloterias-default-rtdb.firebaseio.com",
    apiKey: "AIzaSyCZO7ugQFRTjQbNaVg2MdYw_-rWfdZdB5U",
    authDomain: "api1kloterias.firebaseapp.com",
    projectId: "api1kloterias",
    storageBucket: "api1kloterias.appspot.com",
    messagingSenderId: "373279748305",
    appId: "1:373279748305:web:291995a586ad3f566d15f0",
    measurementId: "G-D3HN4VM3C2"
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
    res.send('ok')
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});


