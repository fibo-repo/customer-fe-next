import { API_BASE_URI } from "@/library/constants/api";
import axios from "axios";
import { isEmpty } from "lodash";
const API_BASE_URL = `${API_BASE_URI}/property`;
const ADMIN_BASE_URL = `${API_BASE_URI}/admin`;

export interface PropertySearchParams {
  propertyId: number;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  pets?: number;
  children?: number;
  infants?: number;
}

const PropertyService = {
  // Function to get data from the API for amenities
  getAmenities: async () => {
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getPropertyAmenitiesList`)
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

  getPropertyOfferingsList: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getPropertyOfferingsList`, { headers })
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

  getPropertyDetailsFieldList: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getPropertyDetailsFieldList`, { headers })
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

  getPropertyTypeList: async () => {
    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // };

    try {
      const response = await axios
        .get(`${API_BASE_URL}/getPropertyTypeList`)
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
  // getAdditionalPriceOptionsList
  getAdditionalPriceOptionsList: async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getAdditionalPriceOptionsList`, { headers })
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

  getPropertyDetailsById: async (propertyId: number) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          `${API_BASE_URL}/getPropertyDetailsById?propertyId=${propertyId}`,
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

  getPhotos: async (propertyId: number) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(`${API_BASE_URL}/images/list?propertyId=${propertyId}`, {
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
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getBookingSettingsByPropertyId: async (propertyId: number) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          `${API_BASE_URL}/getBookingSettingsByPropertyId?propertyId=${propertyId}`,
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
  saveProperty: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}/saveProperty`, data, {
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

  updateProperty: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}/updateProperty`, data, {
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
      console.error("Error update data:", error);
      throw error;
    }
  },

  completePropertyOnboarding: async (data: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}/completePropertyOnboarding`, data, { headers })
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

  uploadPhotos: async (images: any, thumbnail: any, propertyId: any) => {
    // TODO : REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
    const formData = new FormData();

    Object.keys(images).forEach((key) => {
      const keyImagesList = images[key];

      keyImagesList.forEach((image: any) => {
        // TODO : REMOVE TYPE ANY
        formData.append(`images[${key}]`, image);
      });
    });

    formData.append(
      `thumbnail[${Object.keys(thumbnail)[0]}]`,
      Object.values(thumbnail)[0]
    );
    formData.append("propertyId", propertyId);
    formData.append("onboardingStage", 2);

    try {
      const response = await axios
        .post(`${API_BASE_URL}/images/upload`, formData, { headers })
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
      console.error("Error uploading images:", error);
      throw error;
    }
  },

  // TODO: REMOVE TYPE ANY
  updatePhotos: async (
    images: any,
    updatedImages: any,
    thumbnail: any,
    thumbnailUrl: any,
    deletedImages = [],
    propertyId: any
  ) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
    const formData = new FormData();
    Object.keys(images).forEach((key) => {
      const keyImagesList = images[key];

      keyImagesList.forEach((image: any) => {
        // TODO: REMOVE TYPE ANY
        formData.append(`addImages[${key}]`, image);
      });
    });

    Object.keys(updatedImages).forEach((key) => {
      const keyImagesList = updatedImages[key];

      keyImagesList.forEach((image: any) => {
        // TODO: REMOVE TYPE ANY
        formData.append(`existingImagesCategoryUpdates[${key}]`, image);
      });
    });
    if (!isEmpty(thumbnail)) {
      formData.append(
        `thumbnail[${Object.keys(thumbnail)[0]}]`,
        Object.values(thumbnail)[0]
      );
    }
    if (!isEmpty(thumbnailUrl)) {
      formData.append(
        `thumbnailUrl[${Object.keys(thumbnailUrl)[0]}]`,
        Object.values(thumbnailUrl)[0]
      );
    }
    if (deletedImages.length > 0) {
      formData.append("deleteImagesURL", deletedImages);
    }
    formData.append("propertyId", propertyId);

    try {
      const response = await axios
        .post(`${API_BASE_URL}/images/update`, formData, { headers })
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
      console.error("Error uploading images:", error);
      throw error;
    }
  },

  getProperty: async (postId = 1) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          `${API_BASE_URL}/getAllPropertiesForHost?hostId=${postId}`,

          {
            headers,
          }
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
      console.error("Error wile fetching the post:", error);
      throw error;
    }
  },

  getAllProperties: async (pages = 1) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          `${ADMIN_BASE_URL}/getAllProperties?pageNumber=${pages}&countPerPage=20`,

          {
            headers,
          }
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
      console.error("Error wile fetching the post:", error);
      throw error;
    }
  },

  getAllHost: async (pages = 1) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .get(
          `${ADMIN_BASE_URL}/getAllHosts?pageNumber=${pages}&countPerPage=20`,

          {
            headers,
          }
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
      console.error("Error wile fetching the post:", error);
      throw error;
    }
  },

  getPropertyCategoriesList: async () => {
    try {
      const response = await axios
        .get(`${API_BASE_URL}/getPropertyCategoryList`)
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
      console.error("Error wile fetching the post:", error);
      throw error;
    }
  },

  saveCategories: async (data: any) => {
    // TODO: REMOVE TYPE ANY
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios
        .post(`${API_BASE_URL}/savePropertyCategories`, data, { headers })
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

  getFullPropertyDetailsById: async (data: any) => {
    // TODO: REMOVE TYPE ANY
    const body: PropertySearchParams = {
      propertyId: data?.propertyId,
      checkIn: data?.checkIn,
      checkOut: data?.checkOut,
    };

    if (data?.adults) body.adults = data?.adults;
    if (data?.pets) body.pets = data?.pets;
    if (data?.children) body.children = data?.children;
    if (data?.infants) body.infants = data?.infants;

    try {
      const response = await axios
        .post(`${API_BASE_URL}/propertyDetails`, body)
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

  getAllReviewsForProperty: async (id: number) => {
    //TODO: REMOVE TYPE ANY
    try {
      // const headers = {
      //   Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      // };
      const response = await axios
        .get(`${API_BASE_URL}/getAllReviewsForProperty?propertyId=${id}`)
        .catch((error) => {
          if (error?.response?.status === 403) {
            console.log("error: ", error);
            // localStorage.clear();
            // sessionStorage.clear();
            // window.open('/sign-in', '_self');
          }
        });
      return response?.data;
    } catch (error) {
      // Handle error
      console.error("Error wile fetching the post:", error);
      throw error;
    }
  },

  // Add more functions for other API calls as needed
};

export default PropertyService;
