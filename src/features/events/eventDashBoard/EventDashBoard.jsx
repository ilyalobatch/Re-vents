// Semantic UI components
import { Grid, Loader } from "semantic-ui-react";

// Components
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

// library
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RETAIN_STATE } from "../eventConstants";

// helpers
import { fetchEvents } from "../eventActions";

function EventDashBoard() {
  const limit = 2;
  const dispatch = useDispatch();

  const { events, moreEvents, filter, startDate, lastVisible, retainState } =
    useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  const [loadingInitial, setLoadingInitial] = useState(false);

  const handleFetchNextEvents = () => {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
  };

  useEffect(() => {
    if (retainState) {
      return;
    }
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });

    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  return (
    <Grid className="dashboard stackable">
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters loading={loading} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDashBoard;
