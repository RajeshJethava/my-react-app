import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";


Sentry.init({
  dsn: "https://df38a4953ba1df9595010e238af7274f@o4509190620053504.ingest.us.sentry.io/4509201741185024",
  integrations: [Sentry.replayIntegration({ 
    maskAllText: false,
    blockAllMedia: false,
    maskAllInputs: false, 
  })],
  // Session Replay
  replaysSessionSampleRate: 0.1, // Adjust sample rate for development/production
  replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors,
  
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
