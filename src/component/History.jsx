import React from 'react'
import p2 from '../assets/p2.png'

// History component to display a single history record card
export const History = () => {
  return (
    <div>
      {/* Card container with gradient background and styling */}
      <div className='bg-gradient-to-br to-[#1d1e29] via-[#1e1e1e] from-[#2c2c2c] w-[300px] h-[116px] rounded-lg shadow-md px-3 py-2 text-white text-[9px] flex flex-row items-start gap-3'>
        
        {/* Image section */}
        <div className='flex justify-between items-start px-1 pt-1'>
          <img src={p2} alt="Item" />
        </div>
        
        {/* Text content */}
        <div className='flex flex-col justify-center items-start mt-2'>
          <span className='text-[16px] font-semibold text-left'>
            Pistol {/* Item name */}
          </span>
          <span className='text-[12px] text-gray-400'>
            2024-06-17 12:00 {/* Timestamp */}
          </span>
        </div>
      </div>
    </div>
  )
}
