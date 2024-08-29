"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import moment from "moment";
import Container from "../Container/Container";
import Loader from "@/commonComponents/Loader/Loader";
import GlideCarousel, { GlideSlide } from "../GlideCarousel/GlideCarousel";
import Heading from "../Heading/Heading";
import SectionTitle from "../SectionTitle/SectionTitle";
import LocationWrapper, {
  CarouselSection,
} from "@/commonComponents/Location/Location.style";
import Footer from "../StepContainer/Footer";
import LocationGrid from "@/commonComponents/Location/Location";
import ImageCard from "../ImageCard/ImageCard";
import { data } from "@/library/data/popular-areas";

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

const PopularLocation: React.FC = () => {
  const startDate = moment().add(3, "days").format("YYYY-MM-DD");
  const endDate = moment().add(7, "days").format("YYYY-MM-DD");

  return (
    <LocationWrapper>
      <Container fluid={true}>
        <SectionTitle title={<Heading content="Popular Areas" />} />

        <CarouselSection>
          {data && data.length !== 0 ? (
            <GlideCarousel
              carouselSelector="explore_carousel"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              <>
                {data.map((post, index) => (
                  <GlideSlide key={index}>
                    <ImageCard
                      imageSrc={post.locationImage.url}
                      title={post.city}
                      meta={`${post.numberOfPost} properties`}
                      cityId={post.cityId}
                      zoneIds={post.zoneIds}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </GlideSlide>
                ))}
              </>
            </GlideCarousel>
          ) : (
            <Loader />
          )}
        </CarouselSection>
        <Footer />
      </Container>
      <Container fluid={true}>
        <LocationGrid />
      </Container>
    </LocationWrapper>
  );
};

export default PopularLocation;
