import { Card, Icon, Image } from "semantic-ui-react";

import { FollowButton } from "./FollowButton";
import { Link } from "react-router-dom";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}

export const ProfileCard: React.FC<Props> = observer(({ profile }) => {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + "..." : str;
    }
  }

  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followersCount} Followers
      </Card.Content>
      <FollowButton profile={profile} />
    </Card>
  );
});
