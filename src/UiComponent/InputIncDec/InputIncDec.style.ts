import styled from 'styled-components';

const InputIncDecWrapper = styled.div`
  width: 104px;
  height: 32px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  input[type='number'] {
    width: calc(100% - 54px);
    position: absolute;
    left: 27px;
    top: 0px;
    margin-top: -5px;
    padding: 0px;
    border: 0;
    text-align: center;
    background-color: transparent;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  button {
    border: 0;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    position: absolute;
    top: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    justify-content: center;

    &.decBtn {
      left: 0;
    }
    &.incBtn {
      right: 0;
    }

    &:hover,
    &:focus {
      outline: 0;
    }
  }
`;

export default InputIncDecWrapper;
