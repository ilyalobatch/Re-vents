// Semantic UI components
import { Menu, Button } from "semantic-ui-react";

// library
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

// helpers
import { openModal } from "../../app/common/modals/modalReducer";

function SignedOutMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Menu.Item position="right">
      <Button
        className="login"
        basic
        inverted
        content={t("navigation.item.login")}
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
      />
      <Button
        className="register"
        basic
        inverted
        content={t("navigation.item.register")}
        onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
      />
    </Menu.Item>
  );
}

export default SignedOutMenu;
