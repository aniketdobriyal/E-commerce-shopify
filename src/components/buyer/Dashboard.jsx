import React from 'react'
import Navbar from './Navbar'
import Slides from './Slides'
import Products from './Products'
import Footer from './Footer'
import ProductQueue from './ProductQueue'

export default function Dashboard() {

  return (
    <div>
     
      <Navbar/>
      
       <Slides/>
       <ProductQueue/>
       <Products/>
       <Footer/>
       
    </div>
  )
}
