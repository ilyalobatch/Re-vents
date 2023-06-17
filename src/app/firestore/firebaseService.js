import { toast } from "react-toastify";
import firebase from "../../app/config/firebase";
import { setUserProfileData } from "./firestoreService";

export const signInWithEmail = (credentials) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};

export const registerInFirebase = async (credentials) => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);

    await result.user.updateProfile({
      displayName: credentials.displayName,
    });
    await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
};

export const socialLogin = async (selectedProvider) => {
  let provider;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateUserPassword = (credentials) => {
  const user = firebase.auth().currentUser;

  return user.updatePassword(credentials.newPassword1);
};
