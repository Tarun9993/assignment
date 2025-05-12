import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { TShirtModel } from './components/TShirtModel';

function App() {
  const [image, setImage] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const imagePreview = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      text: '',
      textColor: '#ffffff',
    }
  });

  const height = watch('height');
  const weight = watch('weight');
  const build = watch('build');
  const text = watch('text');

  const toggle3D = (e) => {
    if (e.altKey && e.key === 'q') setShow3D(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener('keydown', toggle3D);
    return () => document.removeEventListener('keydown', toggle3D);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    setSubmittedData({ ...data, image });
    console.log({ ...data, image });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-tr from-indigo-100 to-pink-100 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 col-span-1 border-4 border-dashed rounded-xl p-4 shadow-lg bg-white/70 backdrop-blur-sm"
      >
        <label className="text-lg font-bold">Height (cm): {height}</label>
        <input
          type="range"
          min={140}
          max={220}
          {...register('height')}
          className="w-full"
        />

        <label className="text-lg font-bold">Weight (kg): {weight}</label>
        <input
          type="range"
          min={40}
          max={150}
          {...register('weight')}
          className="w-full"
        />

        <label className="text-lg font-bold">Build</label>
        <select
          {...register('build')}
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="lean">Lean</option>
          <option value="reg">Regular</option>
          <option value="athletic">Athletic</option>
          <option value="big">Big</option>
        </select>

        <label className="text-lg font-bold">T-Shirt Text (max 3 lines)</label>
        <textarea
          {...register('text')}
          rows={3}
          maxLength={120}
          className="p-2 rounded-md border border-gray-300"
          placeholder='Enter Text here'
        />

        {/* NEW: Text Color Picker */}
        <label className="text-lg font-bold">Text Color</label>
        <input
          type="color"
          {...register('textColor')}
          className="w-16 h-10 border-2 rounded"
        />

        <button className="bg-indigo-600 hover:bg-indigo-800 text-white p-2 rounded-xl cursor-pointer">
          Submit
        </button>
      </form>

      <div
        className="col-span-1 md:col-span-2 relative flex justify-center items-center border-4 border-dashed rounded-xl p-4 bg-white/70"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center gap-5">
          <div className="text-center text-gray-600">Drop an image here or upload below</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="relative w-80 h-80 border border-gray-400 rounded overflow-hidden">
            {image ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  ref={imagePreview}
                  src={image}
                  alt="preview"
                  className="object-contain max-w-full max-h-full transition-transform duration-300"
                  style={{
                    transform: submittedData
                      ? `scale(${(submittedData.height / 180 + submittedData.weight / 80) / 2})`
                      : 'scale(1)'
                  }}
                />
                {submittedData && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 text-sm">
                    {submittedData.text.split('\n').map((line, idx) => (
                      <p
                        key={idx}
                        style={{ color: submittedData.textColor }}
                        className="font-bold drop-shadow-lg mb-1 text-center"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <span className="text-gray-400 absolute inset-0 flex items-center justify-center">No Image</span>
            )}
            
          </div>
           <div className=" bg-[#F3E7F7] px-3 py-2 mt-5 rounded shadow text-md text-gray-800">
    Press <strong>Alt + Q</strong> to toggle 3D view
  </div>
        </div>
        
      </div>
      

      {show3D && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center">
          <div className="relative w-[80vw] h-[80vh]">
            <Canvas>
              <Suspense fallback={null}>
                <TShirtModel image={image} text={text} />
              </Suspense>
            </Canvas>
            <button
              onClick={() => setShow3D(false)}
              className="absolute top-4 right-4 bg-white px-4 py-2 rounded text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
     
    </div>
  );
}

export default App;
