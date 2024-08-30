import { API_BASE_URI } from "@/library/constants/api";
import { LOGIN_PAGE } from "@/library/constants/routeUrls";
import axios from "axios";

const API_BASE_URL = `${API_BASE_URI}/property`;

const BookingService = {
  // Function to post data to the API
  savePropertyBookingSettings: async (data: any) => {
    // TODO: REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}/savePropertyBookingSettings`, data, { headers })
        .catch((error) => {
          if (error?.response?.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.open(LOGIN_PAGE, "_self");
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

export default BookingService;
