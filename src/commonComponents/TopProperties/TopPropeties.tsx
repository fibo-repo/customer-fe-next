"use client";

import moment from "moment";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LocationWrapper, { CarouselSection } from "../Location/Location.style";
import Container from "../Container/Container";
import GlideCarousel, {
  GlideSlide,
} from "@/UiComponent/GlideCarousel/GlideCarousel";
import SectionTitle from "@/UiComponent/SectionTitle/SectionTitle";
import Heading from "@/UiComponent/Heading/Heading";
// import { PostPlaceholder } from "@/UiComponent/ContentLoader/ContentLoader";
import SectionGrid from "../SectionGrid/SectionGrid";

interface PropertyDetails {
  propertyDetailsId: number;
  detailsName: string;
  detailsValue: number;
}

interface PropertyBasePrice {
  originalPrice: number;
  type: string;
}

interface PropertyTotalPrice {
  totalPrice: number;
  basicPrice: number;
  breakdown: {
    serviceFee: number;
    tax: {
      total: number;
      percentage: string;
    };
    basic: {
      total: number;
      type: string;
      base: number;
    };
    "Price Per Additional Guest"?: {
      total: number;
      numberOfGuests: number;
      type: string;
      base: number;
    };
  };
}

interface OverallRating {
  totalReviews: number;
  overallRating: string;
}

interface PropertyData {
  id: number;
  hostId: number;
  title: string;
  propertyType: string;
  state: string;
  city: string;
  thumbnailUrl: string;
  latitude: number;
  longitude: number;
  categories: string[];
  imagesUrls: string | null;
  propertyDetails: PropertyDetails[];
  propertyBasePrice: PropertyBasePrice;
  propertyTotalPrice: PropertyTotalPrice;
  overallRating: OverallRating;
}

interface RoomGuest {
  guest: number;
}

interface SearchDate {
  setStartDate: string;
  setEndDate: string;
}

// Define the carousel options type
interface CarouselOptions {
  type: string;
  perView: number;
  gap: number;
  hoverpause: boolean;
  breakpoints: {
    [key: number]: {
      perView: number;
      gap?: number;
    };
  };
}

