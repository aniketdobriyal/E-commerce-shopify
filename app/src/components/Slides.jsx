import Carousel from 'react-bootstrap/Carousel';
import StaticNavbar from './StaticNavbar';

function Slides() {
  return (
    <div className='position-relative '>
 
    <Carousel interval={3000} pause={false}>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src="images/pexels-cottonbro-7669359.jpg" // Replace with real image URL
            alt="First slide"
            />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img
            className="d-block w-100"
            src="images/pexels-anastasiya-gepp-654466-1462637.jpg" // Replace with real image URL
            alt="First slide"
            />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
      <img
            className="d-block w-100"
            src="images/pexels-elletakesphotos-1549200.jpg" // Replace with real image URL
            alt="First slide"
            />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
      </Carousel.Item>


    </Carousel>
            </div>
  );
}

export default Slides;