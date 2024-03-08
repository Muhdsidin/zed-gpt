import React from 'react'
import "./Response.css"

function Response({response}) {
  return (
    <div className='response'>
        <p>
            {response}
        </p>
    </div>
  )
}

export default Response