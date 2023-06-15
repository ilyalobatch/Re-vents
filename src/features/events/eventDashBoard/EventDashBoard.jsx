import EventList from "./EventList";
import { Grid } from "semantic-ui-react";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

const EventDashBoard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  // if (loading) {
  //   return <LoadingComponent />;
  // }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashBoard;
