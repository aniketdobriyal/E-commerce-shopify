import Button from 'react-bootstrap/Button';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import Spinner from './Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
   
    const[cards,setcards] = useState([]);
    const[categories,setcategory] = useState([]);
    const [loading,setloading] = useState(true);


    function StarRating( rating ) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      
        return (
        
              <Card.Text className=' fw-bold text-muted' >
            {[...Array(fullStars)].map((_, i) => <FaStar key={i} color="gold" />)}
            {halfStar && <FaStarHalfAlt color="gold" />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} color="gray" />)}
            </Card.Text>
        );
      }


     useEffect(() => {
          
        async function fetchdata(){
            const data = await fetch('https://fakestoreapi.com/products');
            const parsedata = await data.json();
            setloading(false);
            setcards(parsedata);
          
            const data2 = await fetch('https://fakestoreapi.com/products/categories');
            const parsedata2 = await data2.json();
            setcategory(parsedata2)
          
         }
         fetchdata();
     
    }, []);


  return (

<div className='d-flex'>


    <div className=' my-3 w-100 d-flex flex-wrap gap-2 justify-content-center '>
     {loading?<Spinner/>:""}
  
{cards.map((card)=>(
    <div className=" border-1 border-secondary" key={card.id}>
    <Card style={{ width: '22vmax',height:'350px'}} >
      <Card.Img variant="top" className='object-fit-contain' src={card.image} style={{height:'30%'}} />
      <Card.Body>
        <Card.Title style={{fontSize:"15px",fontWeight:"bold"}} className='text-break'>{card.title.length<40?card.title:card.title.slice(0,40)+'...'}</Card.Title>
        <Card.Text className='text-break d-none d-md-block'>
         {card.description.split(" ").slice(0,3).join(" ")}...  
        </Card.Text>

      
        {StarRating(card.rating.rate)}
      
       

        <Card.Text className=' fw-bold text-muted' >
        ₹ {card.price}
        </Card.Text>
        <Button  as={Link} to={`/product/${card.id}`} variant="primary" style={{position:'absolute',bottom:"20px"}} >Buy now</Button>
      </Card.Body>
    </Card>
  
    </div>
))}

</div>


    </div>
  )

}

export default Products;