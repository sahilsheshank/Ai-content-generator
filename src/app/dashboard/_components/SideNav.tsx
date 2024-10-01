'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
function SideNav() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    })

    const menulist=[
        {
        name:'Home',
        icon:Home,
        path:'/dashboard',
        },
        {
        name:'History',
        icon:FileClock,
        path:'/dashboard/history',
        },
        {
        name:'Setting',
        icon:Settings,
        path:'/dashboard/setting',
        },
        
        
    ]
  return (
    <div className='h-screen p-5 shadow-sm bg-white border'>
        <div className='flex justify-center gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
        <h2 className="text-[#17CF97] text-3xl font-bold  min-w-max ">Handy AI</h2>
        </div>
        <hr className='my-3 border '/>

        <div className='mt-10'>
            {menulist.map((menu,index)=>(
                <div className={`flex gap-2 mb-2 p-3
                hover:bg-primary hover:text-white rounded-lg cursor-pointer  
                ${path==menu.path&&'bg-primary text-white'}`}>
                    <menu.icon className='h-6 w-6'/>
                    <h2>{menu.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SideNav
