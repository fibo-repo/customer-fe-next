import React from "react";
import useToggle from "./useToggle";
import FavoriteWrapper from "./Favorite.style";

// Define the types for the props
interface FavoriteProps {
  className?: string;
  content?: string;
  onClick?: (newValue: boolean) => void; // Define the onClick callback with the new value
}

const Favorite: React.FC<FavoriteProps> = ({
  className,
  content,
  onClick = () => {},
}) => {
  // use toggle hooks
  const [toggleValue, toggleHandler] = useToggle(false);

  // Add all classes to an array
  const addAllClass = ["favorite"];

  // className prop checking
  if (className) {
    addAllClass.push(className);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleHandler(); // Toggle the value
    onClick(!toggleValue); // Pass the new toggle value
  };

  return (
    <FavoriteWrapper
      as="button" // Use button element for semantic purposes
      onClick={handleClick} // Correct onClick handling
      className={`${addAllClass.join(" ")} ${toggleValue ? "active" : ""}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.64 18.232">
        <path
          d="M60.16,56h-.04a4.551,4.551,0,0,0-3.8,2.08A4.551,4.551,0,0,0,52.52,56h-.04A4.522,4.522,0,0,0,48,60.52a9.737,9.737,0,0,0,1.912,5.308A33.506,33.506,0,0,0,56.32,72a33.506,33.506,0,0,0,6.408-6.172A9.737,9.737,0,0,0,64.64,60.52,4.522,4.522,0,0,0,60.16,56Z"
          transform="translate(-47 -55)"
        />
      </svg>
      <span>{content}</span>
    </FavoriteWrapper>
  );
};

export default Favorite;
