import React from 'react'

export default function DOrders() {
  return (
    <div>
      <div className='flex flex-row justify-between align-middle'>
        <p>Orders</p>
        <div className='flex flex-row gap-2'>
          <input className='border px-2' type="search" placeholder='Search Order' name="" id="" />
          <button className='border'>Download</button>
          <button className='bg-purple-600'>Create Order</button>
        </div>
      </div>
    </div>
  )
}
