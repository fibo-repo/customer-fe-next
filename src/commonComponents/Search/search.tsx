import React, { useState, CSSProperties } from "react";
import Heading from "@/UiComponent/Heading/Heading";
import Text from "@/UiComponent/Text/Text";
import GlideCarousel, {
  GlideSlide,
} from "@/UiComponent/GlideCarousel/GlideCarousel";
import BannerWrapper, { SearchWrapperBox } from "./Search.style";
import SearchForm, { City, RoomGuest, SearchDate } from "./searchForm";
import Banner1 from "@/assets/images/banner/banner_bys-01.jpg";
import Banner2 from "@/assets/images/banner/banner_bys-02.png";
import Image from "next/image";

interface SearchAreaProps {
  searchTitleStyle?: CSSProperties;
  searchDescriptionStyle?: CSSProperties;
  searchStateStyle?: CSSProperties;
}

const SearchArea: React.FC<SearchAreaProps> = ({
  searchTitleStyle,
  searchDescriptionStyle,
  searchStateStyle,
}) => {
  const [city, setCity] = useState<City>({
    id: 0,
    name: "",
    zoneIds: [],
  });

  const [searchDate, setSearchDate] = useState<SearchDate>({
    setStartDate: null,
    setEndDate: null,
  });

  const [roomGuest, setRoomGuest] = useState<RoomGuest>({
    pets: 0,
    guest: 0,
    kids: 0,
    infants: 0,
  });

  return (
    <>
      <BannerWrapper>
        <GlideCarousel
          controls={false}
          options={{ gap: 0, autoplay: 5000, animationDuration: 1000 }}
          bullets={true}
          numberOfBullets={0}
        >
          <GlideSlide>
            <Image src={Banner1} alt="Banner 1" style={{ height: "auto" }} />
          </GlideSlide>
          <GlideSlide>
            <Image src={Banner2} alt="Banner 2" style={{ height: "auto" }} />
          </GlideSlide>
        </GlideCarousel>
      </BannerWrapper>
      <SearchWrapperBox>
        <Heading
          {...searchTitleStyle}
          content="Activate beach mode..Goa Awaits"
        />
        <Text
          {...searchDescriptionStyle}
          content="Ready to bid your way to a sweet deal??"
        />
        <br />
        <Text
          {...searchDescriptionStyle}
          content="Book now and start saving on your next adventure!"
        />
        <div style={searchStateStyle}>
          Where in{" "}
          <span
            style={{ fontSize: "20px", fontWeight: 600, marginLeft: "4px" }}
          >
            GOA?
          </span>
        </div>
        <SearchForm
          direction={true}
          city={city}
          setCity={setCity}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          roomGuest={roomGuest}
          setRoomGuest={setRoomGuest}
          paging={true}
        />
      </SearchWrapperBox>
    </>
  );
};

SearchArea.defaultProps = {
  searchTitleStyle: {
    color: "#2C2C2C",
    fontSize: ["20px", "24px", "28px"] as unknown as string | number,
    lineHeight: ["28px", "30px", "30px"] as unknown as string | number,
    marginBottom: "9px",
  },
  searchDescriptionStyle: {
    color: "#2C2C2C",
    fontSize: "15px",
    lineHeight: ["25px", "25px", "18px"] as unknown as string | number,
    marginBottom: "20px",
  },
  searchStateStyle: {
    color: "#2C2C2C",
    fontSize: "20px",
    lineHeight: ["25px", "25px", "18px"] as unknown as string | number,
    marginBottom: "30px",
  },
};
export default SearchArea;
