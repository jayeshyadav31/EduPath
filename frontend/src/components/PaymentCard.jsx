import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function PaymentCard({payment}) {
  const navigate=useNavigate()
  return (
    <div className='flex cursor-pointer border-gray-600 border-2 rounded-md mt-2 p-2 justify-evenly' onClick={()=>{navigate(`/paymentDetails/${payment?.payment_id}`)}}>
        <p className='ml-4'>{payment?.payment_date.substring(0,10)}</p>
        <p className='m-auto'>{payment?.payment_id.substring(0,30)}</p>
        <p>{payment?.status}</p>
    </div>
  )
}

export default PaymentCard