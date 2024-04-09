import { useSidebar } from '@/components/ContextProvider/SidebarProvider';
import { useTheme } from '@/components/ContextProvider/ThemeProvider';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

function Profile() {

  const url = import.meta.env.VITE_URL

  const {theme} = useTheme()

  const {userId} = useParams()
  const {sidebarVisible,setSidebarVisible} = useSidebar()
  const myId = useSelector((state)=>(state.auth.userData?._id));
  const [userData,setUserData] = useState();
  const [userFetched,setUserFetched] = useState(false)
  const [userExist,setUserExist] = useState(true);
  const [subscriber,setSubscriber] = useState();
  const [isSubscribed,setIsSubscribed] = useState()

  const toggleSubscription = async(e,channelId)=>{
    e.preventDefault();
    console.log('subscribed clicked');
    const res = await axios.post(`${url}/subscription/c/${channelId}`,{},{withCredentials: true})
        
    console.log(res);
    console.log(res.data.data);
    setIsSubscribed((pre)=>(!pre));      
  }

  

  const items = [
    {
      name: "Home",
      to: '/',
    },
    {
      name: "Videos",
      to: '/videos',
    },
    {
      name: "Channels",
      to: '/channels',
    },
    {
      name: "Playlists",
      to: '/playlists',
    },
    // {
    //   name: "Tweets",
    //   to: '/tweets',
    // },
    {
      name: "Subscribers",
      to: '/subscribers',
    },
    
  ]

  if(myId==userId){
    items.push({
      name: "ManageVideos",
      to: '/manage-videos',
    })
  }

  useEffect(()=>{
    setSidebarVisible(true)
    
    const func = async()=>{
      axios.get(`${url}/users/c/${userId}`,{withCredentials: true})
        .then((user)=>{
          console.log(user);
          setUserExist(true)
          setUserData(user.data.data)
          setUserFetched(true)
        })
        .catch((err)=>{
          console.log(err);
          setUserExist(false);
        })
      const res = await axios.get(`${url}/subscription/u/${userId}`,{withCredentials: true})
      console.log(res);
      setSubscriber(res.data.data);
      setIsSubscribed(res.data.data.isSubscribed)

    }

    func();

  },[userId])



  return (
    <>
    { userExist ? 
      <>
      {userFetched?(<div className=' flex flex-col'>
        <div className=' relative w-full '>
          <img className=' w-full aspect-[20/3] object-cover max-lg:hidden' src={userData?.coverImage} alt="" />
          <div className='relative left-8 w-max flex gap-10 flex-wrap'>
            <img className=' relative max-lg:static top-[-40px] min-w-[125px] max-w-[180px] aspect-square rounded-full border-[--primary] border-2 object-cover' src={userData?.avatar} alt="" />
            <div className=' flex flex-col max-lg:self-center gap-1 pb-5 text-left'>
              <div className='font-bold text-3xl'>{userData?.fullName.charAt(0).toUpperCase() + userData?.fullName.slice(1)}</div>
              <div className=' font-semibold'>@{userData?.username}</div>
              <div className=' '>{userData?.subscribersCount} subscribers</div>
            </div>
            {(myId != userId) && <Button className='max-lg:self-center mt-4' onClick={async(e)=>{await toggleSubscription(e,userId)}}>
                {
                  isSubscribed?
                  <div>Subscribed 🔔</div>
                  :
                  <div>Subscribe 🔕</div>
                }
              </Button>}
          </div>
        </div>

        <div className='max-lg:mt-4'>
          <div className={ `w-full border-b-[1px] ${(theme=='light')?'border-slate-600':'border-slate-300'} `}>
            <div className=' flex gap-10 pl-8 font-semibold overflow-x-auto'>
            {
              items.map((item,i) => {
                  return (
                      <NavLink to={`.${item.to}`} key={i} className={({isActive})=>(`${isActive? 'text-orange-600' : '' }`)} end>
                          <div className='  font-bold '>
                              {item.name}
                          </div>
                      </NavLink>
                  )
              })
            }
            </div>
          </div>
          <div className=' mt-3 min-h-[64vh]'>
            <Outlet/>
          </div>
        </div>

      </div>)
      :
      <></>
    }
    </>
    :
    <div className=' text-4xl '>User doesn't Exist</div>
    }
    </>
  )
}

export default Profile