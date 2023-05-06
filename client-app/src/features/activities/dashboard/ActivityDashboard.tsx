import { Grid, List } from "semantic-ui-react";

import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../details/ActivityForm";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export const ActivityDashboard: React.FC = observer(() => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
});
