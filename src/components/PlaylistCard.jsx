import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { DialogBox } from "@/components/DialogBox";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useTheme } from './ContextProvider/ThemeProvider';

function PlaylistCard({playlistDetails}) {

  const url = import.meta.env.VITE_URL;

  const [isHovered,setIsHovered] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {register,handleSubmit} = useForm()
  // const {register:register1,handleSubmit:handleSubmit1} = useForm()
  const [playlist,setPlaylist] = useState(playlistDetails)
  const [name,setName] = useState(playlistDetails.name)
  const [description,setDescription] = useState(playlistDetails.description)

  const {theme} = useTheme()

  const handleDropdownToggle = () => {
    setIsDropdownOpen((pre)=>(!pre));
  };

  const updateHandler = ()=>{
    console.log(name,description);
    axios.patch(`${url}/playlist/${playlist._id}`,{name:name,description:description}, { withCredentials: true })
      .then((res)=>{

        console.log(res);
        setPlaylist(res.data.data)



      })
      .catch((err)=>{
        console.log(err);
      })
  }

  const deleteHandler = ()=>{
    // console.log("data");

    axios.delete(`${url}/playlist/${playlist._id}`, { withCredentials: true })
      .then((res)=>{

        console.log(res);
        setPlaylist(null)



      })
      .catch((err)=>{
        console.log(err);
      })

  }

  

  return (
    <>
    { playlist ? 
    (<Link
      to={`/playlistvideos/${playlist._id}`}
      className={` flex flex-col w-[30%] min-w-[6rem] p-5 gap-2 border-[1px] ${(theme=='light')?'border-neutral-400 hover:border-neutral-800':'border-neutral-600 hover:border-neutral-400'}  rounded-md duration-300 ease-in-out`}
      onMouseEnter={()=>{setIsHovered(true)}}
      onMouseLeave={()=>{setIsHovered(false);setIsDropdownOpen(false)}}
    >
      <div className="relative flex flex-row w-full gap-2">
        <img
          src={playlist?.firstVideoThumbnail}
          className=" w-[30%] aspect-square object-cover rounded-lg"
          alt=""
        />
        <div className=" flex flex-col m-auto">
          <div className={` font-bold text-2xl ${(theme=='light')?'text-slate-800':'text-slate-200'}  hover:underline`}>
            {playlist.name}
          </div>
          <div className={` text-xs ${(theme=='light')?'text-slate-600':'text-slate-400'} `} >
            {playlist.description}
          </div>
        </div>
        {
        // isHovered &&
         (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <div
            className={`cursor-pointer ${(theme=='light')?'hover:bg-neutral-300':'hover:bg-neutral-700'}  text-xl h-min w-[30px] rounded-full flex items-center justify-center`}
            onClick={(e)=>{ e.preventDefault(); handleDropdownToggle()}}
          >
            ⋮
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
              <div onClick={(e)=>{e.preventDefault()}}>
              <DialogBox
                title={"Update Playlist"}
                description={"Update an existing Playlist"}
                trigger={`Update`}
                className={`w-full bg-neutral-800 text-white hover:bg-neutral-600`}
              >

                <form >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input
                        id="name"
                        className="col-span-3"
                        type='text'
                        value={name}
                        onChange = {(e)=>{setName(e.target.value)}}
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
                    {/* <DialogClose className=" w-full"> */}
                    <Button onClick={(e)=>{updateHandler()}} className='justify-self-end w-[30%]'><DialogClose>Update Playlist</DialogClose></Button>
                    {/* </DialogClose> */}
                  </div>
                </form>

              </DialogBox>
              </div>
              <div onClick={(e)=>{e.preventDefault()}}>
              <DialogBox
                title={"Delete Playlist"}
                description={"Can't be undone"}
                trigger={`Delete`}
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
      </div>
      <div className={`text-lg ${(theme=='light')?'text-neutral-700':'text-slate-100'}  `}>
        Created by{" "}
        {
          <Link to={`/profile/${playlist.owner}`} className=" hover:underline">
            {playlist.ownerName}
          </Link>
        }
      </div>
    </Link>)
    :
    (<></>)
    }
    </>
  )
}

export default PlaylistCard