// Import React library for creating components and hooks
import React from "react";

// Import ReactDOM library for rendering React components in a browser
import ReactDOM from "react-dom/client";

// Import the CSS stylesheet for styling the React components
import "./index.css";

// Import the App component, which is the main component of the application
import App from "./components/App";

// Import the QuizProvider component, which provides the QuizContext to the App component
import { QuizProvider } from "./contexts/QuizContext";

// Create a root element in the browser's DOM for rendering the React components
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the QuizProvider component
// The React.StrictMode component helps detect unexpected side effects in the application
root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
