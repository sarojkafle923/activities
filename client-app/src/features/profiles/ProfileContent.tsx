import { Profile } from "../../app/models/profile";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileActivities } from "./ProfileActivities";
import { ProfileFollowings } from "./ProfileFollowings";
import { ProfilePhotos } from "./ProfilePhotos";
import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export const ProfileContent: React.FC<Props> = observer(({ profile }) => {
  const { profileStore } = useStore();
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileActivities /> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
});
