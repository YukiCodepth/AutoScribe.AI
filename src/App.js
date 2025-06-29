import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState("academic");
  const [darkMode, setDarkMode] = useState(false);

  const [summary, setSummary] = useState("");
  const [tasks, setTasks] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [highlights, setHighlights] = useState("");
  const [notes, setNotes] = useState("");

  const toggleMode = () => setDarkMode(!darkMode);
  const handleModeChange = (e) => setMode(e.target.value);

  const handleGenerateSummary = () => {
    let output = "";
    if (mode === "academic") {
      output =
        "This lecture covered concepts on neural networks including transformer models such as BERT and GPT. Students discussed training techniques and the importance of pre-processing. The upcoming topic will be attention mechanisms.";
    } else {
      output =
        "The meeting focused on progress updates, including Raj handling dashboard updates and Sara preparing the client proposal. Follow-up scheduled for Friday to review outcomes.";
    }
    setSummary(output);
  };

  const handleExtractTasks = () => {
    let output = "";
    if (mode === "academic") {
      output = `- Review assigned paper by Friday
- Submit sentiment analysis project by next week
- Prepare for Monday's class on attention
- Raj updates slides
- Kriti compiles questions`;
    } else {
      output = `- Raj to update the dashboard
- Sara to send proposal
- Prepare for Friday meeting review`;
    }
    setTasks(output);
  };

  const handleFindDeadlines = () => {
    let output = "";
    if (mode === "academic") {
      output = `- Review paper: Due Friday
- Project submission: Next week
- Lecture on attention: Monday`;
    } else {
      output = `- Client proposal: Send this week
- Dashboard update: Thursday
- Next review: Friday`;
    }
    setDeadlines(output);
  };

  const handleFindHighlights = () => {
    let output = "";
    if (mode === "academic") {
      output = `- Transformers: BERT, GPT
- NLP applications
- Attention mechanisms
- Data pre-processing importance`;
    } else {
      output = `- Client proposal discussions
- Team accountability
- Follow-up timeline`;
    }
    setHighlights(output);
  };

  const handleExport = () => {
    const content = `Summary\n${summary}\n\nTasks\n${tasks}\n\nDeadlines\n${deadlines}\n\nHighlights\n${highlights}\n\nPersonal Notes\n${notes}`;
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "AutoScribe_Notes.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <h1 className="title">AutoScribe.AI</h1>

      <div className="controls">
        <button onClick={toggleMode}>Toggle {darkMode ? "Light" : "Dark"} Mode</button>
        <label>
          <input type="radio" value="academic" checked={mode === "academic"} onChange={handleModeChange} />
          Academic
        </label>
        <label>
          <input type="radio" value="business" checked={mode === "business"} onChange={handleModeChange} />
          Business
        </label>
      </div>

      <textarea
        placeholder="Paste your transcript here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={8}
      />

      <div className="button-row">
        <button onClick={handleGenerateSummary}>Generate Summary</button>
        <button onClick={handleExtractTasks}>Extract Tasks</button>
        <button onClick={handleFindDeadlines}>Find Deadlines</button>
        <button onClick={handleFindHighlights}>Get Highlights</button>
        <button onClick={handleExport}>Export Notes</button>
      </div>

      <div className="results">
        <h2>Summary</h2>
        <p>{summary}</p>
        <h2>Tasks</h2>
        <pre>{tasks}</pre>
        <h2>Deadlines</h2>
        <pre>{deadlines}</pre>
        <h2>Highlights</h2>
        <pre>{highlights}</pre>
        <h2>Personal Notes</h2>
        <textarea
          placeholder="Add your own notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <footer className="footer">
        <p>Made by Aman Kumar | BTech ECE CORE, SRM Institute of Science and Technology</p>
        <p>Email: ak2465@srmist.edu.in</p>
        <p>
          <a href="https://github.com/YukiCodepth" target="_blank" rel="noopener noreferrer">GitHub</a> |{" "}
          <a href="https://www.linkedin.com/in/aman-kumar-429086299/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
