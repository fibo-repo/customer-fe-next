import { Button, Checkbox, Drawer } from 'antd';
import {
  ButtonGroup,
  FilterElementsWrapper
} from '../../app/listing/components/Search/MobileSearchView.style';
import {FilterItemWrapper} from '../../UiComponent/CategorySearch/categorySearch.style'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import React, { useEffect, useState } from 'react';
import Heading from '../../UiComponent/Heading/Heading';
import { IoIosArrowDown } from 'react-icons/io';
import PropertyService from '../../service/PropertyService';
import Image from 'next/image';

// Define the types for the props
interface FilterAccordionProps {
  placement: 'left' | 'right' | 'top' | 'bottom';
  sidebarHandler: () => void;
  toggle: boolean;
  handleCheckboxClick: (id: number, name: string, value: string | number) => void;
  handlePlaceClick: (id: number, name: string, value: string ) => void;
  handleDecrement?: (type: string) => void; 
  handleIncrement?: (type: string) => void;
  filters: {
    amenity: number[];
    typeOfPlace: number[];
    // offerings: {
    //   bedrooms: number;
    //   beds: number;
    //   bathrooms: number;
    //   balconies: number;
    // };
    // petsAllowed: boolean;
    // flexiCheckIn: boolean;
  };
  setFilters?: React.Dispatch<React.SetStateAction<any>>;
  children?: React.ReactNode;
  onClickApply: () => void;
}

export const FilterAccordion: React.FC<FilterAccordionProps> = ({
  placement,
  sidebarHandler,
  toggle,
  handleCheckboxClick,
  handlePlaceClick,
  filters,
  children,
  onClickApply,
}) => {
  const [amenityData, setAmenityData] = useState<any[]>([]);
  const [placeData, setPlaceData] = useState<any[]>([]);

  useEffect(() => {
    PropertyService.getAmenities()
      .then((responseData) => {
        setAmenityData(responseData.result);
      })
      .catch((error) => {
        console.error('Error fetching amenities:', error);
      });
  }, []);

  useEffect(() => {
    PropertyService.getPropertyTypeList()
      .then((responseData) => {
        setPlaceData(responseData.result);
      })
      .catch((error) => {
        console.error('Error fetching property types:', error);
      });
  }, []);

  return (
    <Drawer
      placement={placement}
      closable={false}
      onClose={sidebarHandler}
      width={placement === 'right' ? '500px' : '100%'}
      height={placement === 'bottom' ? '100vh' : '100%'}
      className={placement === 'bottom' ? 'filter_drawer' : ''}
      open={toggle}
      maskClosable={placement === 'bottom'}
      maskStyle={placement === 'bottom' ? { backgroundColor: 'transparent' } : {}}
    >
      <FilterElementsWrapper>
        <Accordion allowZeroExpanded>
          {children}
          {/* Start amenities filter element */}
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <Heading as="h4" content="Amenities" />
                <IoIosArrowDown />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {amenityData.map((amenity) => (
                <FilterItemWrapper
                  id={amenity.id}
                  key={amenity.id}
                  onClick={() => handleCheckboxClick(amenity.id, amenity.name, amenity.name)}
                >
                  <Checkbox
                    name={amenity.name}
                    value={amenity.name}
                    checked={filters.amenity.includes(amenity.id)}
                  />
                  <span>
                    <Image
                      src={`/images/${amenity.icon}.png`}
                      alt={amenity.icon}
                      style={{
                        marginRight: '6px',
                        marginLeft: '6px',
                        height: '28px',
                        width: '28px',
                      }}
                    />
                  </span>
                  <label htmlFor={amenity.name}>{amenity.name}</label>
                </FilterItemWrapper>
              ))}
            </AccordionItemPanel>
          </AccordionItem>
          {/* End of amenities filter element */}
          {/* Start place filter element */}
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <Heading as="h4" content="Type of Stay" />
                <IoIosArrowDown />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {placeData.map((place) => (
                <FilterItemWrapper
                  id={place.id}
                  key={place.id}
                  onClick={() => handlePlaceClick(place.id, place.name, place.value)}
                >
                  <Checkbox
                    name={place.name}
                    value={place.name}
                    checked={filters.typeOfPlace.includes(place.id)}
                  />
                  <span>
                    <Image
                      src={`/images/stay/${place.icon}.png`}
                      alt={place.icon}
                      style={{
                        marginRight: '6px',
                        marginLeft: '6px',
                        height: '28px',
                        width: '28px',
                      }}
                    />
                  </span>
                  <label htmlFor={place.name}>{place.name}</label>
                </FilterItemWrapper>
              ))}
            </AccordionItemPanel>
          </AccordionItem>
          {/* End of place filter element */}
          {/* Room & Guest type filter element */}
          {/* Uncomment and adjust if needed
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <Heading as="h4" content="Offerings" />
                <IoIosArrowDown />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <RoomGuestWrapper>
                <ItemWrapper>
                  <strong>Bedrooms</strong>
                  <InputIncDec
                    id="bedrooms"
                    increment={() => handleIncrement('bedrooms')}
                    decrement={() => handleDecrement('bedrooms')}
                    value={filters.offerings?.bedrooms}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <strong>Beds</strong>
                  <InputIncDec
                    id="beds"
                    increment={() => handleIncrement('beds')}
                    decrement={() => handleDecrement('beds')}
                    value={filters.offerings?.beds}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <strong>Bathrooms</strong>
                  <InputIncDec
                    id="bathrooms"
                    increment={() => handleIncrement('bathrooms')}
                    decrement={() => handleDecrement('bathrooms')}
                    value={filters.offerings?.bathrooms}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <strong>Balconies</strong>
                  <InputIncDec
                    id="balconies"
                    increment={() => handleIncrement('balconies')}
                    decrement={() => handleDecrement('balconies')}
                    value={filters.offerings?.balconies}
                  />
                </ItemWrapper>
              </RoomGuestWrapper>
            </AccordionItemPanel>
          </AccordionItem>
          */}
        </Accordion>

        <ButtonGroup>
          <Button onClick={sidebarHandler}>Close</Button>
          <Button
            type="primary"
            onClick={() => {
              sidebarHandler();
              onClickApply();
            }}
          >
            Apply Filter
          </Button>
        </ButtonGroup>
      </FilterElementsWrapper>
    </Drawer>
  );
};
