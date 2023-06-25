// Semantic UI components
import { Card, Image } from "semantic-ui-react";

// library
import { Link } from "react-router-dom";

function ProfileCard({ profile }) {
  return (
    <Card as={Link} to={`/profile/${profile.id}`}>
      <Image src={profile.photoURL || "/assets/user.png"} />
      <Card.Content>
        <Card.Header content={profile.displayName} />
      </Card.Content>
    </Card>
  );
}

export default ProfileCard;
