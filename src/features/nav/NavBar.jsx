// Semantic UI components
import { Menu, Container, Button } from "semantic-ui-react";

// Components
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import LanguageSwitcher from "./LanguageSwitcher";

// library
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t } = useTranslation();
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" className="logo">
          <img src="/assets/logo.png" alt="Logo" style={{ marginRight: 10 }} />
          {t("common.appName")}
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          exact
          to="/events"
          name={t("navigation.item.events")}
        />

        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button
              positive
              inverted
              content={t("navigation.item.createEvent")}
            />
          </Menu.Item>
        )}

        <Menu.Item position="right">
          <LanguageSwitcher />
        </Menu.Item>

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}

export default NavBar;
