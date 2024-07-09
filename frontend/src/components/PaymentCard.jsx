import React from 'react'

function PaymentCard({payment}) {
    // console.log(payment);
  return (
    <div className='flex cursor-pointer border-gray-600 border-2 rounded-md mt-2 p-2 justify-evenly'>
        <p className='ml-4'>{payment?.payment_date.substring(0,10)}</p>
        <p className='m-auto'>{payment?.payment_id.substring(0,30)}</p>
        <p>{payment?.status}</p>
    </div>
  )
}

export default PaymentCard