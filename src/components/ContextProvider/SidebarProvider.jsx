import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext();

export function useSidebar(){
    return useContext(SidebarContext)
}

export function SidebarProvider({children}) {

    const [sidebarVisible,setSidebarVisible] = useState(true)

  return (
    <SidebarContext.Provider value={{sidebarVisible,setSidebarVisible}}>
        {children}
    </SidebarContext.Provider>
  )
}

