// Semantic UI components
import { Tab } from "semantic-ui-react";

// Components
import AboutTab from "./AboutTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";
import PhotosTab from "./PhotosTab";

// library
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ProfileContent({ profile, isCurrentUser }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: t("profile.panes.about.label"),
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: t("profile.panes.photos.label"),
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: t("profile.panes.events.label"),
      render: () => <EventsTab profile={profile} />,
    },
    {
      menuItem: t("profile.panes.followers.label"),
      render: () => (
        <FollowingTab
          profile={profile}
          key={profile.id}
          activeTab={activeTab}
        />
      ),
    },
    {
      menuItem: t("profile.panes.following.label"),
      render: () => (
        <FollowingTab
          profile={profile}
          key={profile.id}
          activeTab={activeTab}
        />
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      activeIndex={activeTab}
    />
  );
}

export default ProfileContent;
