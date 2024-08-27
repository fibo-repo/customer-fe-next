import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ItemWrapper = styled.div`
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  gap: 15px;

  &:hover {
    background-color: #e0e0e0;
  }

  strong {
    font-size: 15px;
    font-weight: 400;
    color: ${themeGet("text.0", "#2C2C2C")};
  }
`;
