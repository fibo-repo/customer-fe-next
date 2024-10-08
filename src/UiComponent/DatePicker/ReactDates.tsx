"use client";

import "react-dates/initialize";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import React, { useState, useEffect } from "react";
import { ReactDatesStyleWrapper } from "./ReactDates.style";
import moment, { Moment } from "moment";
import { CalendarItem } from "@/commonComponents/Search/searchForm";

export interface DateRangePickerBoxProps {
  className?: string;
  startDateId?: string;
  endDateId?: string;
  startDatePlaceholderText?: string;
  endDatePlaceholderText?: string;
  disabled?: boolean | "startDate" | "endDate"; // Updated to camel case
  showClearDates?: boolean;
  isRTL?: boolean;
  orientation?: "horizontal" | "vertical";
  anchorDirection?: "left" | "right";
  withPortal?: boolean;
  withFullScreenPortal?: boolean;
  small?: boolean;
  block?: boolean;
  numberOfMonths?: number;
  autoUpdateInput?: boolean;
  regular?: boolean;
  noBorder?: boolean;
  updateSearchData: (data: {
    setStartDate?: string;
    setEndDate?: string;
  }) => void;
  startDate?: Moment | null;
  endDate?: Moment | null;
  item?: CalendarItem;
}

export interface DefaultCalenderProps {
  className?: string;
  startDateId: string;
  endDateId: string;
  startDatePlaceholderText?: string;
  endDatePlaceholderText?: string;
  disabled?: boolean | "startDate" | "endDate"; // Updated to camel case
  showClearDates?: boolean;
  isRTL?: boolean;
  orientation?: "horizontal" | "vertical";
  anchorDirection?: "left" | "right";
  withPortal?: boolean;
  withFullScreenPortal?: boolean;
  small?: boolean;
  block?: boolean;
  numberOfMonths?: number;
  autoUpdateInput?: boolean;
  regular?: boolean;
  noBorder?: boolean;
  updateSearchData?: (data: {
    setStartDate?: string;
    setEndDate?: string;
  }) => void;
  startDate: Moment | null;
  endDate: Moment | null;
  focusedInput: FocusedInputShape | null;
  onFocusChange: (focusedInput: FocusedInputShape | null) => void;
  onDatesChange: (arg: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => void;
  isOutsideRange?: (day: Moment) => boolean;
}

const DateRangePickerBox: React.FC<DateRangePickerBoxProps> = ({
  className,
  startDateId = "start_unique_id",
  endDateId = "end_unique_id",
  startDatePlaceholderText,
  endDatePlaceholderText,
  disabled,
  showClearDates,
  isRTL,
  orientation,
  anchorDirection,
  withPortal,
  withFullScreenPortal,
  small,
  block,
  numberOfMonths,
  regular,
  noBorder,
  updateSearchData,
  startDate: initialStartDate,
  endDate: initialEndDate,
  item,
}) => {
  const dateFormat = item?.format || "YYYY-MM-DD"; // Use item.format for date format

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const [startDate, setStartDate] = useState<Moment | null>(
    initialStartDate ? moment(initialStartDate, dateFormat) : null
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    initialEndDate ? moment(initialEndDate, dateFormat) : null
  );

  const onDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate && endDate) {
      updateSearchData({
        setStartDate: startDate.format(dateFormat),
        setEndDate: endDate.format(dateFormat),
      });
    }
  };

  const onFocusChange = (focusedInput: FocusedInputShape | null) => {
    setFocusedInput(focusedInput);
  };

  useEffect(() => {
    setStartDate(
      initialStartDate ? moment(initialStartDate, dateFormat) : null
    );
    setEndDate(initialEndDate ? moment(initialEndDate, dateFormat) : null);
  }, [initialStartDate, initialEndDate]);

  const addAllClasses = ["date_picker"];
  if (className) {
    addAllClasses.push(className);
  }

  const defaultCalenderProps: DefaultCalenderProps = {
    startDateId,
    endDateId,
    startDate: startDate || null,
    endDate: endDate || null,
    focusedInput: focusedInput || null,
    onFocusChange: onFocusChange,
    onDatesChange: onDateChange,
    startDatePlaceholderText,
    endDatePlaceholderText,
    disabled, // Pass the correctly typed disabled prop
    isRTL,
    showClearDates: showClearDates || false,
    orientation,
    anchorDirection,
    withPortal,
    withFullScreenPortal,
    small,
    numberOfMonths: numberOfMonths || 1,
    block,
    regular,
    noBorder,
    isOutsideRange: (day: Moment) =>
      day.isBefore(moment().add(24, "hours").startOf("day")),
  };

  // Usage in the component
  return (
    <ReactDatesStyleWrapper className={addAllClasses.join(" ")}>
      <DateRangePicker {...defaultCalenderProps} />
    </ReactDatesStyleWrapper>
  );
};

export default DateRangePickerBox;
