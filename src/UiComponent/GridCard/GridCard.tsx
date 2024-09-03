import React, { ReactNode } from "react";
import { Tooltip } from "antd";
import GridCardWrapper, {
  ImageWrapper,
  ContentWrapper,
  LocationArea,
  TitleArea,
  PriceArea,
  RatingArea,
  MetaWrapper,
  Offerings,
} from "./GridCard.style";
import { isEmpty } from "lodash";
import {
  PRICE_BREAKDOWN_KEYS,
  formatCurrencyAmount,
} from "@/library/utils/commonUtils";
import { QueryParams, RoomGuest, SearchDate } from "@/types/commonTypes";

// Define the types for the property breakdown
interface Breakdown {
  [key: string]: { total: number } | number;
}

// Define the types for the props in GridCard
interface GridCardProps {
  className?: string;
  state?: string;
  city?: string;
  title?: string | ReactNode;
  location?: string;
  discountedprice?: string | null;
  editBtn?: ReactNode;
  viewDetailsBtn?: ReactNode;
  children: ReactNode;
  propertyType?: string;
  originalPrice?: string;
  propertyTotalPrice?: string;
  price?: string; 
  propertyTotalPriceDetails?: {
    breakdown?: Breakdown;
  };
  searchDate: SearchDate;
  roomGuest: RoomGuest;
  rating?: ReactNode | string;
  offerings?: {
    [key: string]: {
      name: string;
      value: number;
    };
  };
  id: number;
}

const GridCard: React.FC<GridCardProps> = ({
  className = "",
  state,
  city,
  title,
  discountedprice,
  editBtn,
  offerings = {},
  viewDetailsBtn,
  children,
  propertyType,
  originalPrice,
  propertyTotalPrice,
  propertyTotalPriceDetails = { breakdown: {} },
  searchDate,
  roomGuest = { guest: 1 },
  rating,
  id,
}) => {
  const navigateToDetails = () => {
    const query: QueryParams = {
      date_range: searchDate,
      guest: roomGuest?.guest || 1,
    };

    if (roomGuest?.pets) query.pets = roomGuest.pets;
    if (roomGuest?.infants) query.infants = roomGuest.infants;
    if (roomGuest?.kids) query.kids = roomGuest.kids;

    const searchParams = new URLSearchParams(query as any).toString(); //TODO : Remove type any if possible
    const url = `/property/${id}/${getPropertyHeading().replaceAll(" ", "-")}`;
    const fullUrl = `${url}?${searchParams}`;

    window.open(fullUrl, "_blank");
  };

  const getTotalPriceBreakdownText = () => {
    const { breakdown } = propertyTotalPriceDetails;

    const formatDiscount = (amount: string) => {
      const discount = amount.slice(1, amount.length);
      return formatCurrencyAmount.format(parseFloat(discount));
    };

    return (
      <div>
        {Object.keys(PRICE_BREAKDOWN_KEYS).map((breakdownkey, index) => {
          const breakdownItem = breakdown && breakdown[breakdownkey];

          const amountToDisplay =
            typeof breakdownItem === "object" && breakdownItem !== null
              ? breakdownItem.total
              : breakdownItem;

          if (amountToDisplay) {
            return (
              <div key={index}>
                {PRICE_BREAKDOWN_KEYS[breakdownkey]} :{" "}
                {PRICE_BREAKDOWN_KEYS[breakdownkey] ===
                PRICE_BREAKDOWN_KEYS.discount
                  ? formatDiscount(String(amountToDisplay))
                  : formatCurrencyAmount.format(Number(amountToDisplay))}
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  let classes = viewDetailsBtn || editBtn ? `has_btn ${className}` : className;

  const getOfferingText = () => {
    if (isEmpty(offerings)) return "";

    const guestText = offerings["guests"]
      ? `${offerings["guests"].value} ${offerings["guests"].name}`
      : "";
    const bedText = offerings["beds"]
      ? ` • ${offerings["beds"].value} ${offerings["beds"].name}`
      : "";
    const bathroomText = offerings["bathrooms"]
      ? ` • ${offerings["bathrooms"].value} ${offerings["bathrooms"].name}`
      : "";

    return `${guestText}${bedText}${bathroomText}`;
  };

  const getPropertyHeading = () => {
    let headingText = offerings["bedrooms"]
      ? `${offerings["bedrooms"].value} BHK`
      : "";
    if (propertyType) headingText += ` ${propertyType}`;
    if (city) headingText += ` in ${city}`;
    return headingText;
  };

  return (
    <GridCardWrapper
      className={`grid_card ${classes}`.trim()}
      onClick={navigateToDetails}
    >
      <ImageWrapper className="media_wrapper">{children}</ImageWrapper>

      <ContentWrapper className="content_wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {(state || city) && (
            <LocationArea
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {getPropertyHeading()}
            </LocationArea>
          )}
          {rating && (
            <RatingArea
              className="rating"
              style={{
                marginTop: 0,
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                paddingBottom: 0,
              }}
            >
              {rating}
            </RatingArea>
          )}
        </div>
        {title && <TitleArea>{title}</TitleArea>}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "100%" }}>
            <MetaWrapper className="meta_wrapper">
              <Offerings>{getOfferingText()}</Offerings>
              <span className="original-price">
                {originalPrice && discountedprice ? originalPrice : ""}
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {originalPrice && discountedprice && (
                  <PriceArea className="price">{discountedprice}</PriceArea>
                )}
                {originalPrice && !discountedprice && (
                  <PriceArea className="price">{originalPrice}</PriceArea>
                )}
                <Tooltip
                  placement="bottomLeft"
                  title={getTotalPriceBreakdownText()}
                >
                  <PriceArea
                    className="price"
                    style={{ color: "#4dcad2", textDecoration: "underline" }}
                  >
                    {propertyTotalPrice} total
                  </PriceArea>
                </Tooltip>
              </div>
            </MetaWrapper>
          </div>
        </div>
      </ContentWrapper>
      {/* {favorite && <FavoriteIcon>{favorite}</FavoriteIcon>} */}
    </GridCardWrapper>
  );
};

export default GridCard;
