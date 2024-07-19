import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CreateCourseStepper = () => {

  const location = useLocation();

  const stepperData = [
    {
        title: 'Basic Information',
        route: '/create-course'
    },
    {
        title: 'Course Media',
        route: '/create-course-media'
    },
    {
        title: 'Curriculum',
        route: '/create-course-curriculum'
    },
    {
        title: 'Settings',
        route: '/create-course-settings'
    },
  ]

  const current = location.pathname;

  return (
    <div className='w-64 ms-5 px-5 py-5 rounded-md'>
      <div className='relative flex flex-col'>
        {stepperData.map((step, index) => (
          <div key={index} className="relative flex items-center mb-8">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${current === step.route ? 'border-primary text-primary font-medium' : 'border-gray-300'}`}>
                {index + 1}
              </div>
              {index !== stepperData.length - 1 && (
                <div className='h-full border-l-2 border-gray-300 absolute top-8'></div>
              )}
            </div>
            <Link to={step.route} className={`ml-4 ${current === step.route ? 'text-primary font-medium' : 'text-gray-600'}`}>
              {step.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateCourseStepper
