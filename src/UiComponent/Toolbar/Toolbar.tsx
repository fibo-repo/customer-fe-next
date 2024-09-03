// components/Toolbar.tsx

import React from 'react';
import Wrapper, { Container, LeftSide, RightSide } from './toolbar.style';

// Define the type for the props
interface ToolbarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

// Convert the function component to TypeScript with props
const Toolbar: React.FC<ToolbarProps> = ({ left, right, className, children }) => {
  const addAllClasses = ['toolbar'];
  
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <Wrapper className={addAllClasses.join(' ')}>
      <Container>
        {left && <LeftSide className="toolbar_left__side">{left}</LeftSide>}
        {right && <RightSide className="toolbar_right__side">{right}</RightSide>}
        {children && children}
      </Container>
    </Wrapper>
  );
}

export default Toolbar;
