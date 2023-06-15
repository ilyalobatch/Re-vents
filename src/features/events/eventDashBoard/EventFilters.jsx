import { Menu, Header } from "semantic-ui-react";
import Calendar from "react-calendar";

const EventFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item fluid content="All Events" />
        <Menu.Item fluid content="I'm going" />
        <Menu.Item fluid content="I'm hosting" />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar />
    </>
  );
};

export default EventFilters;
