// Semantic UI components
import { Button } from "semantic-ui-react";

// library
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// helpers
import { switchLanguage } from "../auth/authActions";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { lang } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleSwitchLanguage(e) {
    if (!e.target.value) return;
    dispatch(switchLanguage(e.target.value));
    i18n.changeLanguage(e.target.value);
  }

  return (
    <Button.Group
      className="lang-switcher"
      basic
      compact
      inverted
      size="small"
      color="olive"
    >
      <Button
        className={lang === "en" ? "active" : ""}
        content={"EN"}
        value="en"
        onClick={handleSwitchLanguage}
      />
      {/*<Button.Or />*/}
      <Button
        className={lang === "ua" ? "active" : ""}
        content={"UA"}
        value="ua"
        onClick={handleSwitchLanguage}
      />
    </Button.Group>
  );
}

export default LanguageSwitcher;
