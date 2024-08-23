import { API_BASE_URI } from "@/library/constants/api";
import axios from "axios";

const API_BASE_URL = `${API_BASE_URI}/location`;

const LocationService = {
  // Function to get data from the API for amenities
  getSupportedStateList: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          //`${API_BASE_URL}v3/7a93735f-9e54-4cb6-8d2a-5da904b1540f`,
          `${API_BASE_URL}/getSupportedStateList`,
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

  getCityListForState: async (stateId: number) => {
    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // };

    if (!stateId) {
      return;
    }
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getCityListForState?stateId=${stateId}`)
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

  getCityListForSearch: async (stateId: number) => {
    if (!stateId) {
      return;
    }
    try {
      const response = await axios
        .get(
          //`${API_BASE_URL}v3/7a93735f-9e54-4cb6-8d2a-5da904b1540f`,
          `${API_BASE_URL}/getCityListForSearch?stateId=${stateId}`
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
  postData: async (data: any) => { // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}/endpoint`, data, {
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

export default LocationService;