const jsonData = [
  {
    id: 105,
    hostId: 63,
    title: "Olive-Wake up by the forest@The Pause Project 1bhk",
    propertyType: "Apartment",
    state: "Goa",
    city: "Siolim",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/105/images/51edc1ee-d664-4f58-a33b-0814ff522693_1717736968029.webp",
    latitude: 15.6266,
    longitude: 73.7661,
    categories: [],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 0,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 1,
      },
    ],
    propertyBasePrice: {
      originalPrice: 3066,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 11047,
      basicPrice: 9198,
      breakdown: {
        serviceFee: 746,
        tax: {
          total: 1103,
          percentage: "12%",
        },
        basic: {
          total: 9198,
          type: "PER_NIGHT",
          base: 3066,
        },
        "Price Per Additional Guest": {
          total: 0,
          numberOfGuests: 0,
          type: "PER_NIGHT",
          base: 1250,
        },
      },
    },
    overallRating: {
      totalReviews: 6,
      overallRating: "5",
    },
  },
  {
    id: 107,
    hostId: 63,
    title: "Blush-Wake up by the forest@The Pause Project 1bhk",
    propertyType: "Apartment",
    state: "Goa",
    city: "Siolim",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/107/images/fcafb89f-5715-4962-b9bd-d6703dc1d8a1_1717737897131.webp",
    latitude: 15.6266,
    longitude: 73.7661,
    categories: [],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 0,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 0,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 1,
      },
    ],
    propertyBasePrice: {
      originalPrice: 3066,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 11047,
      basicPrice: 9198,
      breakdown: {
        serviceFee: 746,
        tax: {
          total: 1103,
          percentage: "12%",
        },
        basic: {
          total: 9198,
          type: "PER_NIGHT",
          base: 3066,
        },
        "Price Per Additional Guest": {
          total: 0,
          numberOfGuests: 0,
          type: "PER_NIGHT",
          base: 1200,
        },
      },
    },
    overallRating: {
      totalReviews: 4,
      overallRating: "4.98",
    },
  },
  {
    id: 305,
    hostId: 63,
    title: "Lovely 2 BHK Glass house with a pool",
    propertyType: "Home",
    state: "Goa",
    city: "Siolim",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/305/images/398ddb4f-d305-49a7-87fb-7e9fe7ad46f2_1720760957212.webp",
    latitude: 15.6124,
    longitude: 73.786,
    categories: ["Instagrammable"],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 5,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 2,
      },
    ],
    propertyBasePrice: {
      originalPrice: 7200,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 25945,
      basicPrice: 21600,
      breakdown: {
        serviceFee: 1753,
        tax: {
          total: 2592,
          percentage: "12%",
        },
        basic: {
          total: 21600,
          type: "PER_NIGHT",
          base: 7200,
        },
        "Price Per Additional Guest": {
          total: 0,
          numberOfGuests: 0,
          type: "PER_NIGHT",
          base: 150,
        },
      },
    },
    overallRating: {
      totalReviews: 5,
      overallRating: "4.43",
    },
  },
  {
    id: 190,
    hostId: 63,
    title: "Vintage 3 bhk villa , Aldona retreat",
    propertyType: "Villa",
    state: "Goa",
    city: "Aldona",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/190/images/391e099f-69fe-4dd2-b08c-8c20f6cdc74b_1719595115197.webp",
    latitude: 15.5944,
    longitude: 73.8744,
    categories: [],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 8,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 6,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 3,
      },
    ],
    propertyBasePrice: {
      originalPrice: 15000,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 75672,
      basicPrice: 60000,
      breakdown: {
        basic: {
          total: 60000,
          type: "PER_NIGHT",
          base: 15000,
        },
        serviceFee: 4872,
        tax: {
          total: 10800,
          percentage: "18%",
        },
      },
    },
    overallRating: {
      totalReviews: 0,
      overallRating: "NEW",
    },
  },
  {
    id: 432,
    hostId: 63,
    title: "Field View 3BHK Varca Villa w/ Pool-8min to beach",
    propertyType: "Villa",
    state: "Goa",
    city: "Varca",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/432/images/54705f17-0451-4ea7-81e2-5fb93abcb6ac_1724262075448.webp",
    latitude: 15.2324,
    longitude: 73.9431,
    categories: ["High Street"],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 8,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 4,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 3,
      },
    ],
    propertyBasePrice: {
      originalPrice: 8550,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 43133,
      basicPrice: 34200,
      breakdown: {
        serviceFee: 2777,
        tax: {
          total: 6156,
          percentage: "18%",
        },
        basic: {
          total: 34200,
          type: "PER_NIGHT",
          base: 8550,
        },
      },
    },
    overallRating: {
      totalReviews: 7,
      overallRating: "4.63",
    },
  },
  {
    id: 116,
    hostId: 63,
    title: "Quirky and Stylish 2BHK | 10 mins from the beach",
    propertyType: "Apartment",
    state: "Goa",
    city: "Candolim",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/116/images/29490316-706b-44da-ab50-e4b68d232a43_1717830598347.webp",
    latitude: 15.5251,
    longitude: 73.7867,
    categories: [],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 6,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 2,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 2,
      },
    ],
    propertyBasePrice: {
      originalPrice: 5125,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 18468,
      basicPrice: 15375,
      breakdown: {
        serviceFee: 1248,
        tax: {
          total: 1845,
          percentage: "12%",
        },
        basic: {
          total: 15375,
          type: "PER_NIGHT",
          base: 5125,
        },
        "Price Per Additional Guest": {
          total: 0,
          numberOfGuests: 0,
          type: "PER_NIGHT",
          base: 1000,
        },
      },
    },
    overallRating: {
      totalReviews: 8,
      overallRating: "5",
    },
  },
  {
    id: 112,
    hostId: 63,
    title: "The Garden Getaway 5 Mins from Candolim Beach!",
    propertyType: "Apartment",
    state: "Goa",
    city: "Candolim",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/112/images/4d6ad52b-35fc-488c-ace3-6a750c20dc1f_1717828872202.webp",
    latitude: 15.5128,
    longitude: 73.7689,
    categories: [],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 0,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 1,
      },
    ],
    propertyBasePrice: {
      originalPrice: 4166,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 15612,
      basicPrice: 12498,
      breakdown: {
        serviceFee: 1055,
        tax: {
          total: 1559,
          percentage: "12%",
        },
        basic: {
          total: 12498,
          type: "PER_NIGHT",
          base: 4166,
        },
        "Cleaning fee": {
          total: 500,
          type: "ONE_TIME",
          base: 500,
        },
        "Price Per Additional Guest": {
          total: 0,
          numberOfGuests: 0,
          type: "PER_NIGHT",
          base: 750,
        },
      },
    },
    overallRating: {
      totalReviews: 6,
      overallRating: "4.89",
    },
  },
  {
    id: 433,
    hostId: 63,
    title: "Comfortable 3BHK Villa w/ pool 8min walk to beach",
    propertyType: "Villa",
    state: "Goa",
    city: "Varca",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/433/images/387fa733-198b-448f-83d9-a764dd804d6a_1724263574208.webp",
    latitude: 15.2324,
    longitude: 73.9431,
    categories: ["High Street"],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 8,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 4,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 3,
      },
    ],
    propertyBasePrice: {
      originalPrice: 6491,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 35992,
      basicPrice: 25964,
      breakdown: {
        serviceFee: 2433,
        tax: {
          total: 3595,
          percentage: "12%",
        },
        basic: {
          total: 25964,
          type: "PER_NIGHT",
          base: 6491,
        },
        "Price Per Additional Guest": {
          total: 4000,
          numberOfGuests: 2,
          type: "PER_NIGHT",
          base: 500,
        },
      },
    },
    overallRating: {
      totalReviews: 7,
      overallRating: "4.71",
    },
  },
  {
    id: 195,
    hostId: 63,
    title: "La Tierra Viva 3BHK | Garden Apartment in Assagao",
    propertyType: "Apartment",
    state: "Goa",
    city: "Assagao",
    thumbnailUrl:
      "https://bid-your-stay.s3.ap-south-1.amazonaws.com/195/images/5991f72d-1b48-4c2a-86cb-7acca29b7750_1719650716184.webp",
    latitude: 15.5995,
    longitude: 73.7691,
    categories: [],
    imagesUrls: null,
    propertyDetails: [
      {
        propertyDetailsId: 1,
        detailsName: "Guests",
        detailsValue: 7,
      },
      {
        propertyDetailsId: 2,
        detailsName: "Bedrooms",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 3,
        detailsName: "Beds",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 4,
        detailsName: "Bathrooms",
        detailsValue: 3,
      },
      {
        propertyDetailsId: 5,
        detailsName: "Balconies",
        detailsValue: 1,
      },
      {
        propertyDetailsId: 6,
        detailsName: "Bedrooms with AC",
        detailsValue: 3,
      },
    ],
    propertyBasePrice: {
      originalPrice: 8900,
      type: "PER_NIGHT",
    },
    propertyTotalPrice: {
      totalPrice: 37457,
      basicPrice: 26700,
      breakdown: {
        serviceFee: 2411,
        tax: {
          total: 5346,
          percentage: "18%",
        },
        basic: {
          total: 26700,
          type: "PER_NIGHT",
          base: 8900,
        },
        "Price Per Additional Guest": {
          total: 3000,
          numberOfGuests: 1,
          type: "PER_NIGHT",
          base: 1000,
        },
      },
    },
    overallRating: {
      totalReviews: 6,
      overallRating: "4.83",
    },
  },
];

