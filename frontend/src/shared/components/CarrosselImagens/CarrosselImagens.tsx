import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "./CarrosselImagens.module.css";

interface ImageCarouselProps {
  images: Image[] | File[];
  onRemoveImage: (index: number) => void;
  title?: string; 
}

interface Image {
  url: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onRemoveImage,
  title,
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

  // Função para obter URLs das imagens
  const getImageUrls = (images: Image[] | File[]): string[] => {
    return images.map((image) => {
      if (image instanceof File) {
        return URL.createObjectURL(image); // Para File[]
      } else {
        return image.url; // Para Image[]
      }
    });
  };

  const imageUrls = getImageUrls(images);

  if (imageUrls.length === 0) return null;

  return (
    <div className={styles.carouselWrapper}>
      {title && <h3 className={styles.carouselTitle}>{title}</h3>}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass={styles.carouselContainer}
        draggable
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        responsive={responsive}
        showDots={false}
        swipeable
      >
        {imageUrls.map((url, index) => (
          <div className={styles.carouselItem} key={index}>
            <img
              src={url}
              alt={`Imagem ${index + 1}`}
              className={styles.carouselImg}
            />
            <button
              className={styles.removeImage}
              onClick={() => onRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
