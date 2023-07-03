// Semantic UI components
import { Grid } from "semantic-ui-react";

// Components
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// library
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

// helpers
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToSelectedEvent } from "../eventActions";

function EventDetailedPage({ match }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.event.selectedEvent);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  const isHost = event?.hostUid === currentUser?.uid;
  const isGoing = event?.attendees?.some(
    (attendee) => attendee.id === currentUser?.uid
  );

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (evt) => dispatch(listenToSelectedEvent(evt)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) {
    return <LoadingComponent content={t("event.loading")} />;
  }

  if (error) {
    return <Redirect to="/error" />;
  }

  return (
    <Grid className="eventDetailView stackable">
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSideBar
          attendees={event.attendees}
          hostUid={event.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetailedPage;
