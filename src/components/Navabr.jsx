import React from 'react'

function Navabr() {
  return (
    <div>
        <div className='flex justify-between text-white p-4 bg-gray-500'>
            <div className='text-white'>
               <span className='font-bold cursor-pointer'>I.Shubh</span>
            </div>
            <ul className='flex gap-3 cursor-pointer'>
                <li>Home</li>
                <li>Contect us</li>
            </ul>
        </div>
    </div>
  )
}

export default Navabr