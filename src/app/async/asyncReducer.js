const ASYNC_ACTION_START = "ASYNC_ACTION_START";
const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";
export const APP_LOADED = "APP_LOADED";

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

export const asyncActionStart = () => {
  return {
    type: ASYNC_ACTION_START,
  };
};

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH,
  };
};

export const asyncActionError = (error) => {
  console.log(error);
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error,
  };
};

const asyncReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
      };

    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      };

    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case APP_LOADED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export default asyncReducer;
