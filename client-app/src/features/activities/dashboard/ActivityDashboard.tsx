import { Grid, List } from "semantic-ui-react";

import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";

export const ActivityDashboard: React.FC = observer(() => {
  const { activityStore } = useStore();
  const { activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      activityStore.loadActivities();
    }
  }, [activityRegistry.size, activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading activities..." />;
  }
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
