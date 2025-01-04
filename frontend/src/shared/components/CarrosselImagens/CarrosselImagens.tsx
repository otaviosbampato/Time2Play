import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "./CarrosselImagens.module.css"; // Importando as classes CSS

interface ImageCarouselProps {
  images: File[];
  onRemoveImage: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onRemoveImage,
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (images.length === 0) return null;

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      containerClass={styles.carouselContainer} // Usando styles.className
      draggable
      focusOnSelect={false}
      infinite
      keyBoardControl
      minimumTouchDrag={80}
      responsive={responsive}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {images.map((imagem, index) => (
        <div className={styles.carouselImage} key={index}> {/* Usando styles.className */}
          <img
            src={URL.createObjectURL(imagem)}
            alt={`Quadra ${index + 1}`}
            className={styles.carouselImg} // Usando styles.className
          />
          <button className={styles.removeImage} onClick={() => onRemoveImage(index)}>
            &times;
          </button>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
