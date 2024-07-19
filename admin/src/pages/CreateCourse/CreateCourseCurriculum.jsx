import React, { useState, useEffect } from 'react';
import CreateCourseStepper from '../../components/CreateCourseStepper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';
import '../../styles/CreateCourseModal.css';

const CreateCourseCurriculum = () => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState({ title: '', description: '', video: null });
    const [videoPreview, setVideoPreview] = useState(null);
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLecture({ ...lecture, [name]: value });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setLecture({ ...lecture, video: file });
        setVideoPreview(URL.createObjectURL(file));
    };

    const addLecture = () => {
        if (isEditing) {
            const updatedLectures = [...lectures];
            updatedLectures[editIndex] = { ...lecture, description };
            setLectures(updatedLectures);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setLectures([...lectures, { ...lecture, description }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setLecture({ title: '', description: '', video: null });
        setDescription('');
        setVideoPreview(null);
        setIsModalOpen(false);
    };

    const editLecture = (index) => {
        const lectureToEdit = lectures[index];
        setLecture(lectureToEdit);
        setDescription(lectureToEdit.description);
        setVideoPreview(URL.createObjectURL(lectureToEdit.video));
        setIsEditing(true);
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const deleteLecture = (index) => {
        const updatedLectures = lectures.filter((_, i) => i !== index);
        setLectures(updatedLectures);
    };

    const openAddLectureModal = () => {
        resetForm();
        setIsEditing(false);
        setIsModalOpen(true);
    };

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    return (
        <>
            <div className='mb-8 flex justify-between items-center'>
                <h2 className='text-2xl font-semibold'>Add New Course</h2>
                <button
                    onClick={openAddLectureModal}
                    className='bg-primary text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm'
                >
                    Add Lecture
                </button>
            </div>

            <div className='w-full flex justify-between bg-white rounded-md shadow-lg px-8 py-6'>
                <div className='w-full'>
                    {lectures.map((lecture, index) => (
                        <div key={index} className='flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-md shadow-sm'>
                            <div className='flex items-center'>
                                {lecture.video && (
                                    <video
                                        src={URL.createObjectURL(lecture.video)}
                                        className='w-16 h-16 mr-4 object-cover rounded-md shadow-sm'
                                        muted
                                    />
                                )}
                                <div>
                                    <h3 className='text-lg font-semibold'>{lecture.title}</h3>
                                    <div
                                        className='text-sm text-gray-600'
                                        dangerouslySetInnerHTML={{ __html: lecture.description.slice(0, 100) + '...' }}
                                    ></div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <button
                                    onClick={() => editLecture(index)}
                                    className='bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm mr-2'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteLecture(index)}
                                    className='bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='ml-8'>
                    <CreateCourseStepper />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Add Lecture"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className='p-4'>
                    <h2 className='text-2xl font-semibold mb-4'>{isEditing ? 'Edit Lecture' : 'Add Lecture'}</h2>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Lecture Title</label>
                        <input
                            type='text'
                            name='title'
                            value={lecture.title}
                            onChange={handleInputChange}
                            className='mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Lecture Description</label>
                        <ReactQuill
                            className='my-2 h-[200px]'
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                    <div className='mb-4 mt-14'>
                        <label className='block text-sm font-medium text-gray-700'>Upload Video</label>
                        <input
                            type='file'
                            name='video'
                            onChange={handleVideoChange}
                            className='mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2'
                        />
                    </div>
                    {videoPreview && (
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Video Preview</label>
                            <video controls src={videoPreview} className='mt-2 w-full h-auto rounded-md shadow-sm' />
                        </div>
                    )}
                    <div className='flex justify-end'>
                        <button
                            onClick={addLecture}
                            className='bg-primary text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm mr-2'
                        >
                            {isEditing ? 'Update Lecture' : 'Add Lecture'}
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='text-gray-600 text-sm font-medium px-4 py-2 rounded-md shadow-sm'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CreateCourseCurriculum;
