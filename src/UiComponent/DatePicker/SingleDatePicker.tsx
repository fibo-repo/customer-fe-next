import React, { useState } from "react";
import moment, { Moment } from "moment";
import omit from "lodash/omit";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { SingleDatePickerPhrases } from "react-dates/esm/defaultPhrases";
import SingleDatePickerShape from "react-dates/esm/shapes/SingleDatePickerShape";
import { HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from "react-dates/constants";
import isInclusivelyAfterDay from "react-dates/esm/utils/isInclusivelyAfterDay";

interface SingleDatePickerWrapperProps
  extends Omit<
    typeof SingleDatePickerShape,
    "date" | "onDateChange" | "focused" | "onFocusChange"
  > {
  autoFocus?: boolean;
  initialDate?: Moment | null;
}

const SingleDatePickerWrapper: React.FC<SingleDatePickerWrapperProps> = ({
  autoFocus = false,
  initialDate = null,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(autoFocus);
  const [date, setDate] = useState<Moment | null>(initialDate);

  const onDateChange = (date: Moment | null) => setDate(date);

  const onFocusChange = ({ focused }: { focused: boolean }) => {
    setFocused(focused);
  };

  // Omitting non-applicable props for SingleDatePicker
  const filteredProps = omit(props, ["autoFocus", "initialDate"]);

  return (
    <SingleDatePicker
      {...filteredProps}
      id="date_input"
      date={date}
      focused={focused}
      onDateChange={onDateChange}
      onFocusChange={onFocusChange}
    />
  );
};

SingleDatePickerWrapper.defaultProps = {
  // Default Props to mimic the ones defined in the class component
  autoFocus: false,
  initialDate: null,

  // Input related props
  id: "date",
  placeholder: "Date",
  disabled: false,
  required: false,
  screenReaderInputMessage: "",
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

  // Calendar presentation and interaction-related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isRTL: false,

  // Navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick: () => {},
  onNextMonthClick: () => {},
  onClose: () => {},

  // Day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day: Moment) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // Internationalization props
  displayFormat: () => moment.localeData().longDateFormat("L"),
  monthFormat: "MMMM YYYY",
  phrases: SingleDatePickerPhrases,
};

export default SingleDatePickerWrapper;
