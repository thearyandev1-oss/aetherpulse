const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
exports.aiTraffic = functions.https.onRequest((req, res) => {
  res.send({ status: "Google Cloud Functions Active" });
});
