import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import EventDashBoard from "../../features/events/eventDashBoard/EventDashBoard";
import NavBar from "../../features/nav/NavBar";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <NavBar setFormOpen={setFormOpen} />
      <Container className="main">
        <EventDashBoard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  );
}

export default App;
