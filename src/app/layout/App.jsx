import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import EventDashBoard from "../../features/events/eventDashBoard/EventDashBoard";
import NavBar from "../../features/nav/NavBar";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const handleCreateFormOpen = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  };

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <EventDashBoard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        />
      </Container>
    </>
  );
}

export default App;
