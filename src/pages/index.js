import { HiOutlineMail } from 'react-icons/hi'
import Form from '@/components/Form'
import Logo from '../../public/ecxLogo.webp'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import SuccessPopup from '@/components/FormStatus/SuccessPopup'

export default function Home() {
  const [formStatus, setformStatus] = useState({
    loading: false,
    error:false,
  })
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  function success(){
    setformStatus(prev => {
      return {
        ...prev,
        loading: false
      }
    })
    setShowSuccessPopup(true)
  }
  function errorOccured(){
    setformStatus(prev => {
      return {
        ...prev,
        error: true,
        loading: false
      }
    })
  }
  function loading(){
    setformStatus(prev => {
      return {
        ...prev,
        error: false,
        loading: true
      }
    })
  }
  // function resetForm(){
  //   setformStatus({
  //     loading: false,
  //     error: false,
  //     success: false
  //   })
  // }
  function closePopup(){
    setShowSuccessPopup(false)
  }
 
  return (
    <main className={`mx-6  lg:mx-[5%] pt-6 `}>
      <Head>
        <title>ECX 21 DOC Waitlist</title>
      </Head>
      <div>
       <Image src={Logo} width={157.41} height={49.3} alt='Logo' />
      </div>
      <section className='mt-[3.5rem] font-inter md:max-w-[700px] md:mx-auto' >
          <h2 className='text-4xl font-varela font-normal text-center  capitalize
           '>21 Days Of Code and Design</h2>
           <p className='mt-3 text-center font-inter'>Register to participate in the 21 Days Of Code and Design, cohort 4.0. Fill out this form with your correct detail.</p>
           <Form 
            success={success}
            errorOccured={errorOccured}
            processing={loading}
            formStatus={formStatus}
          />
          <SuccessPopup  
            close={closePopup}
            display={showSuccessPopup}
          />
      </section>
   </main> 
  )
}
