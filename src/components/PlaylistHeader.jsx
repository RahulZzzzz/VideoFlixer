import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function PlaylistHeader({img1,img2,img3,img4,name,ownerId,children}) {
    
  return (
            <div className=' absolute flex flex-row h-[90%] w-[90%] left-[3rem] top-2 gap-[5%]'>
              <div className=' h-full aspect-square flex flex-col'>
                <div className=' flex flex-row w-full'>
                  <img className=' w-[50%] aspect-square object-cover rounded-tl-lg' src={img1} alt="" />
                  <img className=' w-[50%] aspect-square object-cover' src={img2} alt="" />
                </div>
                <div className=' flex flex-row w-full'>
                  <img className=' w-[50%] aspect-square object-cover rounded-bl-lg' src={img3} alt="" />
                  <img className=' w-[50%] aspect-square object-cover' src={img4} alt="" />
                </div>
              </div>
              <div className=' flex flex-col h-[80%] justify-between gap-[20%]'>
                <Link to={`/profile/${ownerId}/`} className=' font-semibold text-6xl hover:underline cursor-pointer'>
                  {name}
                </Link>
                {children}
              </div>
            </div>
        
  )
}

export default PlaylistHeader