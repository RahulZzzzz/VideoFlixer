import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import {useNavigate, Link, Outlet } from "react-router-dom";
import Header from './components/Header/Header';
import  Sidebar  from './components/Sidebar/Sidebar';
import { useSidebar } from './components/ContextProvider/SidebarProvider';
import { useTheme } from './components/ContextProvider/ThemeProvider';

function App() {
  // const [sidebarVisible, setSidebarVisible] = useState(true)
  const {sidebarVisible,setSidebarVisible} = useSidebar();
  const navigate = useNavigate()
  const {theme} = useTheme()

  // console.log(setSidebarVisible);

  return (
    <>
      <div className='scrollbar min-h-[100vh] h-max flex flex-col bg-gradient-to-t from-zinc-200 to-zinc-50 dark:bg-gradient-to-t dark:from-zinc-800 dark:to-zinc-950 transition-all '>
        <Header setSidebarVisible={setSidebarVisible}/>
        <div className=' flex justify-center items-start '>
          
          <Sidebar className={`border-r-[1px] border-neutral-400 ${theme=='light'?'bg-blue-100': 'bg-black'} basis-1/6 h-[92vh] self-start ${sidebarVisible? '' : 'hidden'} transition-all`}/>
          <div className={`${sidebarVisible? ' basis-5/6' : 'w-full'}  p-[1rem] min-h-[92vh]`}>
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
