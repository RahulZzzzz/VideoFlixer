import VideoCard from '@/components/VideoCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProfileVideos() {

  const url = import.meta.env.VITE_URL

  const [videoFetched,setVideoFetched] = useState(false)
  const [videos,setVideos] = useState([])

  const {userId} = useParams()

  useEffect(()=>{

    try {
      const res = axios.get(`${url}/video/myVideos?userId=${userId}`,{withCredentials: true})
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

  return (
    <div>
      {<>
        {(videos.length!=0)?(videos.map((video,i)=>(
          <VideoCard video={video} key={i}/>
        )))
        :
        <div className='text-[1rem] font-semibold'>Publish Videos from ManageVideos</div>
      }
      </>}
    </div>
  )
}

export default ProfileVideos