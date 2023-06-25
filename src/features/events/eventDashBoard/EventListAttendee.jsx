// Semantic UI components
import { List, Image } from "semantic-ui-react";

// library
import { Link } from "react-router-dom";

function EventListAttendee({ attendee }) {
  return (
    <List.Item as={Link} to={`/profile/${attendee.id}`}>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  );
}

export default EventListAttendee;
