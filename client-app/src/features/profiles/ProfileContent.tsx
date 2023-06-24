import { Profile } from "../../app/models/profile";
import { ProfileAbout } from "./ProfileAbout";
import { ProfilePhotos } from "./ProfilePhotos";
import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}

export const ProfileContent: React.FC<Props> = observer(({ profile }) => {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});
