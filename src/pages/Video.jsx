import ChannelCard from '@/components/ChannelCard';
import { useSidebar } from '@/components/ContextProvider/SidebarProvider'
import VideoCard from '@/components/VideoCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Wblike from "../components/assets/Wblike.png"
import Walike from "../components/assets/Walike.png"
import Balike from "../components/assets/Balike.png"
import Bblike from "../components/assets/Bblike.png"
import { Button } from '@/components/ui/button';
import CommentCard from '@/components/CommentCard';
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader/Loader.jsx';
import { useTheme } from '@/components/ContextProvider/ThemeProvider';

function Video() {

    const url = import.meta.env.VITE_URL

    const {theme} = useTheme()

    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1);
   
    const {sidebarVisible,setSidebarVisible} = useSidebar();
    const {videoId} = useParams()
    const [video,setVideo] = useState()
    const [videoFetched,setVideoFetched] = useState(false)
    const [sideVideo,setSideVideo] = useState()
    const [sideVideoFetched,setSideVideoFetched] = useState(false)
    const [channel,setChannel] = useState();
    const [channelFetched,setChannelFetched] = useState(false)
    const [comments,setComments] = useState([]);
    const [myComment,setMyComment] = useState('');
    const [isLiked,setIsLiked] = useState(false);
    const userData = useSelector((state)=>(state.auth.userData))
    const [alike,setAlike] = useState();
    const [blike,setBlike] = useState();
     

    

    useEffect(()=>{
        setSidebarVisible(false);
        setComments([])

        axios.get(`${url}/video/${videoId}`,{withCredentials:true})
            .then((res)=>{
                console.log(res);
                setVideo(res.data.data)
                setVideoFetched(true)
                if(res.data.data.isLiked)setIsLiked(true) 
                axios.patch(`${url}/video/views/${videoId}`,{},{withCredentials:true})
                    .then((resp)=>{
                        console.log(resp);

                    })

                axios.get(`${url}/users/c/${res.data.data.owner}`,{withCredentials:true})
                    .then((resp)=>{
                        console.log(resp);
                        setChannel(resp.data.data)
                        setChannelFetched(true)
                    })

            })

        axios.get(`${url}/video`,{withCredentials:true})
            .then((res)=>{
                console.log(res);
                setSideVideo(res.data.data)
                setSideVideoFetched(true)
            })

            if(theme=='light'){
                setAlike(Balike)
                setBlike(Bblike)
            }else{
                setAlike(Walike)
                setBlike(Wblike)
            }

        return ()=>{
            setSidebarVisible(true)
        }

        

    },[videoId])

    const getComments = async()=>{
        axios.get(`${url}/comment/${videoId}?page=${page}`,{withCredentials:true})
            .then((resp)=>{
                console.log(resp);
                setLoading(false)
                setComments((pre)=>[...pre,...resp.data.data])
            })
    }

    const handleInfiniteScroll = async()=>{
        if(window.innerHeight+document.documentElement.scrollTop+1>= document.documentElement.scrollHeight){
            setLoading(true)
            setPage((pre)=>(pre+1))
        }
    }

    useEffect(()=>{
       
        getComments();
        

    },[videoId,page])


    useEffect(()=>{
        window.addEventListener("scroll",handleInfiniteScroll)
        return ()=>{window.removeEventListener("scroll",handleInfiniteScroll)}
    },[])

    useEffect(()=>{
        axios.get(`${url}/video/${videoId}`,{withCredentials:true})
            .then((res)=>{
                console.log(res);
                setVideo(res.data.data)
                // setVideoFetched(true)
                if(res.data.data.isLiked)setIsLiked(true) 
            })
    },[isLiked])

    const likeHandler = async()=>{
        
        axios.post(`${url}/like/toggle/v/${videoId}`,{},{withCredentials:true})
            .then((res)=>{
                console.log(res);
                setIsLiked((pre)=>(!pre));
            })
    }

    const addCommentHandler = async()=>{

        axios.post(`${url}/comment/${videoId}`,{content:myComment},{withCredentials:true})
            .then((res)=>{
                console.log(res);
                setComments((pre)=>([
                                        {
                                            content:myComment,
                                            video: videoId,
                                            owner: userData._id,
                                            createdAt: 0,
                                            ownerName: userData.fullName,
                                            ownerUsername: userData.username,
                                            ownerAvatar: userData.avatar
                                        },
                                        ...pre
                                    ]));
                setMyComment('')
            })
        
    }

    

  return (
    <>
    {videoFetched?(<div className=' flex w-full flex-wrap gap-5 justify-center'>
        <div className=' flex flex-col w-[56%] min-w-[300px] max-[600px]:w-[100%]'>
            <div className=''>
                <video className=' w-full aspect-video' src={video.videoFile} controls></video>
                <div className=' flex flex-col'>
                    <div className=' self-start font-semibold text-xl'>
                        {video?.title}
                    </div>
                    <div className=' self-end flex mr-8'>
                        <div className=' flex justify-end items-end gap-2'>
                            <button onClick={likeHandler} className='self-start '>
                                <img className=' w-[30px] aspect-square' src={isLiked?alike:blike} alt="" />
                            </button>
                            <div className=' text-2xl'>{video.likes}</div>
                        </div>
                        {/* <div>dislike</div> */}
                    </div>
                    
                </div>
                <div className=' mt-4 flex flex-col'>

                    <div>
                        {channelFetched?
                            (
                                <Link to={`/profile/${channel._id}`}>
                                    <ChannelCard channel={channel}/>
                                </Link>
                            )
                            :
                            (<></>)
                        }
                    </div>
                    <div className=' self-start ml-2'>
                        {video.description}
                    </div>
                </div>
            </div>
            <div>
                <div className=' w-full flex justify-start items-center'>
                    <label htmlFor="addComment" className=' font-semibold text-[1.2rem]'>Comment : </label>
                    <input type="text" id='addComment' placeholder='Add Comment'
                        className={`bg-transparent p-2 m-2 grow border-b-[1px] ${(theme=='light')?'border-black':'border-white'}  focus-visible:outline-none`} 
                        value={myComment}
                        onChange={(e)=>{setMyComment(e.target.value);console.log(myComment);}}
                    />
                    <Button className=' my-[0.6rem] py-2' onClick={addCommentHandler}>Add</Button>
                </div>
                <div className=' mt-4 flex flex-col gap-4'>
                {comments.map((comment,i)=>(
                    <CommentCard key={i} comment={comment}></CommentCard>
                ))}
                </div>
                {loading && <div className='flex items-center justify-center mt-6'>
                    <Loader/>
                </div>}
            </div>
        </div>
        <div className=' flex flex-col w-[30%]'>
            {
                sideVideoFetched ?
                (   <>
                    {
                        sideVideo.map((video,i)=>{
                          return (
                            <VideoCard video={video} key={i}/>
                        )})
                    }
                    {
                        sideVideo.map((video,i)=>{
                          return (
                            <VideoCard video={video} key={i}/>
                        )})
                    }
                    {
                        sideVideo.map((video,i)=>{
                          return (
                            <VideoCard video={video} key={i}/>
                        )})
                    }
                    </>
                ):
                (
                    <></>
                )
            }
        </div>
    </div>):null}
    </>
  )
}

export default Video