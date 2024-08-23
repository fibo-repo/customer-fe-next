import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const BannerWrapper = styled.div`
  width: 100%;
  min-height: 88vh;
  position: relative;
  background-color: ${themeGet('color.1', '#ffffff')};

  @media (max-width: 991px) {
    > div {
      max-width: 100%;
    }
  }

  @media (min-width: 480px) and (max-width: 991px) {
    min-height: 90vh;
  }

  @media (max-width: 414px) {
    min-height: 76vh;
  }

  .glide,
  .glide__track,
  .glide__slides {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: all;
  }

  .glide__slide {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .glide__bullets {
    position: absolute;
    bottom: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .glide__bullet {
    width: 7px;
    height: 7px;
    background-color: ${themeGet('color.1', '#ffffff')};
    transition: width 0.3s ease;
  }

  .glide__bullet--active {
    width: 25px;
    border-radius: 8px;
    background-color: ${themeGet('color.1', '#ffffff')};
  }

  > div {
    position: relative;
    min-height: 64vh;

    @media (max-width: 414px) {
      min-height: 76vh;
    }
  }

  &:after {
    display: block;
    content: '';
    width: 100%;
    height: 60%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    pointer-events: none;
    z-index: 0;
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  padding: 28px 30px 30px;
  border-radius: 6px;
  background-color: #e2e2e2;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.08);
  position: absolute;
  bottom: 81px;
  z-index: 1;

  @media (min-width: 569px) and (max-width: 991px) {
    width: 414px;
    left: 30px;
  }

  @media (max-width: 414px) {
    width: calc(100% - 30px);
    padding: 15px;
    left: 15px;

    > p {
      display: none;
    }
  }

  > div {
    @media (min-width: 481px) {
      margin-top: 30px;
    }
  }

  h2 {
    margin-bottom: 10px;
  }
`;
export const SearchWrapperBox = styled.div`
  width: 440px;
  left: 40px;
  padding: 28px 30px 30px;
  border-radius: 12px;
  background-color: #e2e2e2;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 140px;
  z-index: 1;

  @media (max-width: 414px) {
    width: calc(100% - 30px);
    padding: 15px;
    left: 15px;

    > p {
      display: none;
    }
  }

  > div {
    @media (min-width: 481px) {
      margin-top: 40px;
    }
  }

  h2 {
    margin-bottom: 10px;
  }
`;

export const FormWrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: ${themeGet('color.2', '#F7F7F7')};
  border-radius: 3px 0 0 3px;
  min-height: 60px;

  @media (max-width: 414px) {
    margin-top: 10px;
    width: 100%;
  }

  /* submit button style */
  button[type='submit'].ant-btn {
    min-width: 100%;
    height: 60px;
    color: ${themeGet('color.1', '#ffffff')};
    background-color: ${themeGet('primary.0', '#4dcad2')};
    border-radius: 0 3px 3px 0;
    border: 0;
    box-shadow: none;
    font-size: 15px;
    font-weight: 700;
    text-shadow: none;

    @media (max-width: 991px) {
      min-width: 100%;
      border-radius: 0 0 3px 3px;
    }

    @media (max-width: 414px) {
      height: 47px;
    }

    &::after {
      display: none;
    }

    &:hover {
      background-color: ${themeGet('primary.0', '#4dcad2')};
      opacity: 0.85;
    }
  }
`;
export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${themeGet('color.2', '#F7F7F7')};
  border-radius: 20px 20px 20px 20px;
  min-height: 40px;
  height: 60px;
  width: 60%;
  // border: 1px solid black;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: auto;

    border-radius: 20px 20px 20px 20px;

    button[type='submit'].ant-btn {
      min-width: 100%;
      height: 60px;
      color: ${themeGet('color.1', '#ffffff')};
      background-color: ${themeGet('primary.0', '#4dcad2')};
      border-radius: 0 3px 3px 0;
      border: 0;
      box-shadow: none;
      font-size: 15px;
      font-weight: 700;
      text-shadow: none;

      @media (max-width: 991px) {
        min-width: 100%;
        border-radius: 0 0 3px 3px;
      }

      @media (max-width: 414px) {
        height: 47px;
      }

      &::after {
        display: none;
      }

      &:hover {
        background-color: ${themeGet('primary.0', '#4dcad2')};
        opacity: 0.85;
      }
    }
  }

  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${themeGet('color.2', '#F7F7F7')};
    border-radius: 15px 15px 15px 15px;
    min-height: 60px;
    width: 80%;
  }

  @media (max-width: 414px) {
    margin-top: 10px;
    width: 100%;
  }

  /* submit button style */
  button[type='submit'].ant-btn {
    // min-width: 157px;
    min-width: 150px;
    height: 60px;
    color: ${themeGet('color.1', '#ffffff')};
    background-color: ${themeGet('primary.0', '#4dcad2')};
    // border-radius: 0 3px 3px 0;
    border-radius: 20px 20px 20px 20px;

    border: 0;
    box-shadow: none;
    font-size: 15px;
    font-weight: 700;
    text-shadow: none;

    @media (max-width: 1200px) {
      min-width: 100%;
      border-radius: 3px 3px 15px 15px;
    }

    @media (max-width: 414px) {
      height: 47px;
    }

    &::after {
      display: none;
    }

    &:hover {
      background-color: ${themeGet('primary.0', '#4dcad2')};
      opacity: 0.85;
    }
  }
`;

