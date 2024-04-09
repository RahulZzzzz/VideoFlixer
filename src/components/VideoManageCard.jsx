import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from './ContextProvider/ThemeProvider';
import { DialogBox } from './DialogBox';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DialogClose } from './ui/dialog';
import axios from 'axios';

function VideoManageCard({videoDetails,isManage=true}) {

    const url = import.meta.env.VITE_URL;

    const [video,setVideo] = useState(videoDetails)

    const [title,setTitle] = useState(video.title);
    const [description,setDescription] = useState(video.description);
    const [thumbnail,setThumbnail] = useState(video.thumbnail)
    const thumbnailRef = useRef(null)

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
    const [updateDialog, setUpdateDialog] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen((pre)=>(!pre));
    };

    const updateHandler = async()=>{

        const formData = new FormData();

        formData.append("title",title)
        formData.append("description",description)
        formData.append("thumbnail",thumbnail)




        const res = await fetch(`${url}/video/${video._id}`,{
            method: "PATCH",
            body: formData,
            credentials: 'include'
        },{
            headers: {
            "Content-Type": 'multipart/form-data',
            }
        })

        const resp = await res.json();

        console.log(res);
        console.log(resp);

        setVideo(resp.data)


    }

    const deleteHandler = ()=>{
        // console.log('data');
        axios.delete(`${url}/video/${video._id}`,{ withCredentials: true })
            .then((res)=>{
                console.log(res);
                setIsDeleted(true)
            })
    }
    

  return (
    <>
    {
        isDeleted ? (<></>) : 
        (<>
        <Link to={`/video/${video._id}`} 
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
          {(isDropdownOpen && isManage) && (
            <div className="absolute right-0 mt-2 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
              
              <div onClick={(e)=>{e.preventDefault()}}>
                <DialogBox
                    title={"Delete Video from Account"}
                    description={"Can't be undone"}
                    trigger={`Delete`}
                    className={`w-full bg-neutral-800 text-white hover:bg-neutral-600`}
                >

                    <form>
                    <div className="flex gap-4 py-4">
                        
                        <Button onClick={deleteHandler} className='justify-self-end w-[30%] bg-red-600 hover:bg-red-700 text-white'><DialogClose>Delete Video</DialogClose></Button>
                        <Button className='justify-self-end w-[30%]'><DialogClose>Cancel</DialogClose></Button>
                    </div>
                    </form>

                </DialogBox>
              </div>
              <div onClick={(e)=>{e.preventDefault()}}>

                <Button onClick={(e)=>{setUpdateDialog(true)}} className={` w-full bg-neutral-800 text-white hover:bg-neutral-600 `} >Update</Button>
                
              </div>
            </div>
          )}
        </div>
        )}
    </Link>
        { updateDialog && 

            (<div onMouseDown={(e)=>{if (!e.target.closest('.fixed-content')){setUpdateDialog(false)}}}>
            <div className='fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'></div>
            <div className='fixed-content fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg '
                // onClick={(e)=>{e.preventDefault()}}
            >
                <form >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right">
                            Title
                        </label>
                        <Input
                            id="title"
                            className="col-span-3"
                            type='text'
                            value={title}
                            onChange = {(e)=>{setTitle(e.target.value)}}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                            Description
                        </label>
                        <Input
                            id="description"
                            className="col-span-3"
                            type='text'
                            value={description}
                            onChange = {(e)=>{setDescription(e.target.value)}}
                        />
                    </div>
                    
                    <div className=" flex flex-col gap-1" >
                        {/* <input type="file" /> */}
                        <Input
                            label="Thumbnail: "
                            // value={thumbnail}
                            type = "file"
                            accept="image/*"
                            
                            onChangeCapture = {(e)=>{
                                console.log(e);
                                let input = e.target
                                if (input.files && input.files[0]) {
                                    console.log(input.files);
                                    setThumbnail(input.files[0])
                                    var reader = new FileReader();
                                    reader.onload = function (eve) {
                                        const im=document.getElementById('tn');
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
                            // onChange={(e) => setThumbnail(e.target.files[0])}
                            
                        />
                        <img id='tn' className=' self-center rounded-sm object-cover aspect-square' />
                            
                    </div>
                    <Button onClick={(e)=>{updateHandler();setUpdateDialog(false)}} className='justify-self-end w-[30%]'>Update Video</Button>
                    <Button onClick={(e)=>{setUpdateDialog(false)}} className='justify-self-end w-[30%]'>Close</Button>
                    
                </div>
                </form> 
            </div>
            </div>)

            }
    </>)}
    </>
  )
}

export default VideoManageCard