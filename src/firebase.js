import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  where,
  addDoc,
  doc,
  setDoc,
  collection,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBv_35D_onUBgfJ1YqBOLG2ddIxmJlcvp4",
  authDomain: "cutscene-a7560.firebaseapp.com",
  projectId: "cutscene-a7560",
  storageBucket: "cutscene-a7560.appspot.com",
  messagingSenderId: "973771380764",
  appId: "1:973771380764:web:b167407d64112f407427d9",
  measurementId: "G-TYG821ST9V",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    console.log("Could not login");
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully.");
  } catch (error) {
    console.error("Error logging out: ", error);
    alert("Error logging out. Please try again.");
  }
};

const Favorited = async (userId, game) => {
  const userRef = doc(db, "users", userId);
  const favGames = collection(userRef, "FavGames");
  const querySnapshot = await getDocs(
    query(favGames, where("id", "==", game.id))
  );

  if (!querySnapshot.empty) {
    console.log("Game already exists in favorites.");
    return null;
  }

  try {
    const docRef = await addDoc(favGames, game);
    console.log("Added ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error adding game to favorites: ", error);
    throw error;
  }
};

const getGames = async (userId) => {
  const userRef = doc(db, "users", userId);
  const favGames = collection(userRef, "FavGames");
  try {
    const snapshot = await getDocs(favGames);
    const games = [];
    snapshot.forEach((doc) => {
      games.push(doc.data());
    });
    return games;
  } catch (error) {
    console.log("Error returning the games", error);
    return [];
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  Favorited,
  getGames,
};
