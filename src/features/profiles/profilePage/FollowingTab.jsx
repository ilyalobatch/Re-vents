// Semantic UI components
import { Card, Grid, Header, Tab } from "semantic-ui-react";

// Components
import ProfileCard from "./ProfileCard";

// library
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// helpers
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToFollowers, listenToFollowings } from "../profileActions";

function FollowingTab({ profile, activeTab }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { followers, followings } = useSelector((state) => state.profile);

  useFirestoreCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data) =>
      activeTab === 3
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [dispatch, activeTab],
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? t("profile.panes.followers.label")
                : t("profile.panes.following.label")
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activeTab === 3 &&
              followers.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 4 &&
              followings.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default FollowingTab;
