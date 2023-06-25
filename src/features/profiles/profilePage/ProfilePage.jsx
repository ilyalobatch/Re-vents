// Semantic UI components
import { Grid } from "semantic-ui-react";

// Components
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// library
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// helpers
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToSelectedUserProfile } from "../profileActions";

function ProfilePage({ match }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  let profile;

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.id,
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content={t("profile.loading")} />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
}

export default ProfilePage;
