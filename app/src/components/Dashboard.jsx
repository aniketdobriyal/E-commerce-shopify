import React from 'react'
import Navbar from './Navbar'
import Slides from './Slides'
import Products from './Products'

import StaticNavbar from './StaticNavbar'

export default function Dashboard() {

  return (
    <div>
     
      <Navbar/>
       <Slides/>
       <Products/>
    </div>
  )
}
