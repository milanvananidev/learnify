'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { RiMailCheckLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';


const Verification = () => {

  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (isSuccess) {
      toast('Code sent successfully');
    }

    if (error) {
      if ("data" in error) {
        const errorData = error.data;
        toast.error(errorData?.message)
      }
    }
  }, [isSuccess, error])

  const handleResend = () => {
    register(user);
  };

  const handleLogin = () => {

  }

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center py-8 px-6">
        <div className="w-full max-w-lg bg-white rounded-lg shadow dark:border sm:max-w-md lg:max-w-xl ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="mb-9 text-2xl font-semibold text-gray-900">
              <div className='flex justify-center align-middle'>
                <RiMailCheckLine size={80} color='#FFF' className='bg-primary p-3 rounded-full' />
              </div>

              <p className="space-x-2 text-center mt-5">
                <span>Please check your email</span>
              </p>
              <p className='text-sm font-medium text-center mt-3'>We have sent code to <span className='font-semibold'>milanvananidev@gmail.com</span></p>
              <hr className='my-2' />

            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className='mx-5'>-</span>}
              renderInput={(props) => <input  {...props} className='shadow-md h-[50px] w-[50px]' />}
              containerStyle={{ justifyContent: 'center' }}
              inputStyle={{ backgroundColor: '#F5F5F5', borderRadius: '8px', border: '1px solid grey', fontWeight: '500', fontSize: '25px' }}
            />

            <p className='text-sm font-medium text-center mt-3'>Did't recived code? <span className='underline cursor-pointer' onClick={handleResend}>click to resend</span></p>

            <button
              type="submit"
              className="w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-3 text-center"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>

  )
}

export default Verification;