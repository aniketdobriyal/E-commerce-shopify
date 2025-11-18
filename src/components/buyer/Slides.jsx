import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Slides() {
  const slides = [
    {
      img: 'https://deebaco.com/cdn/shop/files/new_arrivals_-_hp_desk.jpg?v=1726056327&width=1100',
      title: 'Effortless Style',
      subtitle: 'Discover the Spring Collection',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/2463/7443/files/Ladies_Replica_Banner_1.4.1_1000x1000.jpg?v=1602064991',
      title: 'Luxury You Deserve',
      subtitle: 'Experience our Premium Fashion Range',
    },
    {
      img: 'https://www.verymuchindian.com/cdn/shop/files/3_eabc823d-b983-44fa-88cb-198ea72de7bb.png?v=1704548973',
      title: 'New Arrivals',
      subtitle: 'Trendy looks for every season',
    },
  ];

  return (
    <div className="hero-section ">
      <Carousel interval={3000} pause={false} indicators={true} controls={true}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index} style={{ maxHeight: '50vh' }}>
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

    {/*}        <Carousel.Caption
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

            */}
          </Carousel.Item>
        ))}


      </Carousel>
    </div>
  );
}

export default Slides;



