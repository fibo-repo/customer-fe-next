import React from "react";
import SectionTitleWrapper, { TitleWrapper, LinkWrapper } from "./Title.style";

// Define the props interface
interface SectionTitleProps {
  className?: string; // Optional className for additional styles
  title?: React.ReactNode; // Optional React element for the title (e.g., Heading)
  link?: React.ReactNode; // Optional React element for the link (e.g., TextLink)
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  className,
  title,
  link,
  ...props
}) => {
  // Add all classes to an array
  const addAllClasses = ["section_title"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <SectionTitleWrapper className={addAllClasses.join(" ")} {...props}>
      {title && <TitleWrapper className="title_wrapper">{title}</TitleWrapper>}
      {link && <LinkWrapper className="link_wrapper">{link}</LinkWrapper>}
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
