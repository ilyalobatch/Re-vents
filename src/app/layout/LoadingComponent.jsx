// Semantic UI components
import { Dimmer, Loader } from "semantic-ui-react";

function LoadingComponent({ inverted = true, content = "Loading..." }) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}

export default LoadingComponent;
