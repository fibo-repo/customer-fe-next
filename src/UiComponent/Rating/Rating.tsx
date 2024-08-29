import React from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { RatingIconWrapper } from "./Rating.style";

// Define the props interface
interface RatingProps {
  rating: number; // The rating score (required)
  ratingCount?: number; // Number of ratings (optional)
  type: "bulk" | "detailed"; // Type of rating view (required)
  ratingFieldName?: string; // Field name for rating (optional)
}

const Rating: React.FC<RatingProps> = (props) => {
  const { rating, ratingCount, type, ratingFieldName } = props;
  let i, floorValue;
  let ratingView = [];

  // Render the star icons
  if (rating && rating !== 0) {
    floorValue = Math.floor(rating);
    for (i = 0; i < 5; i++) {
      if (i < floorValue) {
        ratingView.push(<IoIosStar key={i} />);
      } else {
        ratingView.push(<IoIosStarOutline key={i} />);
      }
    }
  }

  // Determine the listing condition based on rating
  let listingCondition: string;
  if (rating === 5) {
    listingCondition = "Awesome";
  } else if (4 <= rating && rating < 5) {
    listingCondition = "Good";
  } else if (3 <= rating && rating < 4) {
    listingCondition = "Average";
  } else if (2 <= rating && rating < 3) {
    listingCondition = "Bad";
  } else if (rating >= 1) {
    listingCondition = "Terrible";
  } else {
    listingCondition = "";
  }

  // Show rating count if available
  let showRatingCount: string = ratingCount ? `(${ratingCount})` : "";

  return (
    <>
      {type === "bulk" ? (
        <>
          <RatingIconWrapper>
            <IoIosStar />
          </RatingIconWrapper>
          <div>
            <strong style={{ marginLeft: "3px" }}>{rating}</strong>
          </div>
        </>
      ) : (
        <>
          <span>{ratingFieldName}</span> {ratingView}
        </>
      )}
    </>
  );
};

export default Rating;
