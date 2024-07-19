import React from 'react'

const InfoCard = (props) => {
    return (
        <div className='bg-white w-52 px-5 py-4 border-2 rounded-md'>
            <div className=' text-gray-800'>
                {props.title}
            </div>
            <div className='text-primary text-[30px] font-bold'>
                {props.info}
            </div>
        </div>
    )
}

export default InfoCard