import { initializeApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBrwNRJ_2-mLTJm7wpPhwNP6KgXYtfwtiI",
    authDomain: "t-rex-68c12.firebaseapp.com",
    projectId: "t-rex-68c12",
    storageBucket: "t-rex-68c12.appspot.com",
    messagingSenderId: "173002783240",
    appId: "1:173002783240:web:62115a2debebe01ee4efbd",
    measurementId: "G-WQBCFJJLS6"
};

export const appfire: FirebaseApp = initializeApp(firebaseConfig);
