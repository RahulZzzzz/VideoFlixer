import PlaylistCard from '@/components/PlaylistCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProfilePlaylists() {

    const url = import.meta.env.VITE_URL;

    const [playlistFetched, setPlaylistFetched] = useState(false);
    const [playlists, setPlaylists] = useState(null);

    const {userId} = useParams()

    useEffect(()=>{

        try {
            axios.get(`${url}/playlist/user/${userId}`, { withCredentials: true })
                .then((resp) => {
                    console.log(resp);
                    console.log(resp.data);
                    setPlaylistFetched(true);
                    setPlaylists(resp.data.data);
                });
        } catch (error) {
            console.log(error);
        }

    },[])

  return (
    <>
    {
        playlistFetched ?
        (
            <div className=" w-[100%] flex flex-row flex-wrap gap-4 mt-2 justify-start">
                {(playlists.length>0) && playlists.map((playlist, i) => (
                <PlaylistCard playlistDetails={playlist} key={i}/>
                ))}
                {(playlists.length==0) && (
                    <div className='text-[1rem] font-semibold m-auto' >Create a Playlist from Playlist section</div>
                )}
            </div>
        )
        :
        (<></>)
    }
    </>
  )
}

export default ProfilePlaylists