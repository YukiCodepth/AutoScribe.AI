import React, { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [tasks, setTasks] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const simulateTranscription = () => {
    setTranscript(
      "Welcome everyone. First, Raj will update the UI design by Thursday. Sara is preparing the client proposal. We'll review progress in Friday's meeting."
    );
  };

  const simulateSummary = () => {
    setSummary(
      "Summary: Key points from the meeting included project deadlines, roles, and client feedback."
    );
  };

  const simulateTasks = () => {
    setTasks(`- Follow up with client
- Prepare report
- Schedule next meeting`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    if (file) {
      alert(
        "Audio file uploaded: " +
          file.name +
          "\\nSimulated transcription will follow when you click Transcribe."
      );
    }
  };

  return (
    <div className="container">
      <h1>AutoScribe.AI</h1>

      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <textarea
        placeholder="Upload or paste transcript..."
        rows="5"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <div>
        <button onClick={simulateTranscription}>Transcribe</button>
        <button onClick={simulateSummary}>Summarize</button>
        <button onClick={simulateTasks}>Extract Tasks</button>
      </div>

      <div className="result-section">
        <h2>Transcript</h2>
        <p>{transcript}</p>

        <h2>Summary</h2>
        <p>{summary}</p>

        <h2>Action Items</h2>
        <div>
          {tasks.split('\n').map((task, idx) => (
            <p key={idx}>• {task}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
