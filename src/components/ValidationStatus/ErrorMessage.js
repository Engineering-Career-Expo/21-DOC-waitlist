import React from 'react'


const ErrorMessage = ({message}) => {
  return (
    <p className='text-red-500 mt-[0.5rem] text-xs'>{message}</p>
  )
}

export default ErrorMessage