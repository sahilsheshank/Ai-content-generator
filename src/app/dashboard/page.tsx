'use client'
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateList from './_components/TemplateList'

function page() {

  const [UserSearchInput,setUserSearchInput]=useState<string>();

  return (
    <div>
      <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>

      <TemplateList UserSearchInput={UserSearchInput}/>
    </div>
  )
}

export default page
