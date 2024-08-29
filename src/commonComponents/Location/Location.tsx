import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CarouselSection } from "./Location.style";
import Heading from "@/UiComponent/Heading/Heading";
import GlideCarousel, {
  GlideSlide,
} from "@/UiComponent/GlideCarousel/GlideCarousel";
import Loader from "../Loader/Loader";
import SectionTitle from "@/UiComponent/SectionTitle/SectionTitle";
import ImageCard from "@/UiComponent/ImageCard/ImageCard";
import { data } from "@/library/data/location";
import { StaticImageData } from "next/image";

interface LocationImage {
  id: number;
  img: StaticImageData;
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
              {(data as LocationData[]).map((post, index) => (
                <GlideSlide key={index}>
                  <ImageCard
                    imageSrc={post.locationImage.img}
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
