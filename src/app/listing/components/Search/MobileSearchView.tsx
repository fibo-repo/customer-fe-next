"use client";

import React from "react";
import { Button } from "antd";
import { FilterArea } from "./MobileSearchView.style";
import { FilterAccordion } from "../../../../UiComponent/FilterAccordion/filterAccordion";
import useWindowSize from "../../../../library/hooks/useWindowSize";
import Image from "next/image";
import MoreFilterIcon from "@/assets/images/more_filter.svg"

interface FilterDrawerProps {
  sidebarHandler: () => void;
  toggle: boolean;
  handleCheckboxClick: ( amenityId: number, name: string, value: string | number) => void;
  handleDecrement: (type: string) => void;
  handleIncrement: (type: string) => void;
  handlePlaceClick: (id:number, name: string, value: string) => void;
  filters: any; // Replace 'any' with a specific type if available
  setFilters: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with a specific type if available
  children: React.ReactNode;
  onSearchReset: () => void;
  onClickApply: () => void;
  categoryList: any[];
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  sidebarHandler,
  toggle,
  handleCheckboxClick,
  handleDecrement,
  handleIncrement,
  handlePlaceClick,
  filters,
  setFilters,
  children,
  onSearchReset,
  onClickApply,
}) => {
  const { width } = useWindowSize();

  return (
    <FilterArea>
      <div
        style={{
          display: "flex",
          height: "50px",
          margin: "10px",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Button className={toggle ? "active" : ""} onClick={sidebarHandler}>
          <Image
            src={MoreFilterIcon}
            alt="More Filter"
            style={{
              marginRight: "10px",
              display: width && width > 400 ? "" : "none",
            }}
          />
          More filters
        </Button>
        <div className="view_with__popup">
          <div className="popup_handler">
            <Button type="default" onClick={onSearchReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
      <FilterAccordion
        placement="left"
        sidebarHandler={sidebarHandler}
        toggle={toggle}
        handleCheckboxClick={handleCheckboxClick}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        handlePlaceClick={handlePlaceClick}
        filters={filters}
        setFilters={setFilters}
        onClickApply={onClickApply}
      >
        {children}
      </FilterAccordion>
    </FilterArea>
  );
};

export default FilterDrawer;
