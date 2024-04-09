import React, { useState } from 'react'
import Bhamburger from "../assets/B-hamburger.png"
import Whamburger from "../assets/W-hamburger.png"
import Bsearch from "../assets/B-search.png"
import Wsearch from "../assets/W-search.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '../ContextProvider/ThemeProvider'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/authSlice'
import { DialogBox } from '../DialogBox'
import { DialogClose } from '../ui/dialog'

function Header({setSidebarVisible}) {

    const {theme} = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showContainer,setShowContainer] = useState(false)
    const authStatus = useSelector((state)=>state.auth.status);
    const userData = useSelector((state)=>state.auth.userData);

    console.log(authStatus);
    console.log(userData);

    const logoutHandler = async()=>{
        dispatch(logout());
    }

  return (
    <div className={`border-b-[0.5px] border-neutral-400 sticky top-0 z-10 h-[8vh] flex justify-between items-center p-6 ${(theme=="dark")?'bg-zinc-950':'bg-zinc-50'} bg-opacity-95`}>

        <div className=' flex '>
            <button className=' scale-90' onClick={()=>{setSidebarVisible((pre)=>(!pre))}}>
                { (theme=="dark") ? (<img className=' max-w-[1.7rem]' src={Whamburger} alt="Ham" />) : <img className=' max-w-[1.7rem]' src={Bhamburger} alt="Ham" />}
            </button>
            <button className=' hidden'>
                <img className=' max-w-[1.7rem]' src={Bhamburger} alt="Tube" />
            </button>
        </div>

        <div className=' flex w-[50%] justify-center items-center'>
            <input type="text" className='w-[70%] p-[7px] pl-4 m-[4px] mr-0 border-2 border-neutral-950 dark:border-neutral-700 border-opacity-60 rounded-l-[65px] bg-zinc-50 dark:bg-zinc-950 focus:border-blue-600 focus:outline-none focus:border-opacity-100 dark:text-white  dark:focus:border-blue-600' />
            <button className=' p-[9.7px] m-0 border-2 border-l-0 dark:border-neutral-700 border-neutral-950 border-opacity-60 rounded-r-[65px]'>
                {(theme=="dark")?(<img className=' max-w-[1.15rem]' src={Wsearch} alt="search" />):(<img className=' max-w-[1.15rem]' src={Bsearch} alt="search" />)}
            </button>
        </div>

        <div className=' flex gap-2 relative'>
            <ThemeToggle/>
            
            {(authStatus)?(
                <div className=' flex flex-col'>
                    <button onClick={()=>{setShowContainer((pre)=>(!pre))}}>
                        <Avatar>
                            <AvatarImage src={userData.avatar} className=' object-cover' />
                            <AvatarFallback>{userData.fullName[0]}</AvatarFallback>
                        </Avatar>
                    </button>
                    {showContainer && <div id='avatarIcon' className={` absolute px-3 py-3 z-10 right-16 bg-zinc-200 dark:bg-zinc-800 rounded-xl`}>
                        <div className=' flex flex-col gap-4 text-2xl '>
                            {/* <div>nfsdaj</div>
                            <div>nfsdaj</div>
                            <div>nfsdaj</div>
                            <div>nfsdaj</div> */}
                            <div>
                                {/* <button onClick={logoutHandler}>Logout</button> */}
                                <DialogBox
                                    title={"Logout"}
                                    description={"Once you logged out you have login again"}
                                    trigger={`Logout`}
                                    className={`w-full bg-neutral-800 text-white hover:bg-neutral-600 px-1 text-[1.2rem]`}
                                >

                                    
                                    <div className="flex gap-4 py-4">
                                        
                                        <Button onClick={logoutHandler} className='justify-self-end w-[30%] bg-red-600 hover:bg-red-700 text-white'><DialogClose>Logout</DialogClose></Button>
                                        <Button className='justify-self-end w-[30%]'><DialogClose>Cancel</DialogClose></Button>
                                    </div>
                                    

                                </DialogBox>
                            </div>
                        </div>
                    </div>}
                </div>
                )
                :
                (
                    <Button onClick={()=>{navigate('/login')}}
                     className={`${(theme=="dark")?'bg-gray-900 text-slate-200 hover:bg-gray-800':'bg-gray-200 text-slate-900 hover:bg-gray-300'}`}>
                        Login
                    </Button>
                )

            }
        </div>

    </div>
  )
}

export default Header