import { useSidebar } from "@/components/ContextProvider/SidebarProvider";
import { DialogBox } from "@/components/DialogBox";
import PlaylistCard from "@/components/PlaylistCard";
import PlaylistHeader from "@/components/PlaylistHeader";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noPlaylist from "../components/assets/noPlaylist1.png"

function Playlists() {
  const url = import.meta.env.VITE_URL;

  const {sidebarVisible,setSidebarVisible} = useSidebar()
  
  const userData = useSelector((state) => state.auth.userData);
  const [playlistFetched, setPlaylistFetched] = useState(false);
  const [playlists, setPlaylists] = useState(null);
  const {register,handleSubmit} = useForm()

  console.log(userData);

  const [col, setCol] = useState();
  const [con, setCon] = useState(false);
  const [img1,setImg1] = useState();
  const [img2,setImg2] = useState();
  const [img3,setImg3] = useState();
  const [img4,setImg4] = useState();

  const submitHandler = (data)=>{
    
    // console.log(data);
    axios.post(`${url}/playlist`,{name:data.name,description:data.description}, { withCredentials: true })
      .then((res)=>{

        axios.get(`${url}/playlist/user/${userData._id}`, { withCredentials: true })
          .then((resp) => {
            console.log(resp);
            setPlaylists(resp.data.data);
          })

      })
      .catch((err)=>{
        console.log(err);
      })

  }

  const forImage = (img)=>(
    img?(img):(noPlaylist)
  )

  useEffect(() => {

    setSidebarVisible(true)

    setCol(Math.floor(Math.random() * 16777215).toString(16));
    if (userData) {
      const resp = axios
        .get(`${url}/playlist/user/${userData._id}`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setPlaylistFetched(true);
          setPlaylists(res.data.data);

          if(res.data.data.length == 1){
            setImg1(forImage(res.data.data[0].firstVideoThumbnail))
            setImg2(forImage(res.data.data[0].firstVideoThumbnail))
            setImg3(forImage(res.data.data[0].firstVideoThumbnail))
            setImg4(forImage(res.data.data[0].firstVideoThumbnail))
          }else if(res.data.data.length == 2){
            setImg1(forImage(res.data.data[0].firstVideoThumbnail))
            setImg2(forImage(res.data.data[1].firstVideoThumbnail))
            setImg3(forImage(res.data.data[0].firstVideoThumbnail))
            setImg4(forImage(res.data.data[1].firstVideoThumbnail))
          }else if(res.data.data.length == 3){
            setImg1(forImage(res.data.data[0].firstVideoThumbnail))
            setImg2(forImage(res.data.data[1].firstVideoThumbnail))
            setImg3(forImage(res.data.data[2].firstVideoThumbnail))
            setImg4(forImage(res.data.data[0].firstVideoThumbnail))
          }else if(res.data.data.length > 3){
            setImg1(forImage(res.data.data[0].firstVideoThumbnail))
            setImg2(forImage(res.data.data[1].firstVideoThumbnail))
            setImg3(forImage(res.data.data[2].firstVideoThumbnail))
            setImg4(forImage(res.data.data[3].firstVideoThumbnail))
          }else{
            setImg1(noPlaylist)
            setImg2(noPlaylist)
            setImg3(noPlaylist)
            setImg4(noPlaylist)
          }

        });

    }
  }, []);

  return (
    <>
      {playlistFetched ? (
        <>
        { (<div className=" flex flex-col gap-5">
          <div
            style={{
              backgroundImage: `linear-gradient(to right, #${col} 0%, transparent 100%)`,
            }}
            className=" relative w-[100%] h-[30vh] min-h-[177px] rounded-2xl"
          >
            <PlaylistHeader
              img1={img1}
              img2={img2}
              img3={img3}
              img4={img4}
              name={playlists[0]?.ownerName}
              ownerId={playlists[0]?.owner}
            >
              <div>No. of playlists : {playlists.length}</div>
            </PlaylistHeader>
            {/* <Button onClick={()=>{setCon(true)}} className='absolute right-[10%] bottom-[-1.4rem] font-extrabold text-3xl h-auto rounded-full'>+</Button> */}
            <DialogBox
              title={"Add Playlist"}
              description={"Create a new Playlist"}
              trigger={`+`}
              className={`absolute right-[10%] bottom-[-1.4rem] font-extrabold text-3xl h-auto rounded-full`}
            >

              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      className="col-span-3"
                      type='text'
                      {...register("name",{
                        required:true,
                      })}
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
                      {...register("description",{
                        required:true,
                      })}
                    />
                  </div>
                  {/* <DialogClose className=" w-full"> */}
                  <Button type="submit" className='justify-self-end w-[30%]'><DialogClose>Create Playlist</DialogClose></Button>
                  {/* </DialogClose> */}
                </div>
              </form>

            </DialogBox>
          </div>

          {con ? (
            <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30%] aspect-square border-2 border-red-700 "></div>
          ) : null}

          <div className=" w-[100%] flex flex-row flex-wrap gap-4 mt-2 justify-start">
            {playlists.map((playlist, i) => (
              <PlaylistCard playlistDetails={playlist} key={i}/>
            ))}
          </div>

          </div>)
          // :
          // <></>  
        }
        </>
      ) 
      : 
      (
        <div></div>
      )}
    </>
  );
}

export default Playlists;
