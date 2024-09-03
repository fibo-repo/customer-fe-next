"use client";

import React, { useState, useEffect, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sticky from "react-stickynode";
import { Button, Checkbox, Slider } from "antd";
import useWindowSize from "../../../library/hooks/useWindowSize";
import Toolbar from "../../../UiComponent/Toolbar/Toolbar";
import { PostPlaceholder } from "../../../UiComponent/ContentLoader/ContentLoader";
import SectionGrid from "../../../commonComponents/SectionGrid/SectionGrid";
import FilterDrawer from "./Search/MobileSearchView";
import CategorySearch from "@/UiComponent/CategorySearch/CategorySearch";
import ListingMap from "./listingMap";
import ListingWrapper, {
  MessageWrapper,
  PostsWrapper,
  SearchWrapper,
  ShowMapCheckbox,
} from "./listing.style";
import SearchForm from "@/commonComponents/Search/searchForm";
import SearchService from "../../../service/SearchService";
import PropertyService from "../../../service/PropertyService";

import { FilterElementsWrapper } from "./Search/MobileSearchView.style";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Heading from "@/UiComponent/Heading/Heading";
import { IoIosArrowDown } from "react-icons/io";
import { LISTING_POSTS_PAGE } from "@/library/constants/routeUrls";
import { setStateToUrl, getStateFromUrl } from "@/library/helpers/url_handler";
import {
  convertArrayFormat,
  formatCurrencyAmount,
} from "@/library/utils/commonUtils";
import Image from "next/image";
import { SearchDate } from "@/types/commonTypes";
import SadDog from '../../../assets/images/sad-dog.png';
import Spinner from '../../../assets/images/spinner-loading.gif';

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

interface RoomGuest {
  pets?: number;
  guest: number;
  kids?: number;
  infants?: number;
}

interface PropertyData {
  properties: any[];
  minPrice: number;
  maxPrice: number;
}

interface FilterOptionsProps {
  filters: Filters;
  onValueChange: (value: any, type: string) => void;
  categoryList: any[];
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filters,
  onValueChange,
  categoryList,
}) => {
  const { width } = useWindowSize();

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: width > 767 && width < 1024 ? "row" : "column",
        }}
      >
        {categoryList &&
          categoryList.map((category, index) => (
            <div className="view_with__popup" key={index}>
              <div className="popup_handler">
                <Button
                  type="default"
                  onClick={() => onValueChange(category?.id, "category")}
                  style={{
                    backgroundColor: filters?.category.includes(category?.id)
                      ? "#deff51"
                      : "#4dcad2",
                    boxShadow: filters?.category.includes(category?.id)
                      ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                      : "",
                    border: filters?.category.includes(category?.id)
                      ? "grey 2px solid"
                      : "",
                    color: filters?.category.includes(category?.id)
                      ? "black"
                      : "white",
                    borderRadius: "5px",
                    height: "max-content",
                    fontWeight: "500",
                  }}
                >
                  {category?.name}
                </Button>
              </div>
            </div>
          ))}
      </div>
      <FilterElementsWrapper>
        <Accordion allowZeroExpanded={true}>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <Heading as="h4" content="Price Range / Night" />
                <div style={{ width: "250px" }}>
                  {formatCurrencyAmount.format(filters?.price?.min)} -{" "}
                  {formatCurrencyAmount.format(filters?.price?.max)}
                </div>
                <IoIosArrowDown />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Slider
                style={{ width: "300px", marginLeft: "50px" }}
                range
                min={filters?.price?.defaultMin}
                max={filters?.price?.defaultMax}
                value={[filters?.price?.min, filters?.price?.max]}
                onChange={(value) => onValueChange(value, "price")}
              />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem />
        </Accordion>
      </FilterElementsWrapper>
    </div>
  );
};

