import cuid from "cuid";
import firebase from "../config/firebase";

const database = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
  if (!snapshot.exists) {
    return undefined;
  }

  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const listenToEventsFromFirestore = () => {
  return database.collection("events").orderBy("date");
};

export const listenToEventFromFirestore = (eventId) => {
  return database.collection("events").doc(eventId);
};

export const addEventToFirestore = (event) => {
  return database.collection("events").add({
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
  });
};

export const updateEventInFirestore = (event) => {
  return database.collection("events").doc(event.id).update(event);
};

export const deleteEventInFirestore = (eventId) => {
  return database.collection("events").doc(eventId).delete();
};

export const cancelEventToggle = (event) => {
  return database.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
};

export const setUserProfileData = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
