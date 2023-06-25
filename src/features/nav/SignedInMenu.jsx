// Semantic UI components
import { Menu, Image, Dropdown } from "semantic-ui-react";

// library
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// helpers
import { signOutFirebase } from "../../app/firestore/firebaseService";

function SignedInMenu() {
  const { t } = useTranslation();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            icon="plus"
            text={t("navigation.item.createEvent")}
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
            icon="user"
            text={t("navigation.item.profile")}
          />
          <Dropdown.Item
            as={Link}
            to="/account"
            icon="settings"
            text={t("navigation.item.account")}
          />
          <Dropdown.Item
            icon="power"
            text={t("navigation.item.signOut")}
            onClick={handleSignOut}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
