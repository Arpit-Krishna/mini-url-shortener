import { useState } from 'react';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [expireIn, setExpireIn] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [code, setCode] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    setShortUrl('');
    try {
      const payload = { url: longUrl };
      if (expireIn) payload.expireIn = parseInt(expireIn);

      const res = await axios.post('http://localhost:5000/shorten', payload);
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleAnalytics = async () => {
    setError('');
    setAnalytics(null);
    try {
      const res = await axios.get(`http://localhost:5000/analytics/${code}`);
      setAnalytics(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dummy URL Shortener</h1>

      <h3>Shorten a URL</h3>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: '300px', marginRight: '0.5rem' }}
      />
      <input
        type="number"
        placeholder="Expiry days (optional)"
        value={expireIn}
        onChange={(e) => setExpireIn(e.target.value)}
        style={{ width: '150px', marginRight: '0.5rem' }}
      />
      <button onClick={handleShorten}>Shorten</button>

      {shortUrl && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Short URL:</strong>{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>Check Analytics</h3>
      <input
        type="text"
        placeholder="Enter code (e.g., abc123)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: '200px', marginRight: '0.5rem' }}
      />
      <button onClick={handleAnalytics}>Get Analytics</button>

      {analytics && (
        <pre
          style={{
            color: 'black',
            background: '#f0f0f0',
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: '4px',
          }}
        >
          {JSON.stringify(analytics, null, 2)}
        </pre>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default App;
