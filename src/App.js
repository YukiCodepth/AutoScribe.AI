import React, { useState } from 'react';
import './index.css';

function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [tasks, setTasks] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('business');

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
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
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 2);

    let summaryOutput = "";

    if (mode === 'business') {
      summaryOutput =
        "Summary: Key points from the meeting included " + sentences.join(', ') + '.';
    } else if (mode === 'academic') {
      summaryOutput =
        "Abstract: This discussion addressed themes such as " + sentences.join(', ') + '.';
    }

    setSummary(summaryOutput);
  };

  const simulateTasks = () => {
    if (!transcript.trim()) return;

    const actionKeywords = [
      'will', 'must', 'need to', 'should',
      'is going to', 'plans to', 'is', 'are',
      'was', 'were'
    ];

    const sentences = transcript
      .split('.')
      .map(s => s.trim())
      .filter(s =>
        actionKeywords.some(keyword =>
          s.toLowerCase().includes(keyword)
        )
      );

    const formattedTasks = sentences.map(task =>
      mode === 'academic'
        ? `• As noted: ${task.charAt(0).toUpperCase() + task.slice(1)}`
        : `• ${task.charAt(0).toUpperCase() + task.slice(1)}`
    );

    setTasks(formattedTasks.join('\n'));
  };

  return (
    <div className={`container ${theme}`}>
      <h1>AutoScribe.AI</h1>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleThemeToggle}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label><strong>Mode:</strong></label>
        <label>
          <input
            type="radio"
            value="business"
            checked={mode === 'business'}
            onChange={handleModeChange}
          />
          Business
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="academic"
            checked={mode === 'academic'}
            onChange={handleModeChange}
          />
          Academic
        </label>
      </div>

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
        <h2>{mode === 'academic' ? 'Abstract' : 'Summary'}</h2>
        <p>{summary}</p>

        <h2>Action Items</h2>
        <div>
          {tasks.split('\n').map((task, idx) => (
            <p key={idx}>{task.replace(/^[-•]\s*/, '• ')}</p>
          ))}
        </div>

        <h2>Transcript</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
