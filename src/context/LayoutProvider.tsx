"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";

// Define the state structure
interface LayoutState {
  searchVisibility: boolean;
}

// Define the actions that can be dispatched to the reducer
type LayoutAction =
  | { type: "SHOW_TOP_SEARCHBAR" }
  | { type: "HIDE_TOP_SEARCHBAR" };

// Create the context with a proper type
const LayoutContext = createContext<
  [LayoutState, Dispatch<LayoutAction>] | undefined
>(undefined);

const initialState: LayoutState = {
  searchVisibility: false,
};

function reducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case "SHOW_TOP_SEARCHBAR":
      return {
        ...state,
        searchVisibility: true,
      };
    case "HIDE_TOP_SEARCHBAR":
      return {
        ...state,
        searchVisibility: false,
      };
    default:
      return state;
  }
}

// Define the props for the provider
interface LayoutProviderProps {
  children: ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  );
}

// Custom hook to use the LayoutContext
export const useStateValue = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useStateValue must be used within a LayoutProvider");
  }
  return context;
};
