import React, { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <nav>
        <h1>Dark Mode Example</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
      <main>
        <p>Welcome to the Dark Mode implementation in React!</p>
      </main>
    </div>
  );
}

export default App;
