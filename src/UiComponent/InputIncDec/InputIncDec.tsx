import React from "react";
import { Input } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import InputIncDecWrapper from "./InputIncDec.style";
import { InputProps } from "antd/es/input";

interface InputIncDecProps extends Omit<InputProps, "size"> {
  className?: string;
  increment: () => void;
  decrement: () => void;
  value: number | undefined;
}

const InputIncDec: React.FC<InputIncDecProps> = ({
  className,
  increment,
  decrement,
  value,
  ...restProps
}) => {
  const addAllClasses = ["quantity"];
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <InputIncDecWrapper className={addAllClasses.join(" ")}>
      <button className="btn decBtn" type="button" onClick={decrement}>
        <MinusOutlined />
      </button>
      <Input className="qnt-input" type="number" value={value} {...restProps} />
      <button className="btn incBtn" type="button" onClick={increment}>
        <PlusOutlined />
      </button>
    </InputIncDecWrapper>
  );
};

export default InputIncDec;
