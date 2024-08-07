import { Image, List, Popup } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { Profile } from "../../../app/models/profile";
import { ProfileCard } from "../../profiles/ProfileCard";
import { observer } from "mobx-react-lite";

interface Props {
  attendees: Profile[];
}
export const ActivityListItemAttendee: React.FC<Props> = observer(
  ({ attendees }) => {
    const styles = {
      borderColor: "orange",
      borderWidth: 3,
    };

    return (
      <List horizontal>
        {attendees.map(attendee => (
          <Popup
            hoverable
            key={attendee.username}
            trigger={
              <List.Item
                key={attendee.username}
                as={Link}
                to={`/profiles/${attendee.username}`}
              >
                <Image
                  bordered
                  style={attendee.following ? styles : null}
                  size="mini"
                  circular
                  src={attendee.image ?? "/assets/user.png"}
                />
              </List.Item>
            }
          >
            <Popup.Content>
              <ProfileCard profile={attendee} />
            </Popup.Content>
          </Popup>
        ))}
      </List>
    );
  }
);
