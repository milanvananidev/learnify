import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreateCourseStepper from '../../components/CreateCourseStepper';

const CreateCourse = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <div className='mb-5 flex justify-between'>
        <h2 className='text-[25px] font-medium'>Add New Course</h2>
      </div>

      <div className='flex justify-between bg-white rounded-md px-8 py-5'>
        <div className='w-full'>
          <div>
            <div>
              <label>Name</label>
              <input placeholder='Complete React Native' value={name} onChange={(e) => { setName(e.target.value) }} className='px-5 py-2 my-2 rounded-md border-2 w-full' />
            </div>

            <div className='my-3'>
              <label>Description</label>
              <ReactQuill className='my-2 h-[200px]' theme="snow" value={description} onChange={setDescription} />
            </div>
          </div>
        </div>
        <div>
          <CreateCourseStepper />
        </div>
      </div>

    </>
  )
}

export default CreateCourse