import { useState, useCallback } from "react";

// Define the return type of useToggle hook
type UseToggleReturn = [boolean, () => void];

// Add a type for the initialValue, which should be boolean
const useToggle = (initialValue: boolean): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  const toggler = useCallback(() => setValue((value) => !value), []);

  return [value, toggler];
};

export default useToggle;
