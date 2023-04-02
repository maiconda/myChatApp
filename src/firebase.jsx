import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCS702JPYaZ3C_3DtK_yb3Qsm1wM0rrtLg",
  authDomain: "mychatapp-26420.firebaseapp.com",
  projectId: "mychatapp-26420",
  storageBucket: "mychatapp-26420.appspot.com",
  messagingSenderId: "97281873882",
  appId: "1:97281873882:web:b39be3ddeee422b33b92e3"
};

const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

const db = app.firestore()

const googleProvider =  new firebase.auth.GoogleAuthProvider()

export {auth, googleProvider}

export default db