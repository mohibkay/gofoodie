import React, { useState, useEffect, useRef } from "react";
import slides from "../utils/data";
import Header from "./Header";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const currentIndex = useRef(0);
  const timeoutRef = useRef();
  const totalSlides = slides.length;

  const handleBulletClick = (index) => {
    currentIndex.current = index;
    setCurrent(index);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(function showNextSlide() {
      let value = currentIndex.current;

      if (currentIndex.current === totalSlides - 1) {
        value = 0;
      } else {
        value += 1;
      }

      currentIndex.current = value;
      handleBulletClick(currentIndex.current);

      timeoutRef.current = setTimeout(showNextSlide, 2000);
    }, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [totalSlides]);

  return (
    <div>
      <section className="carousel-section">
        <Header />
        {slides.map((slide, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${slide.image})`,
                display: `${index === current ? "block" : "none"}`,
              }}
              className="slider"
            >
              <div className="image-text">
                <div className="image-main-text">{slide.mainText}</div>
                <div className="divider">
                  <img src="/images/separator.png" alt="Separator" />
                </div>
                <div className="image-sub-text">{slide.subText}</div>
                <a href="#menu-section" className="action-btn">
                  order now
                </a>
              </div>
              <div className="slide-bullets">
                {[...Array(totalSlides).keys()].map((_, id) => (
                  <div
                    key={id}
                    className={
                      id === current ? "slide-bullet active" : "slide-bullet"
                    }
                    onClick={() => handleBulletClick(id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Carousel;
