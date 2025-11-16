import React from 'react'

export default function Spinner() {
  return (
    <div className='position-fixed   d-flex justify-content-center align-items-center' style={{height:'100%',width:'100%'}}>
      <div >
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    </div>
  )
}
