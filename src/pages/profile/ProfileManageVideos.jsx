import { DialogBox } from '@/components/DialogBox'
import VideoManageCard from '@/components/VideoManageCard'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProfileManageVideos() {

    const url = import.meta.env.VITE_URL

    const [videoFetched,setVideoFetched] = useState(false)
    const [videos,setVideos] = useState([])

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [thumbnail,setThumbnail] = useState();
    const [uploadVideo,setUploadVideo] = useState();

    const [uploaded,setUploaded] = useState(false);

    const {userId} = useParams()

    const uploadHandler = async()=>{

        const formData = new FormData();

        formData.append("title",title)
        formData.append("description",description)
        formData.append("thumbnail",thumbnail)
        formData.append("videoFile",uploadVideo)

        axios.post(`${url}/video`,formData,{withCredentials:true,headers:{"Content-Type": 'multipart/form-data',}})
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setUploaded((pre)=>(!pre));
            })

    }

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

    },[uploaded])


  return (
    <div className='flex flex-col gap-2'>
        <div className='self-end mr-4'>
            {/* <Button className='bg-neutral-700 text-white hover:bg-neutral-600 ' onClick={uploadHandler}>Upload Video</Button> */}
        
        <DialogBox
                title={"Upload Video"}
                description={"Choose a video to Upload"}
                trigger={`Publish Video`}
                className={`w-full bg-neutral-800 text-white hover:bg-neutral-600`}
              >

                {/* <form> */}
                  <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="uploadTitle" className="text-right">
                            Title
                        </label>
                        <Input
                            id="uploadTitle"
                            className="col-span-3"
                            type='text'
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="uploadDescription" className="text-right">
                            Description
                        </label>
                        <Input
                            id="uploadDescription"
                            className="col-span-3"
                            type='text'
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="uploadVideo" className="text-right">
                            Video
                        </label>
                        <Input
                            id="uploadVideo"
                            className="col-span-3"
                            type='file'
                            accept="video/*"
                            onChangeCapture = {(e)=>{
                                console.log(e);
                                let input = e.target
                                if (input.files && input.files[0]) {
                                    console.log(input.files);
                                    setUploadVideo(input.files[0])
                                }
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="uploadThumbnail" className="text-right">
                            Thumbnail
                        </label>
                        <Input
                            id="uploadThumbnail"
                            className="col-span-3"
                            type='file'
                            accept="image/*"
                            
                            onChangeCapture = {(e)=>{
                                console.log(e);
                                let input = e.target
                                if (input.files && input.files[0]) {
                                    console.log(input.files);
                                    setThumbnail(input.files[0])
                                    var reader = new FileReader();
                                    reader.onload = function (eve) {
                                        const im=document.getElementById('uptn');
                                        console.log(eve.target.result);

                                        im.setAttribute("src",eve.target.result);
                                        im.setAttribute("width","150px");
                                    };
                                    reader.readAsDataURL(input.files[0]);
                                //     console.log(reader.readAsDataURL(input.files[0]));
                                    }
                                // console.log(input.files);
                            }}
                            
                            // ref={thumbnailRef}
                            
                        />
                        <img id='uptn' className=' self-center rounded-sm object-cover aspect-square' />
                            
                    </div>
                    <div className='flex gap-4 py-4'>
                        <Button onClick={uploadHandler}  className='justify-self-end w-[30%] bg-red-600 hover:bg-red-700 text-white'><DialogClose>Publish Video</DialogClose></Button>
                        <Button className='justify-self-end w-[30%]'><DialogClose>Cancel</DialogClose></Button>
                    </div>
                  </div>
                {/* </form> */}

        </DialogBox>
        </div>
        <div>
            { (videos.length>0) && 
                videos.map((video,i)=>(
                    <VideoManageCard videoDetails={video} isManage={true} key={i}/>
                ))
            }
            { (videos.length==0) && 
                (<div className=' font-semibold'>Publish Videos from Here</div>)
            }
        </div>
    </div>
  )
}

export default ProfileManageVideos