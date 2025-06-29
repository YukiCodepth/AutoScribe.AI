import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("academic");
  const [theme, setTheme] = useState("light");
  const [summary, setSummary] = useState("");
  const [actions, setActions] = useState("");
  const [showAbout, setShowAbout] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.body.className = theme === "light" ? "dark" : "light";
  };

  const handleGenerate = () => {
    if (!input.trim()) return;

    const isAcademic = mode === "academic";
    const summary = isAcademic
      ? `This lecture discussed key points such as AI fundamentals, supervised vs unsupervised learning, and model accuracy trade-offs.`
      : `The meeting covered upcoming deliverables, client proposals, and internal policy updates.`;

    const actions = isAcademic
      ? `• Priya to submit lab report by Friday\n• Ravi to prepare workshop slides\n• Review session on Monday`
      : `• Sara to send client proposal by Wednesday\n• Kunal updating security policies\n• Review meeting on Friday`;

    setSummary(summary);
    setActions(actions);
  };

  const handleExport = () => {
    const content = `
AutoScribe.AI Export

Mode: ${mode.toUpperCase()}

Summary:
${summary}

Action Items:
${actions}

---

Generated using AutoScribe.AI by Aman Kumar (SRM Institute of Science and Technology)
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "autoscribe_summary.txt";
    link.href = url;
    link.click();
  };

  return (
    <div className="container">
      {/* Banner */}
      <div className="banner">
        AutoScribe.AI – Context-Aware Summarization for Academia & Business
      </div>

      {/* Mode Toggle */}
      <div className="controls">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="academic">Academic</option>
          <option value="business">Business</option>
        </select>
        <button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"} Mode</button>
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleExport}>Export</button>
        <button onClick={() => setShowAbout(true)}>About the Developer</button>
      </div>

      {/* Transcript Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your transcript here..."
        rows={8}
      />

      {/* Output */}
      <div className="output">
        <h2>Summary</h2>
        <p>{summary}</p>
        <h2>Action Items</h2>
        <p>{actions}</p>
      </div>

      {/* Footer */}
      <footer>
        <p>Developed by <strong>Aman Kumar</strong></p>
        <p>BTech ECE CORE, SRM Institute of Science and Technology</p>
        <a href="https://github.com/YukiCodepth" target="_blank">GitHub</a> | <a href="https://www.linkedin.com/in/aman-kumar-429086299/" target="_blank">LinkedIn</a>
        <img src="/college-stamp.svg" alt="SRM Stamp" />
      </footer>

      {/* About Modal */}
      {showAbout && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setShowAbout(false)}>×</button>
            <h3>About the Developer</h3>
            <p><strong>Aman Kumar</strong><br />BTech ECE CORE<br />SRM Institute of Science and Technology, Kattankulathur, Chennai</p>
            <p>Project built for IBM AI & Automation Unpacked Hackathon 2025</p>
            <a href="https://github.com/YukiCodepth" target="_blank">GitHub</a> | <a href="https://www.linkedin.com/in/aman-kumar-429086299/" target="_blank">LinkedIn</a>
          </div>
        </div>
      )}
    </div>
  );
}