const carouselOptions: CarouselOptions = {
  type: "carousel",
  perView: 5,
  gap: 30,
  hoverpause: true,
  breakpoints: {
    1440: { perView: 5, gap: 20 },
    1200: { perView: 4 },
    991: { perView: 3, gap: 15 },
    667: { perView: 2, gap: 20 },
    480: { perView: 1, gap: 0 },
  },
};

const TopPropeties: React.FC = () => {

  // Room guest and search date types
  const roomGuest: RoomGuest = { guest: 2 };

  const searchDate: SearchDate = {
    setStartDate: moment().add(3, "days").format("YYYY-MM-DD"),
    setEndDate: moment().add(7, "days").format("YYYY-MM-DD"),
  };

  return (
    <div>
      <LocationWrapper>
        <Container fluid={true}>
          <SectionTitle title={<Heading content="Top Properties" />} />
          <CarouselSection>
            <GlideCarousel
              carouselSelector="coming_soon"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              {jsonData.map((data, index) => (
                <GlideSlide key={index}>
                  <SectionGrid
                    columnWidth={[1]}
                    datas={[data]}
                    totalItem={jsonData.length}
                    searchDate={searchDate}
                    roomGuest={roomGuest}
                    // placeholder={<PostPlaceholder />}
                  />
                </GlideSlide>
              ))}
            </GlideCarousel>
          </CarouselSection>
        </Container>
      </LocationWrapper>
    </div>
  );
};

export default TopPropeties;
