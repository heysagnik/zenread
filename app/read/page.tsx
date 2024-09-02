"use client";
import './styles.css';
import { useEffect, useState } from 'react';

const Read = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    author: '',
    body: '',
    images: [],
  });

  useEffect(() => {
    // Retrieve data from localStorage
    const data = localStorage.getItem('articleData');
    if (data) {
      const parsedData = JSON.parse(data);
      // Ensure images is an array
      if (!Array.isArray(parsedData.images)) {
        parsedData.images = [];
      }
      // Remove title from body
      if (parsedData.body && parsedData.title) {
        parsedData.body = parsedData.body.replace(new RegExp(parsedData.title, 'gi'), '');
      }
      setArticleData(parsedData);
    }
  }, []);

  return (
    <main className="p-10 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6">{articleData.title}</h1>
      {articleData.author && <p className="text-sm text-gray-600 mb-4">By {articleData.author}</p>}
      <article className="prose prose-lg" dangerouslySetInnerHTML={{ __html: articleData.body || '' }} />
      {articleData.images.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {articleData.images.map((src: string, index: number) => (
              <img key={index} src={src} alt={`Image ${index + 1}`} onError={(e) => e.currentTarget.remove()} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Read;