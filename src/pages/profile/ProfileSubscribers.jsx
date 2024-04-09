import ChannelCard from '@/components/ChannelCard';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ProfileSubscribers() {

    const url = import.meta.env.VITE_URL

    const {userId} = useParams();

    const [channelFetched,setChannelFetched] = useState(false);
    const [channels,setChannels] = useState([])

  useEffect(()=>{
    
    try {
        const res = axios.get(`${url}/subscription/u/${userId}`,{withCredentials: true})
          .then((resp)=>{
            console.log(resp);
            setChannels(resp.data.data);
            setChannelFetched(true);
            console.log(resp.data.data.length);
          })
    } catch (error) {
        console.log(error);
    }
    
  },[])

  return (<>
    {channelFetched?(
      <div className=' flex flex-col w-full mt-5 gap-4 '>

        {(channels.length!=0) && channels.map((channel,i)=>(
          <Link to={`/profile/${channel._id}/`} key={i}>
            <ChannelCard channel={channel}/>
          </Link>
        ))}
        {(channels.length==0) && (
          <div className=' font-semibold'>You have 0 subscriber</div>
        )}

      </div>
    )
    :
    (
    <div className=' flex flex-col w-full mt-3 gap-4'>

      <div className=' flex flex-row w-full gap-2'>
        <div className=' w-[12%] ' >
          <Skeleton className='w-full aspect-square rounded-full'/>
        </div>
        <div className=' flex flex-col w-[80%] gap-2 mt-3'>
          {/* <div className=' w-full h-full'> */}
            <Skeleton className=' w-[40%] h-[25%]'/>
          {/* </div> */}
          {/* <div> */}
            <Skeleton className=' w-full h-[20%]'/>
          {/* </div> */}
          <div className=' flex flex-row w-full mt-2 h-[20%] gap-6'>
            {/* <div> */}
              <Skeleton className=' w-[15%] h-full'/>
            {/* </div> */}
            {/* <div> */}
              <Skeleton />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className=' flex flex-row w-full gap-2'>
        <div className=' w-[12%] ' >
          <Skeleton className='w-full aspect-square rounded-full'/>
        </div>
        <div className=' flex flex-col w-[80%] gap-2 mt-3'>
          {/* <div className=' w-full h-full'> */}
            <Skeleton className=' w-[40%] h-[25%]'/>
          {/* </div> */}
          {/* <div> */}
            <Skeleton className=' w-full h-[20%]'/>
          {/* </div> */}
          <div className=' flex flex-row w-full mt-2 h-[20%] gap-6'>
            {/* <div> */}
              <Skeleton className=' w-[15%] h-full'/>
            {/* </div> */}
            {/* <div> */}
              <Skeleton />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className=' flex flex-row w-full gap-2'>
        <div className=' w-[12%] ' >
          <Skeleton className='w-full aspect-square rounded-full'/>
        </div>
        <div className=' flex flex-col w-[80%] gap-2 mt-3'>
          {/* <div className=' w-full h-full'> */}
            <Skeleton className=' w-[40%] h-[25%]'/>
          {/* </div> */}
          {/* <div> */}
            <Skeleton className=' w-full h-[20%]'/>
          {/* </div> */}
          <div className=' flex flex-row w-full mt-2 h-[20%] gap-6'>
            {/* <div> */}
              <Skeleton className=' w-[15%] h-full'/>
            {/* </div> */}
            {/* <div> */}
              <Skeleton />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className=' flex flex-row w-full gap-2'>
        <div className=' w-[12%] ' >
          <Skeleton className='w-full aspect-square rounded-full'/>
        </div>
        <div className=' flex flex-col w-[80%] gap-2 mt-3'>
          {/* <div className=' w-full h-full'> */}
            <Skeleton className=' w-[40%] h-[25%]'/>
          {/* </div> */}
          {/* <div> */}
            <Skeleton className=' w-full h-[20%]'/>
          {/* </div> */}
          <div className=' flex flex-row w-full mt-2 h-[20%] gap-6'>
            {/* <div> */}
              <Skeleton className=' w-[15%] h-full'/>
            {/* </div> */}
            {/* <div> */}
              <Skeleton />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className=' flex flex-row w-full gap-2'>
        <div className=' w-[12%] ' >
          <Skeleton className='w-full aspect-square rounded-full'/>
        </div>
        <div className=' flex flex-col w-[80%] gap-2 mt-3'>
          {/* <div className=' w-full h-full'> */}
            <Skeleton className=' w-[40%] h-[25%]'/>
          {/* </div> */}
          {/* <div> */}
            <Skeleton className=' w-full h-[20%]'/>
          {/* </div> */}
          <div className=' flex flex-row w-full mt-2 h-[20%] gap-6'>
            {/* <div> */}
              <Skeleton className=' w-[15%] h-full'/>
            {/* </div> */}
            {/* <div> */}
              <Skeleton />
            {/* </div> */}
          </div>
        </div>
      </div>
        
      <div>

      </div>
    </div>
    
      
    )}
    </>
  )
}

export default ProfileSubscribers