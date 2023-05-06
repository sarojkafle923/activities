import { Fragment, useEffect } from "react";

import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import { LoadingComponent } from "./LoadingComponent";
import { NavBar } from "./NavBar";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent />;
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
