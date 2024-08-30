import { API_BASE_URI } from "@/library/constants/api";
import { LOGIN_PAGE } from "@/library/constants/routeUrls";
import axios from "axios";

const API_BASE_URL = `${API_BASE_URI}/booking`;

const PaymentService = {
  initiatePaymentForBooking: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const body = {
        bookingId: data?.bookingId,
        amount: data?.amount,
        guestDetails: {
          guestName: data.guestDetails.guestName,
          email: data.guestDetails.email,
          phoneNumber: data.guestDetails.phoneNumber,
          documentType: data.guestDetails.documentType,
          documentNumber: data.guestDetails.documentNumber,
        },
      };

      const response = await axios
        .post(`${API_BASE_URL}/initiatePaymentForBooking`, body, { headers })
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

  makeBooking: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const body = {
        bookingId: data?.bookingId,
      };

      const response = await axios
        .post(`${API_BASE_URL}/makeBooking`, body, { headers })
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

  // getBookingsByUser,
  getBookingsByUser: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getBookingsByUser`, { headers })
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

  getBookingsForHost: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getBookingsForHost`, { headers })
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

export default PaymentService;
