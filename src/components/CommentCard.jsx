import React, { useState } from 'react'
import { useTheme } from './ContextProvider/ThemeProvider'

function CommentCard({comment}) {

  const {theme} = useTheme()

  return (
    <div className=' flex '>
        <div>
            <img src={comment?.ownerAvatar} className=' w-[2.5rem] aspect-square rounded-full' alt="" />
        </div>
        <div className=' ml-4 flex flex-col items-start'>
            <div className={`${(theme=='light')?'text-neutral-700':'text-neutral-300'}`}>{comment?.ownerName}</div>
            <div className=' ml-2'>{comment?.content}</div>
        </div>
    </div>
  )
}

export default CommentCard