import React, { useState } from 'react';

function JobPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const handlePostJob = () => {
    const job = { title, description, location, hourlyRate };
    // Send job data to backend (API call)
    console.log('Job posted:', job);
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handlePostJob}>
        <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="number" placeholder="Hourly Rate" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default JobPost;
