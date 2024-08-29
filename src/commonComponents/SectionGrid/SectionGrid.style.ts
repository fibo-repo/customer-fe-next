import styled from "styled-components";

export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;

  @media (max-width: 1024px) {
    margin-right: -15px;
    margin-left: -15px;
  }
`;

export const GridColumn = styled.div<{
  columnWidth: string | number | (string | number)[];
}>`
  padding-right: 10px;
  padding-left: 10px;

  @media (max-width: 1024px) {
    padding-right: 15px;
    padding-left: 15px;
  }
`;
