import React, { useState, useEffect } from 'react'

const Description = ({info}) => {
  const [steps, setSteps] = useState([])

  useEffect(() => {
    setSteps(info.split('.'))
  }, [])

  return (
    <div>{steps.map((step, index)=> <p key={index}>{step}</p>)}</div>
  )
}

export default Description