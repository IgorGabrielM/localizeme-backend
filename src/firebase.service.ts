import * as admin from 'firebase-admin';

// Inicialize o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('src/config/firebaseConfig.json'),
  databaseURL: 'https://localizeme-1628c-default-rtdb.firebaseio.com/',
});

export const db = admin.database();
