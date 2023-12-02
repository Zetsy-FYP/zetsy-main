import { createContext } from "react";
import { useReducer } from "react";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_STORE":
      return [...state, action.payload];

    default:
      return state;
  }
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ stores, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
