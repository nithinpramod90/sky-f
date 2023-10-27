import React from 'react'

function LivenowTab({color,name,time}) {
    
  return (
    <div>
        <div className='py-4 pr-2 flex justify-between text-sm overflow-hidden'>
          <div className='flex gap-2 items-center'>
          <div className={`rounded-full w-[10px] h-[10px] bg-${color} mt-[2px]`}></div>
          <h1 className=' font-bold'>{name}</h1>
          </div>
        
          <h1 className=' font-bold'>{time}</h1>
        </div>
    </div>
  )
}

export default LivenowTab
