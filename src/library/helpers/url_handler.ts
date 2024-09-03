type UrlData = Record<string, string | number | null | undefined>;
type StateData = Record<string, any>;
type LocationData = {
  search?: string; 
  [key: string]: any;
};

export function createUrl(urlData: UrlData): string {
  const keys = Object.keys(urlData);
  let search = "?";
  keys.forEach((key) => {
    if (urlData[key] !== null && urlData[key] !== "") {
      search += `${key}=${encodeURIComponent(urlData[key] as string)}&`;
    }
  });
  return search.substring(0, search.length - 1);
}

export function getUrl(location: LocationData): UrlData {
  const data = location?.search
    ? location.search.slice(location.search.indexOf("?") + 1).split("&")
    : [];
  const urlData: UrlData = {};
  data.forEach((item) => {
    try {
      const [key, value] = item.split("=");
      urlData[key] = decodeURIComponent(value);
    } catch (e) {
      // Handle decoding errors if necessary
    }
  });
  return urlData;
}

export function setStateToUrl(state: StateData): string {
  let urlData: UrlData = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      switch (key) {
        case "date_range":
          let data = Object.values(state[key]);
          urlData[key] =
            data[0] === null && data[1] === null ? "" : data.join();
          break;
        case "amenities":
        case "property":
        case "price":
          urlData[key] = state[key]?.length ? state[key].join() : null;
          break;
        case "room":
        case "guest":
        case "kids":
        case "infants":
          urlData[key] = state[key] || "";
          break;
        case "location":
          if (state[key]?.lat) urlData[`${key}_lat`] = state[key].lat;
          if (state[key]?.lng) urlData[`${key}_lng`] = state[key].lng;
          break;
        case "reset":
          urlData = state[key];
          break;
        default:
          urlData[key] = state[key];
          break;
      }
    }
  }
  return createUrl(urlData);
}

export function getStateFromUrl(location: LocationData): StateData {
  const urlData = getUrl(location);
  const state: StateData = {};
  for (const key in urlData) {
    if (urlData.hasOwnProperty(key)) {
      switch (key) {
        case "date_range":
          const date = urlData[key];
          if (date) {
            const [setStartDate, setEndDate] =
              typeof date === "string" ? date.split(",") : [date];
            state[key] = { setStartDate, setEndDate };
          }
          break;
        case "amenities":
        case "property":
          state[key] =
            typeof urlData[key] === "string"
              ? (urlData[key] as string)?.split(",")
              : [];
          break;
        case "room":
        case "guest":
        case "city":
          state[key] = urlData[key] || "";
          break;
        case "price":
          const [min, max] =
            typeof urlData[key] === "string"
              ? (urlData[key] as string)?.split(",")?.map(Number)
              : [0, 100];

          state[key] = { min, max, defaultMin: 0, defaultMax: 100 };
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