export const ComponentWrapperBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  .target {
    right: 10px;
    left: auto;

    @media (max-width: 414px) {
      right: 25px;
    }
  }

  /* map auto complete style */
  .map_autocomplete {
    width: 100%;
    position: relative;

    &::after {
      content: '';
      width: 1px;
      height: 20px;
      display: inline-block;
      position: absolute;
      top: calc(50% - 10px);
      right: 0;
      left: auto;
      background-color: ${themeGet('border.3', '#E6E6E6')};
    }

    @media (max-width: 991px) {
      &::after {
        top: auto;
        bottom: 0;
        height: 1px;
        width: calc(100% - 40px);
        left: 20px;
      }
    }

    @media (max-width: 414px) {
      &::after {
        width: calc(100% - 30px);
        left: 15px;
      }
    }

    input {
      border: 0;
      font-size: 16px;
      font-weight: 800;
      border-radius: 0;
      height: 60px;
      padding: 0 30px 0 40px;
      background: transparent;
      color: ${themeGet('text.0', '#2C2C2C')};

      @media (max-width: 414px) {
        height: 47px;
        padding: 0 57px 0 42px;
      }

      &:hover,
      &:focus {
        outline: none;
        box-shadow: none;
      }

      &::placeholder {
        color: ${themeGet('text.0', '#2C2C2C')};
      }
    }
  }

  /* date picker style */
  .date_picker {
    min-width: calc(250px - 14px);
    width: calc(100% - 14px);
    margin: 0 0 0 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    @media (max-width: 414px) {
      height: 47px;
    }

    .DayPicker__withBorder {
      box-shadow: 0 15px 46px -10px rgba(26, 26, 29, 0.3);
    }

    .DateRangePicker {
      display: block;
      width: 100%;

      .DateRangePickerInput {
        border: 0;
        padding-right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;

        .DateRangePickerInput_clearDates,
        .DateRangePickerInput_clearDates {
          &.DateRangePickerInput_clearDates__small {
            display: none;
          }
        }

        .DateInput {
          width: 100%;
          padding: 0 15px 0 30px;
          background: transparent;
          padding: 0 25px 0 30px;

          @media (max-width: 568px) {
            padding: 0 15px 0 25px;
          }

          .DateInput_fang {
            display: none;
          }

          .DateInput_input {
            padding: 0;
            font-weight: 400;
            color: ${themeGet('text.0', '#2C2C2C')};
            background: transparent;

            &.DateInput_input__focused {
              border-color: transparent;
            }

            &::placeholder {
              color: ${themeGet('text.0', '#2C2C2C')};
            }
          }
        }

        .DateRangePickerInput_arrow {
          & + .DateInput {
            input {
              text-align: right;
            }
          }
        }
      }

      .DateRangePicker_picker {
        margin-top: -12px;
        z-index: 2;

        @media (max-width: 991px) {
          top: 47px !important;
        }

        @media (max-width: 320px) {
          left: -29px !important;
          .DayPicker,
          .DayPicker > div > div,
          .DayPicker > div > div .DayPicker_transitionContainer {
            width: 294px !important;
          }

          .DayPicker {
            .DayPicker_weekHeader {
              padding: 0 !important;
            }

            .CalendarMonth {
              padding: 0 !important;
            }
          }
        }
      }
    }
  }

  /* view with popup component style */
  .view_with__popup {
    max-width: 100%;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 20px;
      display: inline-block;
      position: absolute;
      top: calc(50% - 10px);
      right: auto;
      left: 0;
      z-index: 1;
      background-color: ${themeGet('border.3', '#E6E6E6')};

      @media (max-width: 991px) {
        top: 0;
        bottom: auto;
        height: 1px;
        width: calc(100% - 40px);
        left: 20px;
      }

      @media (max-width: 414px) {
        width: calc(100% - 30px);
        left: 15px;
      }
    }

    /* popu handler style */
    .popup_handler {
      width: calc(100% - 14px);
      margin-left: 14px;

      button.ant-btn {
        min-width: auto;
        width: 100%;
        height: 60px;
        border: 0;
        padding: 0 30px;
        border-radius: 0;
        box-shadow: none;
        font-weight: 400;
        font-size: 15px;
        color: ${themeGet('text.0', '#2C2C2C')};
        background-color: ${themeGet('color.2', '#F7F7F7')};

        @media (max-width: 991px) {
          text-align: left;
          padding: 0 25px 0 30px;
        }

        @media (max-width: 414px) {
          height: 47px;
          padding: 0 20px 0 25px;
        }

        &::after {
          display: none;
        }
      }
    }

    &.room_guest {
      .popup_handler {
        button.ant-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    &.active {
      .popup_container {
        margin-top: 0;
        padding: 22px;
        box-shadow: 0 15px 46px -10px rgba(26, 26, 29, 0.3);

        @media (max-width: 991px) {
          margin-top: 0;
        }

        @media (max-width: 414px) {
          min-width: auto;
        }
      }
    }
  }

  /* icon style */
  > svg {
    position: absolute;
    z-index: 1;
    top: auto;
    &.map-marker,
    &.calendar,
    &.user-friends {
      left: 15px;
      right: auto;
      fill: ${themeGet('primary.0', '#4dcad2')};
    }

    &.calendar {
      @media (max-width: 414px) {
        width: 14px;
        height: 14px;
      }
    }

    &.user-friends {
      width: 17px;
      height: 17px;
      @media (max-width: 414px) {
        width: 16px;
        height: 16px;
      }
    }

    &.caret-down {
      right: 12px;
      left: auto;
      fill: ${themeGet('text.1', '#909090')};

      @media (max-width: 991px) {
        right: 20px;
      }

      @media (max-width: 991px) {
        right: 15px;
      }
    }
  }
`;

export const ContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  position: relative;
  // border: 1px solid red;
  .target {
    right: 10px;
    left: auto;

    @media (max-width: 414px) {
      right: 25px;
    }

    @media (max-width: 991px) {
      display: flex;

      flex-direction: column;
    }
  }
  // @media(width:900px){
  //   display:flex;
  //   flex-direction:column;
  // }

  /* map auto complete style */
  .map_autocomplete {
    width: 200px;
    position: relative;

    &::after {
      content: '';
      width: 1px;
      height: 20px;
      display: inline-block;
      position: absolute;
      top: calc(50% - 10px);
      right: 0;
      left: auto;
      background-color: ${themeGet('border.3', '#E6E6E6')};
    }

    @media (max-width: 991px) {
      &::after {
        top: auto;
        bottom: 0;
        height: 1px;
        width: calc(100% - 40px);
        left: 20px;
      }
    }

    @media (max-width: 414px) {
      &::after {
        width: calc(100% - 30px);
        left: 15px;
      }
    }

    @media (max-width: 820px) {
      width: 100%;
    }

    input {
      border: 0;
      font-size: 15px;
      font-weight: 800;
      border-radius: 0;
      height: 60px;
      padding: 0 30px 0 40px;
      background: transparent;
      color: ${themeGet('text.0', '#2C2C2C')};

      @media (max-width: 414px) {
        height: 47px;
        padding: 0 30px 0 42px;
      }

      &:hover,
      &:focus {
        outline: none;
        box-shadow: none;
      }

      &::placeholder {
        color: ${themeGet('text.0', '#2C2C2C')};
      }
    }
  }

  /* date picker style */
  .date_picker {
    min-width: 300px;
    width: calc(100% - 14px);
    margin: 0 0 0 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    @media (max-width: 414px) {
      height: 47px;
      min-width: calc(250px - 14px);
    }

    .DayPicker__withBorder {
      box-shadow: 0 15px 46px -10px rgba(26, 26, 29, 0.3);
    }

    .DateRangePicker {
      display: block;
      width: 100%;

      .DateRangePickerInput {
        border: 0;
        padding-right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;

        .DateRangePickerInput_clearDates,
        .DateRangePickerInput_clearDates {
          &.DateRangePickerInput_clearDates__small {
            display: none;
          }
        }

        .DateInput {
          width: 100%;
          padding: 0 15px 0 30px;
          background: transparent;
          padding: 0 25px 0 30px;

          @media (max-width: 568px) {
            padding: 0 15px 0 25px;
          }

          .DateInput_fang {
            display: none;
          }

          .DateInput_input {
            padding: 0;
            font-weight: 400;
            color: ${themeGet('text.0', '#2C2C2C')};
            background: transparent;

            &.DateInput_input__focused {
              border-color: transparent;
            }

            &::placeholder {
              color: ${themeGet('text.0', '#2C2C2C')};
            }
          }
        }

        .DateRangePickerInput_arrow {
          & + .DateInput {
            input {
              text-align: right;
            }
          }
        }
      }

      .DateRangePicker_picker {
        margin-top: -12px;
        z-index: 2;

        @media (max-width: 991px) {
          top: 47px !important;
        }

        @media (max-width: 320px) {
          left: -29px !important;
          .DayPicker,
          .DayPicker > div > div,
          .DayPicker > div > div .DayPicker_transitionContainer {
            width: 294px !important;
          }

          .DayPicker {
            .DayPicker_weekHeader {
              padding: 0 !important;
            }

            .CalendarMonth {
              padding: 0 !important;
            }
          }
        }
      }
    }
  }

  /* view with popup component style */
  .view_with__popup {
    max-width: 100%;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 20px;
      display: inline-block;
      position: absolute;
      top: calc(50% - 10px);
      right: auto;
      left: 0;
      z-index: 1;
      background-color: ${themeGet('border.3', '#E6E6E6')};

      @media (max-width: 991px) {
        top: 0;
        bottom: auto;
        height: 1px;
        width: calc(100% - 40px);
        left: 20px;
      }

      @media (max-width: 414px) {
        width: calc(100% - 30px);
        left: 15px;
      }
    }

    /* popu handler style */
    .popup_handler {
      width: calc(100% - 14px);
      margin-left: 14px;

      button.ant-btn {
        min-width: auto;
        width: 100%;
        height: 60px;
        border: 0;
        padding: 0 30px;
        border-radius: 0;
        box-shadow: none;
        font-weight: 400;
        font-size: 15px;
        color: ${themeGet('text.0', '#2C2C2C')};
        background-color: ${themeGet('color.2', '#F7F7F7')};

        @media (max-width: 991px) {
          text-align: left;
          padding: 0 25px 0 30px;
        }

        @media (max-width: 414px) {
          height: 47px;
          padding: 0 20px 0 25px;
        }

        &::after {
          display: none;
        }
      }
    }

    &.room_guest {
      .popup_handler {
        button.ant-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    &.active {
      .popup_container {
        margin-top: 0;
        padding: 22px;
        box-shadow: 0 15px 46px -10px rgba(26, 26, 29, 0.3);

        @media (max-width: 991px) {
          margin-top: 0;
        }

        @media (max-width: 414px) {
          min-width: auto;
        }
      }
    }
  }

  /* icon style */
  > svg {
    position: absolute;
    z-index: 1;
    top: auto;
    &.map-marker,
    &.calendar,
    &.user-friends {
      left: 15px;
      right: auto;
      fill: ${themeGet('primary.0', '#4dcad2')};
    }

    &.calendar {
      @media (max-width: 414px) {
        width: 14px;
        height: 14px;
      }
    }

    &.user-friends {
      width: 17px;
      height: 17px;
      @media (max-width: 414px) {
        width: 16px;
        height: 16px;
      }
    }

    &.caret-down {
      right: 12px;
      left: auto;
      fill: ${themeGet('text.1', '#909090')};

      @media (max-width: 991px) {
        right: 20px;
      }

      @media (max-width: 991px) {
        right: 15px;
      }
    }
  }
`;

export const RoomGuestWrapper = styled.div`
  width: 100%;

  strong {
    font-size: 15px;
    font-weight: 400;
    color: ${themeGet('text.0', '#2C2C2C')};
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 5px;
  }

  .quantity {
    height: 30px;

    input {
      font-size: 15px;
    }

    button.btn svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default BannerWrapper;
