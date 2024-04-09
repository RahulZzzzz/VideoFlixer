import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from './ContextProvider/ThemeProvider';
import { DialogBox } from './DialogBox';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DialogClose } from './ui/dialog';
import axios from 'axios';

function VideoCard({video,isPlaylist=false,playlistId=''}) {

    const url = import.meta.env.VITE_URL;

    const [isDeleted,setIsDeleted] = useState(false)
    const {theme} = useTheme()
    let createdDate = new Date(video.createdAt);
    let currentDate = new Date();
    let timeDif = Math.abs(createdDate.getTime() - currentDate.getTime());
    let differentDays = Math.ceil(timeDif / (1000 * 3600 * 24));
    const duration = Math.floor(Number(video.duration));
    const min = (Math.floor(duration/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    const sec = (Math.floor(duration%60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

    const [isHovered,setIsHovered] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen((pre)=>(!pre));
    };

    const deleteHandler = ()=>{
        // console.log('data');
        axios.patch(`${url}/playlist/remove/${video._id}/${playlistId}`,{}, { withCredentials: true })
            .then((res)=>{
                console.log(res);
                setIsDeleted(true)
            })
    }
    

  return (
    <>
    {
        isDeleted ? (<></>) : 
        (<Link to={`/video/${video._id}`} 
        className={`relative flex flex-row w-full gap-4 p-2 rounded-lg ${(theme=='dark')?'hover:bg-zinc-700':'hover:bg-zinc-300'} duration-100`}
        onMouseEnter={()=>{setIsHovered(true)}}
        onMouseLeave={()=>{setIsHovered(false);setIsDropdownOpen(false)}}
    >
        
        <div className=' w-[14rem] min-w-[13rem] relative'>
            <img className=' w-full object-cover aspect-video rounded-xl' src={video.thumbnail} alt="" />
            <div className='absolute bottom-1 right-2 text-zinc-200 font-medium bg-zinc-950 bg-opacity-70 px-1 rounded-sm'>{`${min}:${sec}`}</div>
        </div>
        <div className=' flex flex-col gap-4 items-start ' >
            <div className=' font-[500] text-[18px] text-left'>{video.title}</div>
            <div className={` flex flex-row flex-wrap items-center gap-3 text-[16px] ${(theme=='dark')?'text-neutral-300':'text-neutral-800'}`}>
                <Link to={`/profile/${video.owner}`} className=' flex flex-row items-center gap-1'>
                    <img className=' w-[1.5rem] aspect-square rounded-full' src={video.ownerAvatar} alt="" />
                    <div className=' hover:underline'>{video.ownerName}</div>
                </Link>
                <div className=' flex'>
                    <div className=' '>• {video.views} views</div>
                    <div>• {differentDays} days ago</div>
                </div>
            </div>
        </div>
        {isHovered && (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <div
            className="cursor-pointer hover:bg-neutral-500 text-xl h-min w-[30px] rounded-full flex items-center justify-center"
            onClick={(e)=>{ e.preventDefault(); handleDropdownToggle()}}
          >
            ⋮
          </div>
          {(isDropdownOpen && isPlaylist) && (
            <div className="absolute right-0 mt-2 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
              
              <div onClick={(e)=>{e.preventDefault()}}>
              <DialogBox
                title={"Remove Video from Playlist"}
                description={"Can't be undone"}
                trigger={`Remove`}
                className={`w-full bg-neutral-800 text-white hover:bg-neutral-600`}
              >

                <form>
                  <div className="flex gap-4 py-4">
                    
                    <Button onClick={deleteHandler} className='justify-self-end w-[30%] bg-red-600 hover:bg-red-700 text-white'><DialogClose>Delete Playlist</DialogClose></Button>
                    <Button className='justify-self-end w-[30%]'><DialogClose>Cancel</DialogClose></Button>
                  </div>
                </form>

              </DialogBox>
              </div>
            </div>
          )}
        </div>
        )}
    </Link>)}
    </>
  )
}

export default VideoCard