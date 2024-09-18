import React from 'react';
import { Link } from 'react-router-dom';

function IndexAuth() {
  console.log('Rendering IndexAuth');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our App!</h1>
      <p className="mb-4">This is the introduction page.</p>
      <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Next</Link>
    </div>
  );
}

export default IndexAuth;
