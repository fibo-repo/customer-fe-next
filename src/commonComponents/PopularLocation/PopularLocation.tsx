// pages/PopularLocation.tsx
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "../components/Loader/Loader";
import Container from "../components/UI/Container/Container";
import Heading from "../components/UI/Heading/Heading";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import ImageCard from "../components/ImageCard/ImageCard";
import GlideCarousel, {
  GlideSlide,
} from "../components/UI/GlideCarousel/GlideCarousel";
import useDataApi from "../library/hooks/useDataApi";
import LocationWrapper, {
  CarouselSection,
} from "../components/Location/Location.style";
import Footer from "../containers/StepContainer/Footer";
import LocationGrid from "../components/Location/Location";
import moment from "moment";

interface Post {
  locationImage: {
    url: string;
  };
  city: string;
  numberOfPost: number;
  cityId: string;
  zoneIds: string[];
}

interface PopularLocationProps {
  data: Post[];
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

const PopularLocation: React.FC = () => {
  const { data } = useDataApi<Post[]>("/data/popular-areas.json"); // Assuming the API returns data of type Post[]
  const startDate = `${moment().add(3, "days").format("YYYY-MM-DD")}`;
  const endDate = `${moment().add(7, "days").format("YYYY-MM-DD")}`;

  return (
    <LocationWrapper>
      <Container fluid={true}>
        <SectionTitle title={<Heading content="Popular Areas" />} />

        <CarouselSection>
          {data.length > 0 ? (
            <GlideCarousel
              carouselSelector="explore_carousel"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              {data.map((post, index) => (
                <GlideSlide key={index}>
                  <ImageCard
                    link="/listing"
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
