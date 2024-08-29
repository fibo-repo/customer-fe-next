import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const GridCardWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  line-height: 1.57;
  cursor: pointer;
  border: 1px solid #f7f7f7;

  @media (max-width: 414px) {
    margin-bottom: 20px;
  }

  &.has_btn {
    .button_group {
      @media (min-width: 481px) {
        position: absolute;
        right: 0px;
        bottom: -3px;
      }
    }
  }

  &:hover {
    box-shadow: 0 6px 12px ${themeGet('boxShadow.2', 'rgba(0, 0, 0, 0.16)')};

    .content_wrapper {
      border-color: transparent;
    }

    &.has_btn {
      .meta_wrapper {
        .rating {
          @media (min-width: 481px) {
            opacity: 0;
            visibility: hidden;
          }
        }
      }

      @media (min-width: 481px) {
        .button_group {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .react-multiple-carousel__arrow {
      opacity: 1;
      visibility: visible;
    }

    .react-multi-carousel-dot-list {
      bottom: 0;
    }
  }
`;

export const ImageWrapper = styled.div`
  > img {
    max-width: 100%;
    height: auto;
  }

  .react-multi-carousel-list {
    min-height: 150px;
    background-color: #e9e8ec;
  }

  .react-multi-carousel-item {
    height: 230px;
  }

  .react-multiple-carousel__arrow {
    top: 0;
    width: 22%;
    height: 100%;
    border-radius: 0;
    padding-top: 0;
    opacity: 0;
    visibility: hidden;
    z-index: 1;

    &::before {
      font-weight: 700;
    }
  }

  .react-multiple-carousel__arrow--left {
    left: 0;
    background: linear-gradient(
      to left,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
    &:hover {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 0, 0, 0.25) 100%
      );
    }
  }

  .react-multiple-carousel__arrow--right {
    right: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
    &:hover {
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 0, 0, 0.25) 100%
      );
    }
  }

  .react-multi-carousel-dot-list {
    position: absolute;
    bottom: -30%;
    left: 0;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
    transition: bottom 0.3s ease;
  }

  .react-multi-carousel-dot {
    align-items: center;

    button {
      width: 6px;
      height: 6px;
      border: 0;
      background-color: ${themeGet('color.3', '#E9E8E8')};
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
  }

  .react-multi-carousel-dot--active {
    button {
      width: 8px;
      height: 8px;
      background-color: ${themeGet('color.1', '#ffffff')};
    }
  }
`;

export const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
  z-index: 9;
`;

export const ContentWrapper = styled.div`
  padding: 15px;
  border-top-width: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: border-color 0.2s ease;
  min-height: 200px;
`;

export const LocationArea = styled.div`
  color: #4dcad2;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 5px;
`;

export const TitleArea = styled.div`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
  white-space: nowrap;
  width: auto;
  text-wrap: pretty;
  @media (max-width: 414px) {
    font-size: 15px;
    margin: 4px 0 5px;
  }

  a {
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 2px;
    @media (max-width: 414px) {
      font-size: 15px;
      margin: 4px 0 5px;
    }
    &:hover {
      color: ${themeGet('primary.0', '#4dcad2')};
    }
  }
`;

export const PriceArea = styled.div`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 14px;
  font-weight: 700;
  margin-top: 1px;
  margin-bottom: 0px;
`;

export const Offerings = styled.div`
  color: ${themeGet('text.4', '#5f5b5b')};
  font-size: 14px;
  // font-weight: 700;
  margin-top: 1px;
  margin-bottom: 10px;
  width: 100%;
`;

export const RatingArea = styled.div`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 13px;
  margin-top: 4px;
  padding-bottom: 20px;
  @media   (max-width: 414px) {
    display: flex;
    justify-content: center;
		margin-top: 4px;
	}

  span {
    flex-shrink: 0;
  }

  i {
    color: ${themeGet('primary.0', '#4dcad2')};
  }

  svg {
    fill: black;
  }

  strong {
    margin-top: -2px;
    font-weight: 700;
    margin-left: 8px;
    /* @media   (max-width: 414px) {
			margin-left: 0;
		} */
  }

  .ant-rate {
    /* margin-top: -2px; */
    .ant-rate-star {
      margin-right: 4px;
      font-size: 15px;
    }
  }
`;

export const MetaWrapper = styled.div`
  position: relative;
  transition: all 0.3s ease-out;
  .original-price {
    text-decoration: line-through;
    font-size: 12px;
  }
`;

export const ButtonGroup = styled.div`
  padding-top: 7px;

  @media (min-width: 481px) {
    opacity: 0;
    visibility: hidden;
  }

  > a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: ${themeGet('primary.0', '#4dcad2')};
    transition: all 0.3s ease;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
      color: ${themeGet('primary.1', '#399C9F')};
    }

    svg {
      margin-right: 5px;
      width: 18px;
      height: 18px;
    }
  }
`;

export default GridCardWrapper;
