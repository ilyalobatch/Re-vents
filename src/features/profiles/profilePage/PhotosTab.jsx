// Semantic UI components
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

// Components
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";

// library
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// helpers
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToUserPhotos } from "../profileActions";

function PhotosTab({ profile, isCurrentUser }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={t("profile.panes.photos.label")}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={
                editMode
                  ? t("profile.panes.photos.cancelEdit")
                  : t("profile.panes.photos.edit")
              }
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} wrapped />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      basic
                      color="green"
                      content={t("profile.panes.photos.main")}
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                    />
                    <Button
                      name={photo.id}
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      basic
                      color="red"
                      icon="trash"
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default PhotosTab;
