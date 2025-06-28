import React, { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [tasks, setTasks] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      // Simulate real speech-to-text output
      const simulatedTranscript =
        "Raj will update the dashboard by Thursday. Sara is sending the client proposal. We'll meet again on Friday to review progress.";
      setTranscript(simulatedTranscript);
      alert("Audio file uploaded: " + file.name);
    }
  };

  const simulateSummary = () => {
    if (!transcript.trim()) return;

    const sentences = transcript
      .split('.')
      .filter(s => s.trim().length > 0)
      .slice(0, 2)
      .map(s => s.trim());

    const summaryOutput =
      "Summary: Key points from the meeting included " + sentences.join(', ') + '.';
    setSummary(summaryOutput);
  };

  const simulateTasks = () => {
    if (!transcript.trim()) return;

    const actionKeywords = ['will', 'must', 'need to', 'should', 'is going to', 'plans to'];
    const sentences = transcript
      .split('.')
      .map(s => s.trim())
      .filter(s => actionKeywords.some(keyword => s.toLowerCase().includes(keyword)));

    const formattedTasks = sentences.map(task =>
      task.charAt(0).toUpperCase() + task.slice(1)
    );

    setTasks(formattedTasks.join('\n'));
  };

  return (
    <div className="container">
      <h1>AutoScribe.AI</h1>

      <input
        type="file"
        accept="audio/mp3, audio/mpeg, audio/wav"
        onChange={handleFileChange}
      />

      <textarea
        placeholder="Upload or paste transcript..."
        rows="5"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <div>
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
            <p key={idx}>• {task.replace(/^[-•]\s*/, '')}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
