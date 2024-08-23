import React, { Fragment, useEffect, ReactNode } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import GlideWrapper, {
  GlideSlideWrapper,
  ButtonControlWrapper,
  ButtonWrapper,
  BulletControlWrapper,
  BulletButton,
  DefaultBtn,
} from "./GlideCarousel.style";

interface GlideCarouselProps {
  className?: string;
  children: ReactNode;
  options?: object;
  controls?: boolean;
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  bullets?: boolean;
  numberOfBullets?: number;
  carouselSelector?: string;
}

interface GlideSlideProps {
  children: ReactNode;
}

const GlideCarousel: React.FC<GlideCarouselProps> = ({
  className,
  children,
  options,
  controls = true,
  prevButton,
  nextButton,
  bullets,
  numberOfBullets,
  carouselSelector,
}) => {
  // Add all classs to an array.
  const addAllClasses = ["glide"];

  // className prop checking.
  if (className) {
    addAllClasses.push(className);
  }

  // number of bullets loop.
  const totalBullets = [];
  for (let i = 0; i < (numberOfBullets || 0); i++) {
    totalBullets.push(i);
  }

  // Load glide.
  useEffect(() => {
    const glide = new Glide(
      carouselSelector ? `#${carouselSelector}` : "#glide",
      {
        ...options,
      }
    );
    glide.mount();
  }, [carouselSelector, options]);

  return (
    <GlideWrapper
      className={addAllClasses.join(" ")}
      id={carouselSelector || "glide"}
    >
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">{children}</ul>
      </div>

      {controls && (
        <ButtonControlWrapper
          className="glide__controls"
          data-glide-el="controls"
        >
          <ButtonWrapper className="glide__prev--area" data-glide-dir="<">
            {prevButton ? prevButton : <DefaultBtn>Prev</DefaultBtn>}
          </ButtonWrapper>
          <ButtonWrapper className="glide__next--area" data-glide-dir=">">
            {nextButton ? nextButton : <DefaultBtn>Next</DefaultBtn>}
          </ButtonWrapper>
        </ButtonControlWrapper>
      )}

      {bullets && (
        <BulletControlWrapper
          className="glide__bullets"
          data-glide-el="controls[nav]"
        >
          <Fragment>
            {totalBullets.map((index) => (
              <BulletButton
                key={index}
                className="glide__bullet"
                data-glide-dir={`=${index}`}
              />
            ))}
          </Fragment>
        </BulletControlWrapper>
      )}
    </GlideWrapper>
  );
};

// Glide Slide wrapper component.
const GlideSlide: React.FC<GlideSlideProps> = ({ children }) => {
  return (
    <GlideSlideWrapper className="glide__slide">{children}</GlideSlideWrapper>
  );
};

export { GlideSlide };

export default GlideCarousel;
