import React from 'react'
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { trimDescription } from '../utils/utility';

const CourseCard = ({ course }) => {
    return (
        <>
            <div class="max-w-xs rounded-lg overflow-hidden shadow-lg relative cursor-pointer">
                <img src={course.thumbnail.url} draggable={false} />

                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{course?.name}</div>
                    <p class="text-gray-700 text-base">
                        {trimDescription(course.description, 96)}
                    </p>
                </div>

                <div className='flex justify-end px-6 pt-4 gap-2 pb-2 mb-4'>
                    <div className='bg-primary rounded-lg cursor-pointer p-2 flex items-center justify-center gap-2 text-white font-medium'>
                        <FaPencilAlt size={15} color='#FFF' />
                    </div>

                    <div className='bg-red-900  rounded-lg cursor-pointer p-2 flex items-center justify-center gap-2 text-white font-medium'>
                        <FaTrashAlt size={15} color='#FFF' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseCard