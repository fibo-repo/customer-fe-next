import { API_BASE_URI } from "@/library/constants/api";
import axios from "axios";
import { isEmpty } from "lodash";

export interface Filters {
  categories?: string[]; // Assuming categories is an array of strings
  amenities?: string[]; // Assuming amenities is an array of strings
  propertyTypes?: string[]; // Assuming propertyTypes is an array of strings
  priceRange?: {
    minPrice?: number; // Assuming minPrice is a number
    maxPrice?: number; // Assuming maxPrice is a number
  };
}

export interface Body {
  zoneIds?: number[];
  checkIn?: string; // Assuming checkIn is a string (ISO date string)
  checkOut?: string; // Assuming checkOut is a string (ISO date string)
  adults?: number; // Assuming adults is a number
  children?: number; // Assuming children is a number
  pageNumber: number;
  countPerPage: number;
  filters?: Filters;
}

const API_BASE_URL = `${API_BASE_URI}/property/search`;

const SearchService = {
  getPropertiesSearchResult: async (data: any) => {
    // TODO: REMOVE TYPE ANY
    // const headers = {
    // 	Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    // 	'Content-Type': 'application/json',
    // 	'Access-Control-Allow-Origin': '*',
    // };
    const body = {
      zoneIds: data?.zoneIds.split(",").map(Number),
      checkIn: data?.checkIn,
      checkOut: data?.checkOut,
      adults: data?.adults,
      children: data?.children,
      pageNumber: 1,
      countPerPage: 15,
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}`, body)
        .catch((error) => {
          if (error?.response?.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.open("/sign-in", "_self");
          }
        });
      return response?.data;
    } catch (error) {
      // Handle error
      console.error("Error posting data:", error);
      throw error;
    }
  },

  getPropertiesSearchResultWithFilters: async (data: any) => {
    // TODO: REMOVE TYPE ANY
    const filters: Filters = {
      categories: data?.filters?.categories,
      amenities: data?.filters?.amenities,
      propertyTypes: data?.filters?.propertyTypes,
    };

    if (data?.filters?.minPrice || data?.filters?.maxPrice) {
      filters.priceRange = {
        minPrice: data?.filters?.minPrice,
        maxPrice: data?.filters?.maxPrice,
      };
    }

    const body: Body = {
      zoneIds: data?.zoneIds?.split(",").map(Number),
      checkIn: data?.checkIn,
      checkOut: data?.checkOut,
      adults: data?.adults,
      children: data?.children,
      pageNumber: 1,
      countPerPage: 15,
    };

    if (!isEmpty(filters)) {
      body.filters = { ...filters };
    }

    try {
      const response = await axios
        .post(`${API_BASE_URL}`, body)
        .catch((error) => {
          if (error?.response?.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.open("/sign-in", "_self");
          }
        });
      return response?.data;
    } catch (error) {
      // Handle error
      console.error("Error posting data:", error);
      throw error;
    }
  },
};

export default SearchService;
