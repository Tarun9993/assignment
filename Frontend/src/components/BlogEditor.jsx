import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveDraft, publishBlog, getBlogById } from '../services/blogService';
import { toast } from 'react-toastify';

const BlogEditor = () => {
  const [blog, setBlog] = useState({ title: '', content: '', tags: '', published: false });
  const [lastSaved, setLastSaved] = useState(null);
  const timeoutRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogById(id).then(res => setBlog(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => handleAutoSave(), 5000);
  };

  const handleAutoSave = () => {
    saveDraft(blog).then(() => {
      setLastSaved(new Date());
      toast.info('Auto-saved');
    });
  };

  useEffect(() => {
    const interval = setInterval(handleAutoSave, 30000);
    return () => clearInterval(interval);
  }, [blog]);

  const handlePublish = () => {
    saveDraft(blog).then(res => {
      publishBlog(res.data.id).then(() => {
        toast.success('Published');
        navigate('/');
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{id ? 'Edit Blog' : 'New Blog'}</h1>

      <input
        name="title"
        value={blog.title}
        onChange={handleChange}
        placeholder="Blog Title"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="content"
        value={blog.content}
        onChange={handleChange}
        placeholder="Write your blog content here..."
        className="w-full p-3 h-60 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      <input
        name="tags"
        value={blog.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {lastSaved && (
        <p className="text-sm text-gray-500 mb-4">Last saved at: {lastSaved.toLocaleTimeString()}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleAutoSave}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;