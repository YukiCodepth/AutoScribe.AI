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

    const summary = mode === "academic"
      ? "This lecture covered AI principles, supervised learning, and model evaluation techniques."
      : "This meeting discussed project deadlines, client updates, and security policy changes.";

    const actions = mode === "academic"
      ? "• Submit assignment by Thursday\n• Prepare for Monday’s quiz"
      : "• Sara to email client by Friday\n• Kunal to update documentation";

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
Email: iamankr886@gmail.com
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
      <div className="banner">
        AutoScribe.AI – Context-Aware Summarization for Academia & Business
      </div>

      <div className="controls">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="academic">Academic</option>
          <option value="business">Business</option>
        </select>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleExport}>Export</button>
        <button onClick={() => setShowAbout(true)}>About</button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your transcript here..."
        rows={8}
      />

      <div className="output">
        <h2>Summary</h2>
        <p>{summary}</p>
        <h2>Action Items</h2>
        <p>{actions}</p>
      </div>

      <footer>
        <div className="footer-text">
          <p><strong>Aman Kumar</strong> – BTech ECE CORE</p>
          <p>SRM Institute of Science and Technology, Kattankulathur, Chennai</p>
          <p>
            <a href="mailto:iamankr886@gmail.com">iamankr886@gmail.com</a> |
            <a href="https://github.com/YukiCodepth" target="_blank" rel="noreferrer"> GitHub</a> |
            <a href="https://www.linkedin.com/in/aman-kumar-429086299/" target="_blank" rel="noreferrer"> LinkedIn</a>
          </p>
        </div>
        <img src="/college-stamp.png" alt="SRM Logo" className="footer-logo" />
      </footer>

      {showAbout && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setShowAbout(false)}>×</button>
            <h3>About the Developer</h3>
            <p><strong>Aman Kumar</strong><br />BTech ECE CORE<br />SRM Institute of Science and Technology</p>
            <p>Email: <a href="mailto:iamankr886@gmail.com">iamankr886@gmail.com</a></p>
            <p>Hackathon: IBM AI & Automation Unpacked Hackathon 2025</p>
            <a href="https://github.com/YukiCodepth" target="_blank" rel="noreferrer">GitHub</a> |{" "}
            <a href="https://www.linkedin.com/in/aman-kumar-429086299/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      )}
    </div>
  );
}
