import { useSidebar } from '@/components/ContextProvider/SidebarProvider'
import { SkeletonCard } from '@/components/SkeletonCard'
import VideoMainCard from '@/components/VideoMainCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function MyVideos() {

  const url = import.meta.env.VITE_URL

  const {sidebarVisible,setSidebarVisible} = useSidebar()
  const [videoFetched,setVideoFetched] = useState(false)
  const [videos,setVideos] = useState([])

  useEffect(()=>{

    setSidebarVisible(true)

    try {
      const res = axios.get(`${url}/video/myVideos`,{withCredentials: true})
        .then((resp)=>{
          console.log(resp.data.data);
          // console.log(4);
          setVideos(resp.data.data)
          // console.log(5);
          setVideoFetched(true)
        })
    } catch (error) {
      console.log(error);
    }
  },[])


  // console.log(res);
  // const st = 'hkaflds kfj adsh kffjdsahl f ajsdhf kjla n fdsljahf  hasd fho dskj fhu ad shfd hfuo ahhdhfa dshkfjsdhkjhd'

  return (
    <div className=' flex flex-wrap p-5 gap-4 justify-around'>
      
      {(videoFetched)?(<>{(videos.length!=0)?(() => {
          const options = [];

          for (let i = 0; i <= 4; i++) {
            options.push(
              
                videos.map((video,i)=>(
                  <VideoMainCard key={i} video={video}/>
                ))
              
              );
          }

          return options;
        })() 
          : 
          <div className=' text-3xl'>Add Video to your Profile</div>
          }
        </>)
        :
      (() => {
          const options = [];

          for (let i = 0; i <= 10; i++) {
            options.push(<SkeletonCard key={i} className=" w-[31%] h-[16rem] min-w-[16rem]"/>);
          }

          return options;
        })()}
    </div>
  )
}

export default MyVideos