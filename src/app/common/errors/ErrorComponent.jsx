import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";

const ErrorComponent = () => {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Unknown error occured"}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="Return to events page"
      />
    </Segment>
  );
};

export default ErrorComponent;
