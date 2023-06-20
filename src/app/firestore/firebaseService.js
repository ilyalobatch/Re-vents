import { toast } from "react-toastify";
import firebase from "../../app/config/firebase";
import { setUserProfileData } from "./firestoreService";

export const firebaseObjectToArray = (snapshot) => {
  if (snapshot) {
    return Object.entries(snapshot).map((element) =>
      Object.assign({}, element[1], { id: element[0] })
    );
  }
};

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

export const uploadToFirebaseStorage = (file, filename) => {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();

  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
};

export const deleteFromFirebaseStorage = (filename) => {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);

  return photoRef.delete();
};

export const addEventChatComment = (eventId, values) => {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };

  return firebase
    .app()
    .database(
      "https://re-events-5a5c7-default-rtdb.europe-west1.firebasedatabase.app/"
    )
    .ref(`chat/${eventId}`)
    .push(newComment);
};

export const getEventChatRef = (eventId) => {
  return firebase
    .app()
    .database(
      "https://re-events-5a5c7-default-rtdb.europe-west1.firebasedatabase.app/"
    )
    .ref(`chat/${eventId}`)
    .orderByKey();
};
