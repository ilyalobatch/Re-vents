// Semantic UI components
import { Menu, Header } from "semantic-ui-react";

// library
import Calendar from "react-calendar";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// helpers
import { setFilter, setStartDate } from "../eventActions";

function EventFilters({ loading }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { filter, startDate } = useSelector((state) => state.event);

  return (
    <>
      {authenticated && (
        <Menu vertical size="large" style={{ width: "100%" }}>
          <Header
            icon="filter"
            attached
            color="teal"
            content={t("event.filter.label")}
          />
          <Menu.Item
            content={t("event.filter.allEvents")}
            active={filter === "all"}
            onClick={() => dispatch(setFilter("all"))}
            disabled={loading}
          />
          <Menu.Item
            content={t("event.filter.imGoing")}
            active={filter === "isGoing"}
            onClick={() => dispatch(setFilter("isGoing"))}
            disabled={loading}
          />
          <Menu.Item
            content={t("event.filter.imHosting")}
            active={filter === "isHost"}
            onClick={() => dispatch(setFilter("isHost"))}
            disabled={loading}
          />
        </Menu>
      )}
      <Header
        icon="calendar"
        attached
        color="teal"
        content={t("event.filter.calendarLabel")}
      />
      <Calendar
        onChange={(date) => dispatch(setStartDate(date))}
        value={startDate || new Date()}
        tileDisabled={() => loading}
        locale={i18n.language || "en"}
      />
    </>
  );
}

export default EventFilters;
