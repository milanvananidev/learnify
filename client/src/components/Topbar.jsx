'use client'

import React from 'react'
import { IoMdClose } from "react-icons/io";
import { setItemToStorage } from '../utils/localStorage';


// Eventually topbar text is come from admin panel
const Topbar = ({setHideTopBar}) => {

  const hideTopBar = () => {
    setHideTopBar(true);
    setItemToStorage('hideTopbar', 'true')
  }

  return (
    <>
      <div className='bg-black text-white font-semibold px-10 py-3 text-center text-xs relative flex justify-center align-middle md:text-sm'>
        NEW Launch OFFER! Get 40% off on annual plan.
        <IoMdClose color='#FFF' className='absolute cursor-pointer right-2 md:right-10' size={20} onClick={hideTopBar} />
      </div>
    </>
  )
}

export default Topbar