import { createContext } from "react";
import { useReducer } from "react";

const initialState = {
  activeStore: {},
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STORE_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "SET_ACTIVE_STORE":
      return {
        ...state,
        activeStore: action.payload,
      };

    default:
      return state;
  }
};

export const StoreUsersContext = createContext();

export const StoreUsersProvider = ({ children }) => {
  const [storeUsers, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreUsersContext.Provider value={{ storeUsers, dispatch }}>
      {children}
    </StoreUsersContext.Provider>
  );
};
