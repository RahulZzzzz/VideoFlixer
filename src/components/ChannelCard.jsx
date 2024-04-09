import React, { useState } from 'react'
import { Button } from './ui/button';
import axios from 'axios'
import { useTheme } from './ContextProvider/ThemeProvider';

function ChannelCard({channel}) {

    const url = import.meta.env.VITE_URL

    const {theme} = useTheme()

    const [isSubscribed,setIsSubscribed] = useState(channel.isSubscribed);
    
    const toggleSubscription = async(e,channelId)=>{
        e.preventDefault();
        console.log('subscribed clicked');
        const res = await axios.post(`${url}/subscription/c/${channelId}`,{},{withCredentials: true})
            
        console.log(res);
        console.log(res.data.data);
        setIsSubscribed((pre)=>(!pre));      


    }


  return (
    <div className={` flex flex-row items-center w-full gap-2 border-[2px] border-zinc-700 rounded-lg p-3 pr-[1.5rem] ${(theme=='light')?'hover:bg-zinc-300':'hover:bg-zinc-800'} `}>
          <div className=' w-[12%] min-w-[7rem]' >
            <img src={channel.avatar} className='w-full aspect-square object-cover border-[1px] rounded-full border-zinc-500 p-2'/>
          </div>
          <div className=' flex flex-col w-[88%] pl-1 gap-2 mt-3'>
            {/* <div className=' w-full h-full'> */}
              <div className=' text-4xl font-semibold text-start hover:underline'>{channel.fullName}</div>
            {/* </div> */}
            {/* <div> */}
              <div className=' text-start pl-3 w-min hover:underline'>@{channel.username}</div>
            {/* </div> */}
            <div className=' flex flex-row w-full mt-2 gap-6'>
              {/* <div> */}
                <div className='font-medium'>Subscribers : {channel.subscribersCount}</div>
              {/* </div> */}
              {/* <div> */}
                <div className='font-medium' >SubscribeTo : {channel.channelsSubscribedToCount}</div>
              {/* </div> */}
            </div>
          </div>
          <div className=' self-center'>
            <Button onClick={async(e)=>{await toggleSubscription(e,channel._id)}}>
              {
                isSubscribed?
                <div>Subscribed 🔔</div>
                :
                <div>Subscribe 🔕</div>
              }
            </Button>
          </div>
        </div>
  )
}

export default ChannelCard