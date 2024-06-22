'use client';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Verification = () => {

  const {token} = useSelector((state) => state.auth)

  return (
    <div> Verification: {token} </div>
  )
}

export default Verification;