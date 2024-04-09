import React from 'react'
import { Link } from 'react-router-dom';

function VideoMainCard({video}) {

  let createdDate = new Date(video.createdAt);
  let currentDate = new Date();
  let timeDif = Math.abs(createdDate.getTime() - currentDate.getTime());
  let differentDays = Math.ceil(timeDif / (1000 * 3600 * 24));

  return (
      <div className={`  w-[30%] min-w-[15rem] gap-1 pb-4`}>
    <Link className='flex flex-col w-full' to={`/video/${video._id}`}>
          <img src={video.thumbnail} className="pb-2 w-[100%] h-[12.8rem] object-cover rounded-xl hover:rounded-none hover:scale-105 duration-300 ease-in-out" />
          <div className=" w-[100%] flex space-x-3">
              <img src={video.ownerAvatar} className=" h-[2.3rem] aspect-square rounded-full"/>
              <div className=" flex flex-col w-[80%] items-start">
                  <div className="pb-1 w-[100%] text-left box-content text-wrap font-sans font-bold text-[1rem]" >{((video.title).length<81)?(video.title):(video.title).substring(0,78)+'..'}</div>
                  <div className=" w-[100%] text-left" >
                  <div>{video.ownerName}</div>
                  <div>{video.views} views • {differentDays} days ago</div>
                  </div>
              </div>
          </div>
    </Link>
      </div>
  )
}

export default VideoMainCard