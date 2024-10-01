'use client'
import React, { useEffect, useState } from 'react'
import templates from '@/app/(data)/templates'
import TemplateCard from './TemplateCard'


export interface TEMPLATE{
  name:string,
  desc:string,
  icon:string,
  category:string,
  slug:string,
  aiPrompt:string,
  form?:FORM[]
}

export interface FORM{
  label:string,
  field:string,
  name:string,
  required?:boolean
}
function TemplateList({UserSearchInput}:any) {

  const[templateList,setTemplateList]=useState(templates);
  useEffect(()=>{
    
    if(UserSearchInput)
      {
        const filterData=templates.filter(item=>
          item.name.toLowerCase().includes(UserSearchInput.toLowerCase())
        );
        setTemplateList(filterData);
      }
      else{
        setTemplateList(templates)
      }
  },[UserSearchInput])

  return (
    <div  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
      {templateList.map((item:TEMPLATE,index:number)=>(
        <TemplateCard {...item}/>
      ))}
      
    </div>
  )
}

export default TemplateList
