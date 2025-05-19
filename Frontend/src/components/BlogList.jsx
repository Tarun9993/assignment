import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../services/blogService';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
        <button
          onClick={() => navigate('/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          + New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        blogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white shadow-md p-6 rounded-lg mb-4 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-3">
              {blog.content.length > 150 ? `${blog.content.slice(0, 150)}...` : blog.content}
            </p>
            <p className="text-sm mb-3">
              <strong>Status:</strong>{' '}
              <span className={blog.published ? 'text-green-600' : 'text-yellow-600'}>
                {blog.published ? 'Published' : 'Draft'}
              </span>
            </p>
            <button
              onClick={() => navigate(`/edit/${blog.id}`)}
              className="text-blue-500 hover:underline"
            >
              Edit Blog
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
