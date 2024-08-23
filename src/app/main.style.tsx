import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  margin: auto;
  background-color: ${(props) => props.theme.primary};
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
