import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import ChannelCard from '@/components/ChannelCard'
import { useSidebar } from '@/components/ContextProvider/SidebarProvider'

function Subscription() {

  const url = import.meta.env.VITE_URL

  const userData = useSelector((state)=>(state.auth.userData))
  console.log(userData);
  const {sidebarVisible,setSidebarVisible} = useSidebar()
  const [channelFetched,setChannelFetched] = useState(false);
  const [channels,setChannels] = useState([])

  useEffect(()=>{
    setSidebarVisible(true)
    if(userData){
    const res = axios.get(`${url}/subscription/c/${userData._id}`,{withCredentials: true})
      .then((resp)=>{
        console.log(resp);
        setChannels(resp.data.data);
        setChannelFetched(true);
      })
    }
  },[])

  // const toggleSubscription = async(e,channelId)=>{
  //   e.preventDefault();
  //   console.log('sunscribed clicked');
  //   const res = axios.post(`${url}/subscription/c/${channelId}`,{},{withCredentials: true})
  //     .then((resp)=>{
  //       console.log(resp);
  //       console.log(resp.data.data);

  //     })
  // }

  return (<>
    {channelFetched?(<>
      {(channels.length!=0)?(<div className=' flex flex-col w-full mt-3 gap-4'>

        {channels.map((channel,i)=>(
          <Link to={`/profile/${channel._id}`} key={i}>
            <ChannelCard channel={channel}/>
          </Link>
        ))}

      </div>)
      :
        <div className=' text-3xl'>Subcribe the channels</div>
      }
    </>)
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

export default Subscription