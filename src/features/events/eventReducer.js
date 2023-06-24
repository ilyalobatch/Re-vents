import {
  CLEAR_COMMENTS,
  CLEAR_EVENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  UPDATE_EVENT,
} from "./eventConstants";

const initialState = {
  events: [],
  comments: [],
  moreEvents: true,
  selectedEvent: null,
};

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== payload.id),
          payload,
        ],
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((event) => event.id !== payload)],
      };

    case FETCH_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
      };

    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };

    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: payload,
      };

    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: true,
      };

    default:
      return state;
  }
};

export default eventReducer;
