
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/new" element={<BlogEditor />} />
      <Route path="/edit/:id" element={<BlogEditor />} />
    </Routes>
    <ToastContainer />
  </Router>
);

export default App;