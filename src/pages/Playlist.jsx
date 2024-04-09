import { DialogBox } from '@/components/DialogBox';
import PlaylistHeader from '@/components/PlaylistHeader'
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import noPlaylist from "../components/assets/noPlaylist1.png"

function Playlist() {

    const url = import.meta.env.VITE_URL

    const {register,handleSubmit} = useForm()
    const {playlistId} = useParams();
    const [col,setCol] = useState();
    const [con,setCon] = useState(false)
    const [playlistFetched,setPlaylistFetched] = useState(false);
    const [videos,setVideos] = useState(null);
    const [playlist,setPlaylist] = useState(null)
    const [img1,setImg1] = useState()
    const [img2,setImg2] = useState()
    const [img3,setImg3] = useState()
    const [img4,setImg4] = useState()
    const userData = useSelector((state)=>(state.auth.userData))
    const [canAdd,setCanAdd] = useState(false);
    const [videoAdded,setVideoAdded] = useState(false);//for re-render the page

    const submitHandler = async(data)=>{
      console.log(data);

      axios.patch(`${url}/playlist/add/${data.videoId}/${playlistId}`,{},{withCredentials: true})
        .then((res)=>{
          console.log(res);
          setVideoAdded((pre)=>(!pre))
        })
        .catch((err)=>{console.log(err);})

    }

    useEffect(()=>{
        setCol(Math.floor(Math.random()*16777215).toString(16));
        axios.get(`${url}/playlist/${playlistId}`,{withCredentials: true})
            .then((res)=>{
                console.log(res);
                setPlaylist(res.data.data);
                // console.log(playlist);
                setVideos(res.data.data.videos);
                // console.log(videos);
                setPlaylistFetched(true);
                if(res.data.data.videos.length == 1){
                  setImg1(res.data.data.videos[0].thumbnail)
                  setImg2(res.data.data.videos[0].thumbnail)
                  setImg3(res.data.data.videos[0].thumbnail)
                  setImg4(res.data.data.videos[0].thumbnail)
                }else if(res.data.data.videos.length == 2){
                  setImg1(res.data.data.videos[0].thumbnail)
                  setImg2(res.data.data.videos[1].thumbnail)
                  setImg3(res.data.data.videos[1].thumbnail)
                  setImg4(res.data.data.videos[0].thumbnail)
                }else if(res.data.data.videos.length == 3){
                  setImg1(res.data.data.videos[0].thumbnail)
                  setImg2(res.data.data.videos[1].thumbnail)
                  setImg3(res.data.data.videos[2].thumbnail)
                  setImg4(res.data.data.videos[0].thumbnail)
                }else if(res.data.data.videos.length > 3){
                  setImg1(res.data.data.videos[0].thumbnail)
                  setImg2(res.data.data.videos[1].thumbnail)
                  setImg3(res.data.data.videos[2].thumbnail)
                  setImg4(res.data.data.videos[3].thumbnail)
                }else{
                  setImg1(noPlaylist)
                  setImg2(noPlaylist)
                  setImg3(noPlaylist)
                  setImg4(noPlaylist)
                }

                if(res.data.data.owner == userData._id){
                  setCanAdd(true)
                }

            })


    },[videoAdded])

  return (<>
    {playlistFetched ? (<div className=' flex flex-col gap-5'>
        <div style={{backgroundImage: `linear-gradient(to right, #${col} 0%, transparent 100%)`}} className=' relative w-[100%] h-[30vh] min-h-[177px] rounded-2xl'>
          <PlaylistHeader img1={img1} img2={img2} img3={img3} img4={img4} name={playlist.name}>
            <div>
              
            </div>
          </PlaylistHeader>
          {/* <Button onClick={()=>{setCon(true)}} className='absolute right-[10%] bottom-[-1.4rem] font-extrabold text-3xl h-auto rounded-full'>+</Button> */}

          {
            canAdd ? 
          (<DialogBox
            title={`Add Video to ${playlist.name}`}
            description={"Provide the id of the video you want to add"}
            trigger={`+`}
            className={`absolute right-[10%] bottom-[-1.4rem] font-extrabold text-3xl h-auto rounded-full`}
          >

            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Video Id :
                  </label>
                  <Input
                    id="name"
                    className="col-span-3"
                    type='text'
                    {...register("videoId",{
                      required:true,
                    })}
                  />
                </div>
                <Button type="submit" className='justify-self-end w-[30%]'><DialogClose>Add</DialogClose></Button>
              </div>
            </form>

          </DialogBox>)
            :
            null
          }

        </div>
        {/* {con?<div className=' absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30%] aspect-square border-2 border-red-700 '></div>:null} */}
      
      <div className=' flex flex-col mt-2 gap-[8px]'>
        {
          videos.map((video,i)=>{
            return (
              <VideoCard video={video} isPlaylist={true} playlistId={`${playlistId}`} key={i}/>
          )})
        }
      </div>

    </div>)
    :
    (<div></div>)
  }
  </>

  )
}

export default Playlist