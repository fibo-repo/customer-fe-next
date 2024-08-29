import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "components/Loader/Loader";
import Heading from "components/UI/Heading/Heading";
import SectionTitle from "components/SectionTitle/SectionTitle";
import ImageCard from "components/ImageCard/ImageCard";
import GlideCarousel, {
  GlideSlide,
} from "components/UI/GlideCarousel/GlideCarousel";
import useDataApi from "library/hooks/useDataApi";
import { CarouselSection } from "./Location.style";

// Define the shape of the data you're fetching from /data/location.json
interface LocationImage {
  id: number;
  url: string;
}

interface LocationData {
  id: number;
  lat: string;
  lng: string;
  formattedAddress: string;
  zipcode: string;
  city: string;
  state_long: string;
  state_short: string;
  country_long: string;
  country_short: string;
  locationImage: LocationImage;
  numberOfPost: number;
}

const carouselOptions = {
  type: "carousel",
  perView: 5,
  gap: 30,
  hoverpause: true,
  breakpoints: {
    1440: {
      perView: 5,
      gap: 20,
    },
    1200: {
      perView: 4,
    },
    991: {
      perView: 3,
      gap: 15,
    },
    667: {
      perView: 2,
      gap: 20,
    },
    480: {
      perView: 1,
      gap: 0,
    },
  },
};

const LocationGrid: React.FC = () => {
  const { data } = useDataApi<LocationData[]>("/data/location.json");

  return (
    <>
      <SectionTitle title={<Heading content="Coming Soon..." />} />

      <CarouselSection>
        {data.length !== 0 ? (
          <GlideCarousel
            carouselSelector="coming_soon"
            prevButton={<IoIosArrowBack />}
            nextButton={<IoIosArrowForward />}
            options={carouselOptions}
          >
            <>
              {data.map((post: LocationData, index: number) => (
                <GlideSlide key={index}>
                  <ImageCard
                    link="listing"
                    imageSrc={post.locationImage.url}
                    title={post.city}
                    meta={`${post.numberOfPost} properties`}
                  />
                </GlideSlide>
              ))}
            </>
          </GlideCarousel>
        ) : (
          <Loader />
        )}
      </CarouselSection>
    </>
  );
};

export default LocationGrid;
