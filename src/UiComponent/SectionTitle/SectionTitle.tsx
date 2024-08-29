import React from "react";
import SectionTitleExtended from "../Title/Title";
import SectionTitleWrapper from "./SectionTitle.style";

// Define the props interface
interface SectionTitleExtendedProps {
  title?: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleExtendedProps> = ({ ...props }) => {
  return (
    <SectionTitleWrapper>
      <SectionTitleExtended {...props} />
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
