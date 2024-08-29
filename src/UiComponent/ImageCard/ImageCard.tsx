"use client";

import React from "react";
import ImageCardWrapper, {
  ContentWrapper,
  Title,
  Meta,
} from "./ImageCard.style";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ImageCardProps {
  className?: string;
  imageSrc: string | StaticImageData;
  title?: string;
  meta?: string;
  cityId?: string | number;
  zoneIds?: string;
  startDate?: string;
  endDate?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  className = "",
  imageSrc,
  title,
  meta,
  cityId = "",
  zoneIds = "",
  startDate = "",
  endDate = "",
}) => {
  // Add all classes to an array
  const addAllClasses = ["image_card"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <ImageCardWrapper className={addAllClasses.join(" ")}>
      <Link
        href={`/listing?date_range=${startDate},${endDate}&guest=2&cityId=${cityId}&zoneIds=${zoneIds}`}
      >
        <Image src={imageSrc} alt={title || "Image"} width={300} height={200} />
        <ContentWrapper>
          {title && <Title>{title}</Title>}
          {meta && <Meta>{meta}</Meta>}
        </ContentWrapper>
      </Link>
    </ImageCardWrapper>
  );
};

export default ImageCard;
