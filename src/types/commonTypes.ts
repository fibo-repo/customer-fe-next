export interface QueryParams {
  date_range: SearchDate;
  guest: number;
  pets?: number;
  infants?: number;
  kids?: number;
}

export interface RoomGuest {
  guest: number;
  pets?: number;
  infants?: number;
  kids?: number;
}

export interface SearchDate {
  setStartDate?: string | Date | null;
  setEndDate?: string | Date | null;
}
