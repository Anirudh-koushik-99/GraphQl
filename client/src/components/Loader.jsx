import React from 'react'

const Loader = () => {
  return (
    <div className='d-flex justifyContent-center'>
        <div className='spinner-border' role='status'>
            <span className='sr-only'></span>
        </div>
    </div>
  )
}

export default Loader
