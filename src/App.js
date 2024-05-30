import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [topic, setTopic] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateBlogContent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate', { topic });
      setBlogContent(response.data.content);
    } catch (error) {
      console.error('Error generating blog content:', error);
    }
    setIsLoading(false);
  };

  const postToMedium = async () => {
    try {
      const response = await axios.post('http://localhost:5000/post', { content: blogContent });
      alert('Blog posted successfully!');
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <div className="App">
      <h1>Medium Blog Automation</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter blog topic"
      />
      <button onClick={generateBlogContent} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Blog Content'}
      </button>
      {blogContent && (
        <div>
          <h2>Generated Blog Content</h2>
          <p>{blogContent}</p>
          <button onClick={postToMedium}>Post to Medium</button>
        </div>
      )}
    </div>
  );
}

export default App;
