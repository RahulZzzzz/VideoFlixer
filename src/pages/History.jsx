import { useSidebar } from '@/components/ContextProvider/SidebarProvider'
import VideoHistoryCard from '@/components/VideoHistoryCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function History() {

  const url = import.meta.env.VITE_URL

  const {sidebarVisible,setSidebarVisible} = useSidebar()
  const [videos,setVideos] = useState([]);


  useEffect(()=>{

    setSidebarVisible(true)
    
    axios.get(`${url}/users/history`,{withCredentials: true})
      .then((res)=>{
        console.log(res);
        setVideos(res.data.data)
      })


  },[])

  return (
    <div>
      {(videos.length>0) && videos.map((video,i)=>(
        <VideoHistoryCard video={video} key={i}/>
      ))
      }
      {(videos.length==0) && (
        <div className=' font-semibold'>History is cleared</div>
      )}

    </div>
  )
}

export default History