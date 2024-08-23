import { API_BASE_URI } from "@/library/constants/api";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = `${API_BASE_URI}/bid`;
const API_BASE_URL_BOOKING = `${API_BASE_URI}/booking`;

export interface CreateBidByCustomerData {
  hostId: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  bidAmount: number;
  originalTotalAmount: number;
  baseAmount: number;
  taxAmount: number;
  taxRate: number;
  serviceFeeAmount: number;
  additionalChargesAmount: number;
  discountPercentage: number;
  discountAmount: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface RejectBidData {
  bidId: string;
}

export interface CounterBidData {
  bidId: string;
  bidBy: string;
  bidAmount: number;
  taxAmount: number;
  taxRate: number;
  serviceFeeAmount: number;
  discountAmount: number;
}

export interface SetupBookingData {
  hostId: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  baseAmount: number;
  taxAmount: number;
  taxRate: number;
  serviceFeeAmount: number;
  additionalChargesAmount: number;
  discountAmount: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface BookingDetailsData {
  bookingId: string;
}

const BiddingService = {
  createBidByCustomer: async (data: CreateBidByCustomerData): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    const body = { ...data };

    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_BASE_URL}/createBidByCustomer`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  getAllBidsByCustomer: async (): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/getAllBidsByCustomer`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getAllBidsForHost: async (): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/getAllBidsForHost`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getBidHistory: async (bidGroupId: string): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/getBidHistory?bidGroupId=${bidGroupId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  rejectBid: async (data: RejectBidData): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    const body = { ...data };

    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_BASE_URL}/rejectBid`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  counterBid: async (data: CounterBidData): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    const body = { ...data };

    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_BASE_URL}/counterBid`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  acceptBid: async (data: RejectBidData): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    const body = { ...data };

    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_BASE_URL}/acceptBid`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  setupBooking: async (data: SetupBookingData): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    const body = { ...data };

    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_BASE_URL_BOOKING}/setupBooking`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  getBookingsByUser: async (): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL_BOOKING}/getBookingsByUser`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getBookingsForHost: async (): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL_BOOKING}/getBookingsForHost`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  bookingDetails: async (data: BookingDetailsData): Promise<any> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL_BOOKING}/bookingDetails`,
        { headers, params: data }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};

export default BiddingService;
