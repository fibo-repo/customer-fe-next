import React from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { RatingIconWrapper } from "./Rating.style";

interface RatingProps {
  rating?: number;
  ratingCount?: number;
  type: "bulk" | "detailed";
  ratingFieldName?: string;
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

  let listingCondition: string;
  if (rating != undefined) {
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
