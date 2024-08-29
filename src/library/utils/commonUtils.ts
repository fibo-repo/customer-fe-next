interface Detail {
  propertyDetailsId: number;
  detailsValue: number;
}

interface Location {
  latitude: number;
  longitude: number;
  locality: string;
  cityId?: number;
}

interface PropertyOffering {
  id: number;
  name: string;
  description?: string;
}

interface ServerData {
  amenities: { name: string }[];
  bnbUrl: string;
  description: string;
  details: Detail[];
  location: Location;
  onboardingStage: number;
  propertyId: number;
  propertyOffering: PropertyOffering;
  propertyTypeId: number;
  title: string;
}

interface PropertyType {
  name: string;
}

interface PricingData {
  propertyPrices: Array<{
    priceId: number;
    pricePerNight: number;
    maxGuestAllowed: number;
  }>;
  discounts: Array<{
    discountPercentage: number;
  }>;
  additionalCharges: Array<{
    pricePerNight: number;
    chargeType: string;
  }>;
  defaultPrice: number;
  pricingRangeMetadata: string;
  propertyCalendarPrices: Array<{
    priceDate: string;
    pricePerNight: number;
  }>;
  maxGuestAllowed: number;
}

export const formatCurrencyAmount = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

const formatCurrency = (value: string | number): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle NaN values by defaulting to 0
  if (isNaN(numericValue)) {
    return formatCurrencyAmount.format(0); // Return '0.00 INR' or equivalent
  }

  return formatCurrencyAmount.format(numericValue);
};

export const transformPropertyDataFromServer = (
  serverData: ServerData,
  propertyTypeListMap: Record<number, PropertyType>,
  propertyOfferingsMap: any,
  cityMap: any,
  typeMap: Array<{ id: number; name: string }>
) => {
  const {
    amenities,
    bnbUrl,
    description,
    details,
    location,
    onboardingStage,
    propertyId,
    propertyOffering,
    propertyTypeId,
    title,
  } = serverData;

  const offerings = details.reduce<Record<number, number>>(
    (acc, detail) => ({
      ...acc,
      [detail.propertyDetailsId]: detail.detailsValue,
    }),
    {}
  );

  const offeringsMap = details.reduce<Record<number, Detail>>(
    (acc, detail) => ({
      ...acc,
      [detail.propertyDetailsId]: detail,
    }),
    {}
  );

  const subType =
    typeMap.find((item) => item.name === propertyOffering.description) || null;

  return {
    propertyId,
    detail: {
      title,
      description,
      bnbUrl,
    },
    offeringsMap,
    offerings,
    location: {
      ...location,
      country: "India (IN)",
      district: location.locality,
      coordinates: { lat: location.latitude, lng: location.longitude },
      zoneId: 1,
      city: location?.cityId?.toString() ?? "",
      state: "1",
    },
    amenitiesObject: [...amenities],
    amenities: amenities.map((amenityItem) => amenityItem.name),
    onboardingStage,
    type: { id: propertyOffering.id, name: propertyOffering.name },
    subType: subType ? { id: subType.id, name: subType.name } : null,
    place: {
      id: propertyTypeId,
      name: propertyTypeListMap[propertyTypeId]?.name || "",
    },
  };
};

export const transformPropertyPricing = (serverData: PricingData) => {
  const {
    propertyPrices,
    discounts,
    additionalCharges,
    defaultPrice,
    pricingRangeMetadata,
    propertyCalendarPrices,
    maxGuestAllowed,
  } = serverData;

  const createCharge = (price: number, type: string) => ({
    amount: price,
    paymentType: type,
  });

  return {
    weekday: {
      priceId: propertyCalendarPrices ? 0 : propertyPrices[0].priceId,
      pricePerNight: propertyCalendarPrices
        ? 0
        : propertyPrices[0].pricePerNight,
      numberOfGuests: propertyCalendarPrices
        ? 0
        : propertyPrices[0].maxGuestAllowed,
    },
    weekend: {
      priceId: propertyCalendarPrices ? 0 : propertyPrices[1].priceId,
      pricePerNight: propertyCalendarPrices
        ? 0
        : propertyPrices[1].pricePerNight,
      numberOfGuests: propertyCalendarPrices
        ? 0
        : propertyPrices[1].maxGuestAllowed,
    },
    maxGuestAllowed: {
      numberOfGuests: maxGuestAllowed,
    },
    propertyCalendarPrices: propertyCalendarPrices.reduce<
      Record<string, number>
    >((acc, item) => {
      acc[item.priceDate] = item.pricePerNight;
      return acc;
    }, {}),
    additionalCharges: additionalCharges.map((charge) =>
      createCharge(charge.pricePerNight, charge.chargeType)
    ),
    friday: {
      priceId: propertyCalendarPrices ? 0 : propertyPrices[2].priceId,
      isSelected: propertyCalendarPrices
        ? "weekend"
        : propertyPrices[0].pricePerNight === propertyPrices[2].pricePerNight
        ? "weekday"
        : "weekend",
    },
    discounts: {
      lessThan24Hours: discounts[0].discountPercentage,
      between24HoursTo72Hours: discounts[1].discountPercentage,
      equalToOrMoreThan72Hours: discounts[2].discountPercentage,
      equalToOrMoreThan7Days: discounts[3].discountPercentage,
    },
    discountStore: {
      lessThan24Hours: discounts[0],
      between24HoursTo72Hours: discounts[1],
      equalToOrMoreThan72Hours: discounts[2],
      equalToOrMoreThan7Days: discounts[3],
    },
    basePrice: pricingRangeMetadata ? JSON.parse(pricingRangeMetadata) : {},
    defaultPrice,
  };
};

export function convertDateFormat(dateString: string | null): string | null {
  return dateString ? dateString.split("-").reverse().join("-") : null;
}

export function convertArrayFormat(data: string | null): number[] | null {
  return data ? data.split(",").map(Number) : null;
}

export const PRICE_BREAKDOWN_KEYS: Record<string, string> = {
  basic: "Base Price",
  "Price Per Additional Guest": "Price for Additional Guest",
  "Cleaning fee": "Cleaning Fee",
  serviceFee: "Service Fee",
  tax: "GST",
  discount: "Discount",
};

export function dateDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.ceil(
    Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
  );
}
