import React from 'react'
export default function StaticNavbar() {
  return (
   
  <nav className="navbar navbar-expand-lg  navbar-dark position-sticky  z-3 " style={{height:"30px",top:"0px",background:'#818281'}}>
  <div className="container-fluid">
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">men's clothing</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">women's clothing</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">jewelery</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">electronics</a>
        </li>
      </ul>
    
    </div>
  </div>







</nav>
    


  )
}
