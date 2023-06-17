import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOutFirebase } from "../../app/firestore/firebaseService";

const SignedInMenu = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="/account"
            text="My account"
            icon="settings"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
