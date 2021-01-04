import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBWvy8RXXGazSsJL6PdOEhQhkcUM_Z0MPY",
  authDomain: "kingshop-8501d.firebaseapp.com",
  databaseURL: "https://kingshop-8501d.firebaseio.com",
  projectId: "kingshop-8501d",
  storageBucket: "kingshop-8501d.appspot.com",
  messagingSenderId: "1031850991090",
  appId: "1:1031850991090:web:9b82e1e0391dd773a8df6b",
  measurementId: "G-9GXY2K63K2",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
