"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Slider } from "antd";
import { setStateToUrl } from "../../library/helpers/url_handler";
import { LISTING_POSTS_PAGE } from "@/library/constants/routeUrls";
import CategorySearchWrapper from "./categorySearch.style";
import { FilterAccordion } from "../../UiComponent/FilterAccordion/filterAccordion";
import { RoomGuest, SearchDate } from "@/types/commonTypes";
import Image from "next/image";
import MoreFilterIcon from "@/assets/images/more_filter.svg"

// Define TypeScript types for props
interface Category {
  id: number;
  icon: string;
  name: string;
}

interface PriceRange {
  min: number;
  max: number;
  defaultMin: number;
  defaultMax: number;
}

interface Filters {
  price: {
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
  };
  amenity: number[];
  typeOfPlace: number[];
  category: number[];
  offerings: {
    [key: string]: number;
  };
}

interface City {
  id: number | null;
  name: string;
  zoneIds?: number[];
  stateId?: number;
}

interface CategorySearchProps {
  sidebarHandler: () => void;
  toggle: boolean;
  handleCheckboxClick: (amenityId: number) => void;
  handleDecrement: (type: string) => void;
  handleIncrement: (type: string) => void;
  handlePlaceClick: (placeId: number) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onSearchReset: () => void;
  city: City;
  onClickApply: () => void;
  categoryList: Category[];
  roomGuest: RoomGuest;
  searchDate: SearchDate;
}

interface QueryParams {
  zoneIds?: number[];
  cityId: number | null;
  category: number[];
  guest: number;
  range: number[];
  date_range: SearchDate;
  amenity?: number[];
  typeOfPlace?: number[];
  pets?: number;
  infants?: number;
  kids?: number;
}

const CategorySearch: React.FC<CategorySearchProps> = ({
  sidebarHandler,
  toggle,
  handleCheckboxClick,
  handleDecrement,
  handleIncrement,
  handlePlaceClick,
  filters,
  setFilters,
  onSearchReset,
  city,
  onClickApply,
  categoryList,
  roomGuest,
  searchDate,
}) => {
  const router = useRouter();

  const onValueChange = (
    value: number | number[],
    type: "price" | "category"
  ) => {
    let updatedCategory = filters.category;
    let updatedPriceRange = filters.price;

    if (type === "price") {
      if (Array.isArray(value) && value[1] - value[0] >= 4000) {
        updatedPriceRange = { ...filters.price, min: value[0], max: value[1] };
        setFilters((prev) => ({ ...prev, price: updatedPriceRange }));
      } else return;
    } else {
      const isPresent = filters?.category.includes(value as number);
      if (isPresent) {
        updatedCategory = filters?.category.filter((item) => value !== item);
      } else {
        updatedCategory = [...filters?.category, value as number];
      }
      setFilters((prev) => ({ ...prev, [type]: updatedCategory }));
    }

    const query: QueryParams = {
      zoneIds: city.zoneIds,
      cityId: city.id,
      category: updatedCategory,
      guest: roomGuest.guest,
      range: [updatedPriceRange.min, updatedPriceRange.max] || [
        filters?.price?.min,
        filters?.price?.max,
      ],
      date_range: searchDate,
    };

    if (filters.amenity.length > 0) query.amenity = filters.amenity;
    if (filters.typeOfPlace.length > 0) query.typeOfPlace = filters.typeOfPlace;
    if (roomGuest.pets) query.pets = roomGuest.pets;
    if (roomGuest.infants) query.infants = roomGuest.infants;
    if (roomGuest.kids) query.kids = roomGuest.kids;

    const search = setStateToUrl(query);
    router.push(LISTING_POSTS_PAGE);
  };

  return (
    <CategorySearchWrapper>
      {categoryList.map((category, index) => (
        <div className="view_with__popup" key={index}>
          <div className="popup_handler">
            <Button
              type="default"
              onClick={() => onValueChange(category.id, "category")}
              style={{
                color: filters.category.includes(category?.id)
                  ? "black"
                  : "white",
                fontWeight: 500,
                backgroundColor: filters.category.includes(category.id)
                  ? "#DEFF51"
                  : "#4DCAD2",
                boxShadow: filters.category.includes(category.id)
                  ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                  : "",
                borderRadius: "5px",
              }}
            >
              {/* <span>
                <Image
                  src={`/images/${category.icon}.svg`}
                  alt={category.icon}
                  style={{
                    marginRight: "6px",
                    height: "31px",
                    width: "31px",
                  }}
                />
              </span> */}
              {category.name}
            </Button>
          </div>
        </div>
      ))}
      <div className="view_with__popup">
        <div className="popup_handler">
          <Button
            type="default"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            Budget :
            <Slider
              style={{ minWidth: "150px" }}
              range
              min={filters.price.defaultMin}
              max={filters.price.defaultMax}
              value={[filters.price.min, filters.price.max]}
              onChange={(value) => onValueChange(value as number[], "price")}
            />
          </Button>
        </div>
      </div>
      <div className="view_with__popup">
        <div className="popup_handler">
          <Button type="default" onClick={onSearchReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="view_with__popup">
        <div className="popup_handler">
          <Button type="default" onClick={sidebarHandler}>
            <Image
              src={MoreFilterIcon}
              alt="More Filter"
              style={{
                marginRight: "10px",
              }}
            />
            More Filters
          </Button>
        </div>
        <FilterAccordion
          sidebarHandler={sidebarHandler}
          toggle={toggle}
          handleCheckboxClick={handleCheckboxClick}
          // handleDecrement={handleDecrement}
          // handleIncrement={handleIncrement}
          handlePlaceClick={handlePlaceClick}
          filters={filters}
          // setFilters={setFilters}
          placement={"right"}
          onClickApply={onClickApply}
        />
      </div>
    </CategorySearchWrapper>
  );
};

export default CategorySearch;
