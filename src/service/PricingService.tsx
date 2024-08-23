import { API_BASE_URI } from "@/library/constants/api";
import axios from "axios";

const API_BASE_URL = `${API_BASE_URI}/pricing`;

const PricingService = {
  // Function to get data from the API for amenities
  getAdditionalPriceOptionsList: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios
        .get(
          //`${API_BASE_URL}v3/7a93735f-9e54-4cb6-8d2a-5da904b1540f`,
          `${API_BASE_URL}/getAdditionalPriceOptionsList`,
          { headers }
        )
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
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getPropertyPricingDetails: async (propertyId: number) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          `${API_BASE_URL}/getPropertyPricingDetails?propertyId=${propertyId}`,
          { headers }
        )
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
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  // Function to post data to the API
  savePropertyCalendarPricingDetails: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios
        .post(`${API_BASE_URL}/savePropertyCalendarPricingDetails`, data, {
          headers,
        })
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

  updatePropertyCalendarPricingDetails: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios
        .post(`${API_BASE_URL}/updatePropertyCalendarPricingDetails`, data, {
          headers,
        })
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
  // Add more functions for other API calls as needed
};

export default PricingService;
