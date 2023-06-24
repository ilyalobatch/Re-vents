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

export const fetchEventsFromFirestore = (
  predicate,
  limit,
  lastDocSnapshot = null
) => {
  const user = firebase.auth().currentUser;
  let eventsRef = database
    .collection("events")
    .orderBy("date")
    .startAfter(lastDocSnapshot)
    .limit(limit);

  switch (predicate.get("filter")) {
    case "isGoing":
      return eventsRef
        .where("attendeeIds", "array-contains", user.uid)
        .where("date", ">=", predicate.get("startDate"));

    case "isHost":
      return eventsRef
        .where("hostUid", "==", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    default:
      return eventsRef.where("date", ">=", predicate.get("startDate"));
  }
};

export const listenToEventFromFirestore = (eventId) => {
  return database.collection("events").doc(eventId);
};

export const addEventToFirestore = (event) => {
  const user = firebase.auth().currentUser;
  return database.collection("events").add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

export const getUserProfile = (userId) => {
  return database.collection("users").doc(userId);
};

export const updateUserProfile = async (profile) => {
  const user = firebase.auth().currentUser;

  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }

    return await database.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = database.collection("users").doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await database.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }

    return await database
      .collection("users")
      .doc(user.uid)
      .collection("photos")
      .add({
        name: filename,
        url: downloadURL,
      });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = (userUid) => {
  return database.collection("users").doc(userUid).collection("photos");
};

export const setMainPhoto = async (photo) => {
  const user = firebase.auth().currentUser;
  const today = new Date();
  const eventDocQuery = database
    .collection("events")
    .where("attendeeIds", "array-contains", user.uid)
    .where("date", ">=", today);
  const userFollowingRef = database
    .collection("following")
    .doc(user.uid)
    .collection("userFollowing");

  const batch = database.batch();

  batch.update(database.collection("users").doc(user.uid), {
    photoURL: photo.url,
  });

  try {
    const eventsQuerySnap = await eventDocQuery.get();
    eventsQuerySnap.docs.forEach((eventDoc) => {
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventDoc.ref, {
          hostPhotoURL: photo.url,
        });
      }
      batch.update(eventDoc.ref, {
        attendees: eventDoc.data().attendees.filter((attendee) => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url;
          }

          return attendee;
        }),
      });
    });

    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = database
        .collection("following")
        .doc(docRef.id)
        .collection("userFollowers")
        .doc(user.uid);

      batch.update(followingDocRef, {
        photoURL: photo.url,
      });
    });

    await batch.commit();

    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
};

export const deletePhotoFromCollection = (photoId) => {
  const userUid = firebase.auth().currentUser.uid;

  return database
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
};

export const addUserAttendance = (event) => {
  const user = firebase.auth().currentUser;

  return database
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
};

export const cancelUserAttendance = async (event) => {
  const user = firebase.auth().currentUser;

  try {
    const eventDoc = await database.collection("events").doc(event.id).get();
    return database
      .collection("events")
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
};

export const getUserEventsQuery = (activeTab, userUid) => {
  let eventsRef = database.collection("events");
  const today = new Date();

  switch (activeTab) {
    case 1: // past events
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .where("date", "<=", today)
        .orderBy("date", "desc");
    case 2: // hosting
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");
    default:
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .where("date", ">=", today)
        .orderBy("date");
  }
};

export const followUser = async (profile) => {
  const user = firebase.auth().currentUser;
  const batch = database.batch();

  try {
    batch.set(
      database
        .collection("following")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );
    batch.update(database.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (profile) => {
  const user = firebase.auth().currentUser;
  const batch = database.batch();

  try {
    batch.delete(
      database
        .collection("following")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id)
    );
    batch.update(database.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const getFollowersCollection = (profileId) => {
  return database
    .collection("following")
    .doc(profileId)
    .collection("userFollowers");
};

export const getFollowingCollection = (profileId) => {
  return database
    .collection("following")
    .doc(profileId)
    .collection("userFollowing");
};

export const getFollowingDoc = (profileId) => {
  const userUid = firebase.auth().currentUser.uid;

  return database
    .collection("following")
    .doc(userUid)
    .collection("userFollowing")
    .doc(profileId)
    .get();
};
