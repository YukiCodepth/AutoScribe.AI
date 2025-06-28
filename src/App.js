import React, { useState } from 'react';
import './index.css';

function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [tasks, setTasks] = useState('');
  const [deadlines, setDeadlines] = useState('');
  const [highlights, setHighlights] = useState('');
  const [notes, setNotes] = useState('');
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('academic');

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const generateSummary = () => {
    const sentences = transcript
      .split('.')
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 2);

    const base = sentences.join(', ') + '.';
    setSummary(
      mode === 'academic'
        ? `Abstract: This discussion addressed topics such as ${base}`
        : `Summary: Key business outcomes included ${base}`
    );
  };

  const generateTasks = () => {
    const actionWords = [
      'will', 'must', 'need to', 'should', 'plans to', 'is', 'are', 'was', 'were'
    ];
    const lines = transcript
      .split('.')
      .map(s => s.trim())
      .filter(line =>
        actionWords.some(w => line.toLowerCase().includes(w))
      );

    setTasks(
      lines.map(task =>
        mode === 'academic'
          ? `• As noted: ${task.charAt(0).toUpperCase() + task.slice(1)}`
          : `• ${task.charAt(0).toUpperCase() + task.slice(1)}`
      ).join('\n')
    );
  };

  const extractDeadlines = () => {
    const deadlineKeywords = ['by', 'before', 'due', 'deadline', 'submit'];
    const lines = transcript
      .split('.')
      .map(s => s.trim())
      .filter(line =>
        deadlineKeywords.some(k => line.toLowerCase().includes(k))
      );

    setDeadlines(lines.map(dl => `• ${dl}`).join('\n'));
  };

  const extractHighlights = () => {
    const keywords = ['important', 'key', 'notable', 'remember', 'highlight'];
    const lines = transcript
      .split('.')
      .map(s => s.trim())
      .filter(line =>
        keywords.some(k => line.toLowerCase().includes(k))
      );

    setHighlights(lines.map(hl => `• ${hl}`).join('\n'));
  };

  const exportAsText = () => {
    const content = `
AutoScribe.AI Export
======================

Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}

Transcript:
${transcript}

${mode === 'academic' ? 'Abstract' : 'Summary'}:
${summary}

Action Items:
${tasks}

Deadlines:
${deadlines}

Highlights:
${highlights}

Personal Notes:
${notes}
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AutoScribe_Export.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`container ${theme}`}>
      <h1 className="title">AutoScribe.AI</h1>

      <div className="controls">
        <button onClick={handleThemeToggle}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>

        <div className="mode-switch">
          <label>
            <input
              type="radio"
              value="academic"
              checked={mode === 'academic'}
              onChange={handleModeChange}
            />
            Academic
          </label>
          <label>
            <input
              type="radio"
              value="business"
              checked={mode === 'business'}
              onChange={handleModeChange}
            />
            Business
          </label>
        </div>
      </div>

      <textarea
        className="transcript-box"
        placeholder="Paste your transcript here..."
        rows="8"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <div className="button-group">
        <button onClick={generateSummary}>Generate Summary</button>
        <button onClick={generateTasks}>Extract Tasks</button>
        <button onClick={extractDeadlines}>Find Deadlines</button>
        <button onClick={extractHighlights}>Find Highlights</button>
        <button onClick={exportAsText}>Export Notes</button>
      </div>

      <div className="result-section">
        <h2>{mode === 'academic' ? 'Abstract' : 'Summary'}</h2>
        <p>{summary}</p>

        <h2>Action Items</h2>
        <pre>{tasks}</pre>

        <h2>Deadlines</h2>
        <pre>{deadlines}</pre>

        <h2>Highlights</h2>
        <pre>{highlights}</pre>

        <h2>Personal Notes</h2>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your own notes here..."
        />
      </div>
    </div>
  );
}

export default App;
