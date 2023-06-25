// Semantic UI components
import { Button } from "semantic-ui-react";

// library
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

// helpers
import { closeModal } from "../../app/common/modals/modalReducer";
import { socialLogin } from "../../app/firestore/firebaseService";

function SocialLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSocialLogin = (provider) => {
    dispatch(closeModal());
    socialLogin(provider);
  };

  return (
    <>
      <Button
        fluid
        icon="facebook"
        color="facebook"
        style={{ marginBottom: 10 }}
        content={t("modal.social.facebookLogin")}
        onClick={() => handleSocialLogin("facebook")}
      />
      <Button
        fluid
        icon="google"
        color="google plus"
        content={t("modal.social.googleLogin")}
        onClick={() => handleSocialLogin("google")}
      />
    </>
  );
}

export default SocialLogin;
