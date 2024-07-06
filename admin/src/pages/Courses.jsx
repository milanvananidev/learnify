import React from 'react'
import { useNavigate } from 'react-router-dom'
import courses from '../mockdata/courses.json'
import CourseCard from '../components/CourseCard'

const Courses = () => {

  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/create-course')
  }

  return (
    <div>
      <div className='mb-10 flex justify-between'>
        <h2 className='text-[25px] font-medium'>All Courses</h2>
        <button onClick={handleCreateNew} className='text-[20px] font-medium text-white bg-primary px-4 py-2 rounded-lg'>Create a course</button>
      </div>

      <div className='flex gap-10 flex-wrap'>
        {
          courses?.map((course) => {
            return <CourseCard course={course} key={course._id} />
          })
        }
      </div>
    </div>
  )
}

export default Courses