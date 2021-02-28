
import { db, firebaseAuth } from '../config/constants';

const googleProvider = new firebaseAuth.GoogleAuthProvider()

export function signInWithGoogle() {
  return firebaseAuth.signInWithPopup(googleProvider).then((res) => {
    // user object
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export function register(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout() {
  const res = firebaseAuth().signOut();
  window.user = null;
  return res;
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser(user) {
    return true
//   return db
//     .collection(`users`)
//     .add({
//       email: user.email,
//       uid: user.uid
//     })
//     .then(docRef => docRef)
//     .catch(function(error) {
//       console.error('Error adding document: ', error);
//     });
}

