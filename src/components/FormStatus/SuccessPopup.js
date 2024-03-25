import React, { useEffect } from 'react' 
import { FaXmark } from 'react-icons/fa6'
import success from '../../../public/success.webp'
import Image from 'next/image'

const SuccessPopup = ({display, close}) => {

  useEffect(() => {
    display ? (document.body.style.overflow = 'hidden') :(document.body.style.overflow = 'auto')
  }, [display])


  return (
    <div className={`${display ? 'flex' : 'hidden'}  fixed top-0 left-0 bg-black/30 w-screen h-screen  items-center justify-center`}>
     <div className='relative w-[85%] max-w-[400px] pb-8 bg-white shadow-lg flex flex-col rounded-md'>
      <div className='w-fit ml-auto h-fit mt-1 mr-1 cursor-pointer' onClick={close}>
       <FaXmark className='text-black text-[2rem]'/>
      </div>
      <div className='relative w-36 h-36 mx-auto mt-3'>
       <Image alt='succesImage' src={success} className='object-fit' fill={true}  />
      </div>
      <h3 className='mt-6 text-center text-xl font-inter px-2'>You're now registered for the 21 Days Of Code and Design, sit back and sharpen your knifes (PC). It will be a fun ride</h3>
     </div>
    </div>
  )
}

export default SuccessPopup