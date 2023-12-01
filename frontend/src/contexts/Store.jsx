import { createContext } from "react";
import { useEffect, useReducer } from "react";

const initialState = {
  // Define your initial state here
};

const reducer = (state, action) => {
  switch (action.type) {
    // Define your different action types and their corresponding state updates here
    // case 'ACTION_TYPE':
    //   return {
    //     ...state,
    //     // Update the state based on the action
    //   };
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
