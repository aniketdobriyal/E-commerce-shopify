import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Slides() {
  const slides = [
    {
      img: 'images/Gemini_Generated_Image_jxxvpzjxxvpzjxxv.png',
      title: 'Effortless Style',
      subtitle: 'Discover the Spring Collection',
    },
    {
      img: 'images/Gemini_Generated_Image_ed4wkfed4wkfed4w.png',
      title: 'Luxury You Deserve',
      subtitle: 'Experience our Premium Fashion Range',
    },
    {
      img: 'images/fashionable-clothes-hanging-hanger-generative-ai_220873-19121.png',
      title: 'New Arrivals',
      subtitle: 'Trendy looks for every season',
    },
  ];

  return (
    <div className="hero-section ">
      <Carousel interval={3000} pause={false} indicators={true} controls={true}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index} style={{ maxHeight: '60vh' }}>
            <img
              className="d-block w-100"
              src={slide.img}
              alt={slide.title}
              style={{
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(80%)',
              }}
            />

            <Carousel.Caption
              className="text-start"
              style={{
                top: '40%',
                left: '10%',
                transform: 'translateY(-50%)',
                maxWidth: '480px',
                textAlign: 'left',
              }}
            >
              <h1
                className="d-none d-sm-block display-5 fw-bolder text-white mb-2"
                style={{ textShadow: '0 2px 5px rgba(0,0,0,0.4)' }}
              >
                {slide.title}.
              </h1>
              <h4
                className="d-block d-sm-none fw-bolder text-white mb-2"
                style={{ textShadow: '0 2px 5px rgba(0,0,0,0.4)' }}
              >
                {slide.title}.
              </h4>

              <p
                className="lead mb-2 text-white d-none d-sm-block"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
              >
                {slide.subtitle}
              </p>

            <Button
  variant="success"
  size="sm"
  className="rounded-4 text-uppercase fw-bold"
  as={Link}
  to="/shop"
  style={{ padding: '0.25rem 0.6rem', fontSize: '0.9rem' }}
>
  Shop Now
</Button>

            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slides;



