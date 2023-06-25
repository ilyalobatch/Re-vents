// Semantic UI components
import { Button, Header, Segment } from "semantic-ui-react";

// library
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ErrorComponent() {
  const { t } = useTranslation();
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || t("errors.default")}
      />
      <Button
        primary
        as={Link}
        to="/events"
        style={{ marginTop: 20 }}
        content={t("common.returnToEvents")}
      />
    </Segment>
  );
}

export default ErrorComponent;
