const functions = require("firebase-functions");
// var fetch = require("node-fetch");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase)
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
