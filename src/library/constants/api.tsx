let API_URI = "/bys/api";
if (process.env.NODE_ENV === "development") {
  API_URI = "https://qa.bidyourstay.com/bys/api";
}
export const API_BASE_URI = API_URI;
// export const API_BASE_URI = 'https://qa.bidyourstay.com/bys/api'; // todo: remove
// export const API_BASE_URI = 'https://bidyourstay.com/bys/api'
