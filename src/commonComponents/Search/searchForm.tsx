import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { FaMapMarkerAlt, FaRegCalendar, FaUserFriends } from "react-icons/fa";
import { Button, notification } from "antd";
import { setStateToUrl } from "../../library/helpers/url_handler";
import moment from "moment";
import {
  FormWrapper,
  RoomGuestWrapper,
  ItemWrapper,
  FormWrapperBox,
  ComponentWrapperBox,
  ContainerWrapper,
} from "./Search.style";
import LocationService from "@/service/LocationService";
import { LISTING_POSTS_PAGE } from "@/library/constants/routeUrls";
import DateRangePickerBox from "@/UiComponent/DatePicker/ReactDates";
import MapAutoComplete from "../Map/MapAutoComplete";
import ViewWithPopup from "@/UiComponent/ViewWithPopup/ViewWithPopup";
import InputIncDec from "@/UiComponent/InputIncDec/InputIncDec";

export interface City {
  id: number;
  name: string;
  zoneIds?: number[];
}

export interface RoomGuest {
  guest: number;
  kids?: number;
  infants?: number;
  pets?: number;
}

{
  /* <MapAutoComplete
  list={cityData}
  label="Area"
  value={city}
  setFieldValue={setCity}
/>; */
}

export interface SearchDate {
  setStartDate?: string | Date | null;
  setEndDate?: string | Date | null;
}

interface SearchFormProps {
  location: string | NextRouter;
  direction?: boolean;
  city: City;
  setCity: (city: City) => void;
  searchDate: SearchDate;
  setSearchDate: (date: SearchDate) => void;
  roomGuest: RoomGuest;
  setRoomGuest: React.Dispatch<React.SetStateAction<RoomGuest>>;
  paging?: boolean;
}

interface QueryParams {
  date_range: SearchDate;
  guest: number;
  location: string | NextRouter;
  cityId: number;
  zoneIds?: number | number[];
  pets?: number;
  infants?: number;
  kids?: number;
}

export interface CalendarItem {
  separator: string;
  format: string;
  locale: string;
}

const calendarItem: CalendarItem = {
  separator: "-",
  format: "MM-DD-YYYY",
  locale: "en",
};

const SearchForm: React.FC<SearchFormProps> = ({
  location,
  direction,
  city,
  setCity,
  searchDate,
  setSearchDate,
  roomGuest,
  setRoomGuest,
  paging,
}) => {
  const router = useRouter();
  const [cityData, setCityData] = useState<City[]>([]);

  useEffect(() => {
    LocationService.getCityListForSearch(1)
      .then((responseData) => {
        setCityData(responseData.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const updatedCity = cityData.find((item) => item.id === city.id);
    if (updatedCity) {
      setCity(updatedCity);
    }
  }, [city.id, setCity, cityData]);

  const handleIncrement = (type: keyof RoomGuest) => {
    setRoomGuest((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
  };

  const handleDecrement = (type: keyof RoomGuest) => {
    setRoomGuest((prev) => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) - 1, 0),
    }));
  };

  const goToSearchPage = () => {
    if (
      !searchDate?.setStartDate ||
      !searchDate?.setEndDate ||
      !roomGuest.guest ||
      !city.id
    ) {
      notification.error({
        message: "Search Error",
        description: "Area, Date, and Guests are mandatory fields.",
        placement: "bottomRight",
      });
      return;
    }

    const query: QueryParams = {
      date_range: searchDate,
      guest: roomGuest.guest,
      location,
      cityId: city.id,
    };

    if (city?.zoneIds) query.zoneIds = city.zoneIds;
    if (roomGuest.pets) query.pets = roomGuest.pets;
    if (roomGuest.infants) query.infants = roomGuest.infants;
    if (roomGuest.kids) query.kids = roomGuest.kids;

    const search = setStateToUrl(query);
    router.push({
      pathname: LISTING_POSTS_PAGE,
      query: search,
    });
  };

  const Wrapper = direction ? FormWrapperBox : FormWrapper;
  const ComponentWrapper = paging ? ComponentWrapperBox : ContainerWrapper;

  return (
    <Wrapper>
      <ComponentWrapper>
        <FaMapMarkerAlt className="map-marker" />
        <MapAutoComplete
          list={cityData}
          label="Area"
          value={city}
          setFieldValue={setCity}
        />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaRegCalendar className="calendar" />
        <DateRangePickerBox
          startDatePlaceholderText="Check In"
          endDatePlaceholderText="Check Out"
          item={calendarItem}
          startDateId="startDateId-id-home"
          endDateId="endDateId-id-home"
          updateSearchData={setSearchDate}
          showClearDates={true}
          small={true}
          numberOfMonths={1}
          autoUpdateInput={true}
          startDate={
            searchDate?.setStartDate
              ? moment(searchDate.setStartDate)
              : undefined
          }
          endDate={
            searchDate?.setEndDate ? moment(searchDate.setEndDate) : undefined
          }
        />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaUserFriends className="user-friends" />
        <ViewWithPopup
          key={200}
          noView={true}
          className="room_guest"
          view={
            <Button type="default">
              <span>
                Guest{" "}
                {roomGuest?.guest > 0 &&
                  `: ${roomGuest.guest + roomGuest.kids}`}
              </span>
            </Button>
          }
          popup={
            <RoomGuestWrapper>
              <ItemWrapper>
                <strong>Adults</strong>
                <InputIncDec
                  id="guest"
                  increment={() => handleIncrement("guest")}
                  decrement={() => handleDecrement("guest")}
                  value={roomGuest.guest}
                />
              </ItemWrapper>
              <ItemWrapper>
                <strong>Kids</strong>
                <InputIncDec
                  id="kids"
                  increment={() => handleIncrement("kids")}
                  decrement={() => handleDecrement("kids")}
                  value={roomGuest.kids}
                />
              </ItemWrapper>
              <ItemWrapper>
                <strong>Infants</strong>
                <InputIncDec
                  id="infants"
                  increment={() => handleIncrement("infants")}
                  decrement={() => handleDecrement("infants")}
                  value={roomGuest.infants}
                />
              </ItemWrapper>
              <ItemWrapper>
                <strong>Pets</strong>
                <InputIncDec
                  id="pets"
                  increment={() => handleIncrement("pets")}
                  decrement={() => handleDecrement("pets")}
                  value={roomGuest.pets}
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          }
        />
      </ComponentWrapper>

      <Button type="primary" size="large" onClick={goToSearchPage}>
        Discover
      </Button>
    </Wrapper>
  );
};

export default SearchForm;
