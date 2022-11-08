import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBsgND_y99lwDMMOfRyPEhBmnwSV3MQMLg",
  authDomain: "crwn-clothing-db-a4d4d.firebaseapp.com",
  projectId: "crwn-clothing-db-a4d4d",
  storageBucket: "crwn-clothing-db-a4d4d.appspot.com",
  messagingSenderId: "790563514418",
  appId: "1:790563514418:web:220d4782b784eada07742b",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider)
}

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log("Error creating user ", error.message)
    }
  }

  return userDocRef
}