export default function Listing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const [showMap, setShowMap] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  let columnWidth = [1 / 1, 1 / 2, 1 / 2, 1 / 3, 1 / 4];
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    price: {
      min: 0,
      max: 50000,
      defaultMin: 0,
      defaultMax: 50000,
    },
    amenity: [],
    typeOfPlace: [],
    category: [],
    offerings: {},
  });

  const [city, setCity] = useState<City>({
    id: Number(searchParams.get('cityId')) || null,
    name: "",
    zoneIds: searchParams.getAll('zoneIds').map(Number),
    stateId: 0,
  });

  const [searchDate, setSearchDate] = useState<SearchDate>({
    setStartDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null,
    setEndDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null,
  });

  const [roomGuest, setRoomGuest] = useState<RoomGuest>({
    pets: Number(searchParams.get('pets')) || 0,
    guest: Number(searchParams.get('guest')) || 0,
    kids: Number(searchParams.get('kids')) || 0,
    infants: Number(searchParams.get('infants')) || 0,
  });

  useEffect(() => {
    const priceMin = Number(searchParams.get('rangeMin')) || 5000;
    const priceMax = Number(searchParams.get('rangeMax')) || 50000;

    const amenity = searchParams.getAll('amenity').map(Number);
    const typeOfPlace = searchParams.getAll('typeOfPlace').map(Number);
    const category = searchParams.getAll('category').map(Number);

    setFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        min: priceMin,
        max: priceMax,
        defaultMin: prevFilters.price.defaultMin,
        defaultMax: prevFilters.price.defaultMax,
      },
      amenity,
      typeOfPlace,
      category,
    }));
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const data: any = {
      pageNumber: 1,
      countPerPage: 10,
      zoneIds: city.zoneIds,
      checkIn: searchDate.setStartDate instanceof Date ? searchDate.setStartDate.toISOString() : undefined,
      checkOut: searchDate.setEndDate instanceof Date ? searchDate.setEndDate.toISOString() : undefined,
      adults: roomGuest.guest,
      children: roomGuest.kids,
    };

    data.filters = {};

    if (filters.category.length > 0)
      data.filters.categories = filters.category;
    if (filters.amenity.length > 0)
      data.filters.amenities = filters.amenity;
    if (filters.typeOfPlace.length > 0)
      data.filters.propertyTypes = filters.typeOfPlace;
    if (filters.price.min !== undefined && filters.price.max !== undefined) {
      data.filters.minPrice = filters.price.min;
      data.filters.maxPrice = filters.price.max;
    }

    SearchService.getPropertiesSearchResultWithFilters(data)
      .then((responseData) => {
        setPropertyData(responseData.result);
        if (
          responseData.result &&
          responseData.result?.properties?.length > 0
        ) {
          setShowMap(width > 991 ? true : false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [
    filters,
    city.zoneIds,
    searchDate.setStartDate,
    searchDate.setEndDate,
    roomGuest.guest,
    roomGuest.kids,
    width,
  ]);

  useEffect(() => {
    PropertyService.getPropertyCategoriesList()
      .then((responseData) => {
        setCategoryList(responseData.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (showMap) {
    columnWidth = [1 / 1, 1 / 2, 1 / 2, 1 / 2, 1 / 3];
  }
  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };

  const handleCheckboxClick = (amenityId: number) => {
    let updatedAmenity = [];
    if (!filters?.amenity.includes(amenityId)) {
      updatedAmenity = [...filters.amenity, amenityId];
    } else {
      updatedAmenity = filters?.amenity.filter((item) => item !== amenityId);
    }
    setFilters((prev) => ({
      ...prev,
      amenity: updatedAmenity,
    }));
  };

  const handlePlaceClick = (placeId: number) => {
    let updatedPlace = [];
    if (!filters?.typeOfPlace.includes(placeId)) {
      updatedPlace = [...filters.typeOfPlace, placeId];
    } else {
      updatedPlace = filters?.typeOfPlace.filter((item) => item !== placeId);
    }
    setFilters((prev) => ({
      ...prev,
      typeOfPlace: updatedPlace,
    }));
  };

  const handleIncrement = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      offerings: {
        ...prev.offerings,
        [type]: (prev.offerings[type] || 0) + 1,
      },
    }));
  };

  const handleDecrement = (type: string) => {
    if (filters.offerings[type] > 0) {
      setFilters((prev) => ({
        ...prev,
        offerings: {
          ...prev.offerings,
          [type]: prev.offerings[type] - 1,
        },
      }));
    }
  };

  const onValueChange = (value: any, type: string) => {
    if (type === "price") {
      if (value[1] - value[0] >= 4000) {
        setFilters((prev) => ({
          ...prev,
          price: {
            ...prev.price,
            min: value[0],
            max: value[1],
          },
        }));
      }
    } else {
      const isPresent = filters?.category.includes(value);
      let updatedCategory;
      if (isPresent) {
        updatedCategory = filters?.category.filter((item) => value !== item);
      } else {
        updatedCategory = [...filters?.category, value];
      }
      setFilters((prev) => ({ ...prev, [type]: updatedCategory }));
    }
  };

  const onSearchReset = () => {
    onValueChange([5000, 50000], "price");

    const query: any = {
      date_range: searchDate,
      guest: roomGuest.guest,
      cityId: city.id,
      zoneIds: city.zoneIds,
    };

    if (roomGuest?.pets) query.pets = roomGuest.pets;
    if (roomGuest?.infants) query.infants = roomGuest.infants;
    if (roomGuest?.kids) query.kids = roomGuest.kids;

    const search = setStateToUrl(query);
    router.push(LISTING_POSTS_PAGE);
  };

  const onApplyFilter = () => {
    const query: any = {};
    if (searchDate) query.date_range = searchDate;
    if (roomGuest?.pets !== 0) query.pets = roomGuest.pets;
    if (roomGuest?.kids !== 0) query.kids = roomGuest.kids;
    if (roomGuest?.infants !== 0) query.infants = roomGuest.infants;
    if (roomGuest?.guest !== 0) query.guest = roomGuest.guest;
    if (city.id !== undefined) query.cityId = city.id;
    if (city?.zoneIds) query.zoneIds = city.zoneIds;
    if (filters?.category.length > 0) query.category = filters.category;
    if (filters?.amenity.length > 0) query.amenity = filters.amenity;
    if (filters?.typeOfPlace.length > 0)
      query.typeOfPlace = filters.typeOfPlace;
    if (filters?.price) query.range = [filters.price.min, filters.price.max];

    const search = setStateToUrl(query);
    router.push(LISTING_POSTS_PAGE);
  };

  return (
    <ListingWrapper>
      <Sticky
        top={50}
        innerZ={999}
        activeClass="isHeaderSticky"
        enabled={width > 912 ? true : false}
      >
        <SearchWrapper>
          <SearchForm
            city={city}
            setCity={setCity}
            searchDate={searchDate}
            setSearchDate={setSearchDate}
            roomGuest={roomGuest}
            setRoomGuest={setRoomGuest}
          />
        </SearchWrapper>
        <Toolbar
          left={
            width > 991 ? (
              <CategorySearch
                sidebarHandler={() => setShowFilterSidebar(!showFilterSidebar)}
                toggle={showFilterSidebar}
                handleCheckboxClick={handleCheckboxClick}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handlePlaceClick={handlePlaceClick}
                filters={filters}
                setFilters={setFilters}
                onSearchReset={onSearchReset}
                city={city}
                onClickApply={onApplyFilter}
                categoryList={categoryList}
                roomGuest={roomGuest}
                searchDate={searchDate}
              />
            ) : (
              <FilterDrawer
                sidebarHandler={() => setShowFilterSidebar(!showFilterSidebar)}
                toggle={showFilterSidebar}
                handleCheckboxClick={handleCheckboxClick}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handlePlaceClick={handlePlaceClick}
                filters={filters}
                setFilters={setFilters}
                onClickApply={onApplyFilter}
                onSearchReset={onSearchReset}
                categoryList={categoryList}
              >
                <FilterOptions
                  filters={filters}
                  onValueChange={onValueChange}
                  categoryList={categoryList}
                />
              </FilterDrawer>
            )
          }
          right={
            <>
              {propertyData && propertyData?.properties?.length > 0 && (
                <ShowMapCheckbox>
                  <Checkbox checked={showMap} onChange={handleMapToggle}>
                    Show map
                  </Checkbox>
                </ShowMapCheckbox>
              )}
            </>
          }
        />
      </Sticky>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && <Image src={Spinner} alt="loader" />}
      </div>

      <Fragment>
        {propertyData && !loading && propertyData?.properties?.length > 0 ? (
          <PostsWrapper
            className={width > 767 && showMap ? "col-12" : "col-24"}
          >
            <SectionGrid
              columnWidth={columnWidth}
              datas={propertyData?.properties}
              totalItem={propertyData?.properties?.length}
              loading={loading}
              searchDate={searchDate}
              roomGuest={roomGuest}
            />
          </PostsWrapper>
        ) : (
          <Fragment>
            {!loading && (
              <MessageWrapper>
                <Image
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "30px",
                  }}
                  src={SadDog}
                  alt="Logo"
                />
                <h1
                  style={{ fontSize: "2rem", color: "#333", fontWeight: "600" }}
                >
                  Oops! Sorry, we couldnt find any property matching your
                  search criteria
                </h1>
                <h2>Please update your filters or try again</h2>
              </MessageWrapper>
            )}
          </Fragment>
        )}
        {showMap && (
          <ListingMap data={propertyData?.properties} loading={loading} />
        )}
      </Fragment>
    </ListingWrapper>
  );
}
