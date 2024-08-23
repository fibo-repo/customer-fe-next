import React, { useState } from "react";
import { Input } from "antd";
import { ItemWrapper } from "./MapAutoComplete.style";
import { FaMapMarkerAlt } from "react-icons/fa";
import { City as CityMain } from "../Search/searchForm";

interface SearchInputProps {
  label: string;
  value: CityMain;
  isDisabled?: boolean;
  className?: string;
  list: CityMain[];
  setFieldValue: (city: CityMain) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  isDisabled,
  className,
  list,
  setFieldValue,
}) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<CityMain[]>([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowList(true);
    const inputValue = event.target.value;

    if (!inputValue) {
      setActiveSearch([]);
      setShowList(false);
      setFieldValue({ id: 0, name: "" });
      return;
    }

    setFieldValue({ id: 0, name: inputValue });
    const searchedData = list.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setActiveSearch(searchedData);
  };

  const handleClick = (city: CityMain) => {
    setFieldValue(city);
    setShowList(false);
  };

  return (
    <div className="map_autocomplete">
      <Input
        type="text"
        value={value.name || ""}
        placeholder={label}
        size="large"
        onChange={handleOnChange}
        onClick={() => setShowList(!showList)}
        disabled={isDisabled}
        className={className}
      />

      {showList && activeSearch.length > 0 && (
        <ItemWrapper>
          {activeSearch.map((item) => (
            <li key={item.id} onClick={() => handleClick(item)}>
              <FaMapMarkerAlt />
              {item.name}
            </li>
          ))}
        </ItemWrapper>
      )}
    </div>
  );
};

export default SearchInput;
