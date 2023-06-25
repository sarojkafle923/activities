import { Grid, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import { ActivityListItemPlaceholder } from "./ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import { PagingParams } from "../../../app/models/pagination";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export const ActivityDashboard: React.FC = observer(() => {
  const { activityStore } = useStore();
  const {
    loadingInitial,
    loadActivities,
    activityRegistry,
    setPagingParams,
    pagination,
  } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities();
    }
  }, [activityRegistry.size, loadActivities]);

  return (
    <Grid>
      <Grid.Column width="10">
        {loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
