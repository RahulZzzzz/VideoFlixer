import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Sidebar.css"
import Bhome from "../assets/Bhome.png"
import Bsubscription from "../assets/Bsubscription.png"
import Bplaylist from "../assets/Bplaylist.png"
import Byourvideo from "../assets/Byourvideo.png"
import Bprofile from "../assets/Bprofile.png"
import Bhistory from "../assets/Bhistory.png"
import Whome from "../assets/Whome.png"
import Wsubscription from "../assets/Wsubscription.png"
import Wplaylist from "../assets/Wplaylist.png"
import Wyourvideo from "../assets/Wyourvideo.png"
import Wprofile from "../assets/Wprofile.png"
import Whistory from "../assets/Whistory.png"
import { useTheme } from '../ContextProvider/ThemeProvider'
import { useSelector } from 'react-redux'

function Sidebar({className=''}) {

    const userData = useSelector((state)=>(state.auth.userData))

    const items = [
        {
            name: "Home",
            to: '/',
            Bimage: Bhome,
            Wimage: Whome,
            // Wimage: ,
        },
        {
            name: "Subscription",
            to: '/subscription',
            Bimage: Bsubscription,
            Wimage: Wsubscription,
        },
        {
            name: "Playlist",
            to: '/playlist',
            Bimage: Bplaylist,
            Wimage: Wplaylist,
        },
        {
            name: "My Videos",
            to: '/my-videos',
            Bimage: Byourvideo,
            Wimage: Wyourvideo,
        },
        {
            name: "Profile",
            to: `/profile/${userData?._id}/`,
            Bimage: Bprofile,
            Wimage: Wprofile,
        },
        {
            name: "History",
            to: '/history',
            Bimage: Bhistory,
            Wimage: Whistory,
        },
        
        
    ]

    const {theme} = useTheme()


  return (
    <div className={`${className} p-6 pr-1 pl-2 overflow-y-scroll sticky top-[8vh] flex flex-col justify-start items-start sidebar ${(theme=="dark")?'dsidebar':'lsidebar'}`}>
        {
            items.map((item,i) => {
                return (
                    <NavLink to={item.to} key={i} className={({isActive})=>(`w-[100%] py-4 pl-2 ${(theme=="dark")?'hover:bg-zinc-800':'hover:bg-blue-300'} rounded-md ${(isActive )? `${(theme=="dark")?'bg-zinc-800':'bg-blue-300'}` : ''}`)} >
                    <div className=' flex gap-3 '>
                        <img className=' w-7' src={(theme=="dark")?item.Wimage:item.Bimage} alt="" />
                        <div className='  font-bold '>
                            {item.name}
                        </div>
                    </div>
                    </NavLink>
                )
            })
        }
    </div>
  )
}

export default Sidebar