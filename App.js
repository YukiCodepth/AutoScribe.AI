import React, { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [tasks, setTasks] = useState('');

  const simulateTranscription = () => {
    setTranscript('This is a simulated transcript from Granite 3.3 Speech.');
  };

  const simulateSummary = () => {
    setSummary('Summary: Key points from the meeting included project deadlines, roles, and client feedback.');
  };

  const simulateTasks = () => {
    setTasks('- Follow up with client\n- Prepare report\n- Schedule next meeting');
  };

  return (
    <div>
      <h1>AutoScribe.AI</h1>
      <textarea placeholder="Upload or paste transcript..." rows="5" />
      <div>
        <button onClick={simulateTranscription}>Transcribe</button>
        <button onClick={simulateSummary}>Summarize</button>
        <button onClick={simulateTasks}>Extract Tasks</button>
      </div>
      <div>
        <h2>Transcript</h2>
        <p>{transcript}</p>
        <h2>Summary</h2>
        <p>{summary}</p>
        <h2>Action Items</h2>
        <pre>{tasks}</pre>
      </div>
    </div>
  );
}

export default App;
