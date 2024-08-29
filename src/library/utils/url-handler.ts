// Define types for URL data and location
interface UrlData {
  [key: string]: any;
}

interface Location {
  search: string;
}

// Create URL from state data
export function createUrl(urlData: UrlData): string {
  const keys = Object.keys(urlData);
  let search = "?";
  keys.forEach((key) => {
    if (urlData[key] !== null && urlData[key] !== "") {
      search += `${key}=${urlData[key]}&`;
    }
  });
  return search.substring(0, search.length - 1);
}

// Get URL parameters and convert them to an object
export function getUrl(location: Location): UrlData {
  const data = location.search
    ? location.search.slice(location.search.indexOf("?") + 1).split("&")
    : [];
  const urlData: UrlData = {};
  data.forEach((item) => {
    try {
      const [key, value] = item.split("=");
      const dataVal = decodeURIComponent(value);
      urlData[key] = dataVal;
    } catch (e) {
      console.error("Error parsing URL data:", e);
    }
  });
  return urlData;
}

// Set state values to URL
// export function setStateToUrl(state: UrlData): string {
//   let urlData: UrlData = {};
//   for (const key in state) {
//     if (state.hasOwnProperty(key)) {
//       switch (key) {
//         case "date_range":
//           const data = Object.values(state[key]);
//           urlData[key] =
//             data && data.length && data[0] !== null ? data.join() : null;
//           break;

//         case "amenities":
//         case "property":
//         case "price":
//           urlData[key] = state[key]?.length ? state[key].join() : null;
//           break;

//         case "room":
//         case "guest":
//           urlData[key] = state[key] ? state[key] : "";
//           break;

//         case "location":
//           if (state[key]?.lat) urlData[`${key}_lat`] = state[key].lat;
//           if (state[key]?.lng) urlData[`${key}_lng`] = state[key].lng;
//           break;

//         case "reset":
//           urlData = state[key];
//           break;

//         default:
//           urlData[key] = state[key];
//           break;
//       }
//     }
//   }
//   return createUrl(urlData);
// }

// Get state values from URL
export function getStateFromUrl(location: Location): UrlData {
  const urlData = getUrl(location);
  const state: UrlData = {};

  for (const key in urlData) {
    if (urlData.hasOwnProperty(key)) {
      switch (key) {
        case "date_range":
          const date = urlData[key] || null;
          if (date) {
            const [setStartDate, setEndDate] = date.split(",");
            state[key] = { setStartDate, setEndDate };
          }
          break;

        case "amenities":
        case "property":
          state[key] =
            urlData[key] && urlData[key] !== "null"
              ? urlData[key].split(",")
              : [];
          break;

        case "room":
        case "guest":
          state[key] = urlData[key] ? urlData[key] : "";
          break;

        case "price":
          const defaultPrice = {
            min: 0,
            max: 100,
            defaultMin: 0,
            defaultMax: 100,
          };
          const price = urlData[key]
            ? urlData[key].split(",")
            : [defaultPrice.min, defaultPrice.max];
          const [min, max] = price.map(Number);
          if (min > 0 || max < 100) {
            state[key] = { min, max, defaultMin: 0, defaultMax: 100 };
          } else {
            state[key] = "";
          }
          break;

        case "location_lat":
          state["location"] = state["location"] || {};
          state["location"]["lat"] = Number(urlData[key]);
          break;

        case "location_lng":
          state["location"] = state["location"] || {};
          state["location"]["lng"] = Number(urlData[key]);
          break;

        case "page":
        case "limit":
          state[key] = Number(urlData[key]);
          break;

        default:
          state[key] = urlData[key];
          break;
      }
    }
  }
  return state;
}
