import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GridCard from "../GridCard/GridCard";
import Rating from "../Rating/Rating";
import { RoomGuest, SearchDate } from "@/types/commonTypes";
import { formatCurrencyAmount } from "@/library/utils/commonUtils";
import { PriceType } from "@/library/utils/enums";

interface PropertyDetail {
  detailsName: string;
  detailsValue: number;
}

interface PropertyPrice {
  originalPrice: number;
  discountedPrice?: number;
  type: keyof typeof PriceType;
}

interface Breakdown {
  [key: string]: { total: number } | number;
}

interface PropertyTotalPrice {
  breakdown?: Breakdown;
  totalPrice?: number;
}

interface PropertyData {
  id: number;
  city: string;
  state: string;
  title: string;
  propertyType: string;
  thumbnailUrl: string;
  categories: string[];
  propertyBasePrice: PropertyPrice;
  propertyTotalPrice: PropertyTotalPrice;
  propertyDetails: PropertyDetail[];
  overallRating?: {
    overallRating: string;
    totalReviews: number;
  };
}

interface PostGridProps {
  propertyData: PropertyData;
  searchDate?: SearchDate;
  roomGuest?: RoomGuest;
}

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PostGrid: React.FC<PostGridProps> = ({
  propertyData,
  searchDate,
  roomGuest,
}) => {
  const {
    city,
    state,
    title,
    propertyType,
    id,
    thumbnailUrl,
    propertyBasePrice,
    propertyTotalPrice,
    propertyDetails = [],
    overallRating,
  } = propertyData;

  // Collect all images
  const allImages: { url: string; title: string }[] = [];

  if (thumbnailUrl && typeof thumbnailUrl === "string") {
    allImages.push({ url: thumbnailUrl, title });
  }

  // Extract property offerings (guests, beds, bathrooms, bedrooms)
  const getOfferings = (): Record<string, { name: string; value: number }> => {
    const offerings: Record<string, { name: string; value: number }> = {};

    propertyDetails.forEach((propertyDetail) => {
      const key = propertyDetail.detailsName.toLowerCase();
      if (["guests", "beds", "bathrooms", "bedrooms"].includes(key)) {
        offerings[key] = {
          name: propertyDetail.detailsName,
          value: propertyDetail.detailsValue,
        };
      }
    });

    return offerings;
  };

  return (
    <>
      <GridCard
        state={state}
        city={city}
        id={id}
        title={title}
        originalPrice={`${formatCurrencyAmount.format(
          propertyBasePrice?.originalPrice
        )} ${PriceType[propertyBasePrice?.type]}`}
        discountedprice={
          propertyBasePrice?.discountedPrice
            ? `${formatCurrencyAmount.format(
                propertyBasePrice?.discountedPrice
              )} ${PriceType[propertyBasePrice?.type]}`
            : null
        }
        propertyTotalPrice={`${formatCurrencyAmount.format(
          propertyTotalPrice?.totalPrice ?? 0
        )}`}
        propertyTotalPriceDetails={propertyTotalPrice}
        offerings={getOfferings()}
        propertyType={propertyType}
        searchDate={searchDate || { setStartDate: "", setEndDate: "" }}
        roomGuest={roomGuest || { guest: 1 }}
        rating={
          overallRating?.overallRating !== "NEW" ? (
            <Rating
              rating={Number(overallRating?.overallRating)}
              ratingCount={Number(overallRating?.totalReviews)}
              type="bulk"
            />
          ) : (
            ""
          )
        }
      >
        <Carousel
          additionalTransfrom={0}
          renderDotsOutside={false}
          responsive={responsive}
          itemClass=""
          slidesToSlide={1}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            key={id}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "relative",
            }}
          />
        </Carousel>
      </GridCard>
    </>
  );
};

export default PostGrid;
