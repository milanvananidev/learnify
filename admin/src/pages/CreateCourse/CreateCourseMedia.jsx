import React, { useState, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import CreateCourseStepper from '../../components/CreateCourseStepper';

const acceptStyle = {
  borderColor: '#5aad00'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#5aad00'
};

const CreateCourseMedia = () => {
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setThumbnail(URL.createObjectURL(file));
      }
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
  };

  return (
    <>
      <div className='mb-5 flex justify-between'>
        <h2 className='text-[25px] font-medium'>Add New Course</h2>
      </div>

      <div className='flex justify-between bg-white rounded-md px-8 py-5'>
        <div className='w-full flex gap-4'>
          <div className='w-full'>
            <label>Thumbnail</label>
            <div {...getRootProps({ style })} className='mt-2'>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some image here, or click to select files</p>
            </div>
            {thumbnail && (
              <div className='mt-5'>
                <img src={thumbnail} alt='Thumbnail Preview' className='w-full h-[350px] object-cover' />
              </div>
            )}
          </div>

          <div className='w-full'>
            <label>Video URL</label>
            <input
              type='text'
              placeholder='https://youtube.com/'
              className='px-5 py-5 my-2 rounded-md border-2 w-full'
              value={videoUrl}
              onChange={handleVideoUrlChange}
            />
            {videoUrl && (
              <div className='mt-3'>
                <iframe
                  width='100%'
                  height='350'
                  src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(videoUrl)}`}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div>
          <CreateCourseStepper />
        </div>
      </div>
    </>
  );
};

export default CreateCourseMedia;
