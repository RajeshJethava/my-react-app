import React from "react";
import Users from "./Users";
import * as Sentry from "@sentry/react";


Sentry.init({
    dsn: "https://df38a4953ba1df9595010e238af7274f@o4509190620053504.ingest.us.sentry.io/4509201741185024",
    integrations: [
      Sentry.replayIntegration()
    ],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome to the Sentry Demo</h1>
      {/* <button onClick={() => { throw new Error("This is your first error!"); }}>
        Break the world
      </button> */}
      <Users />
    </div>
  );
};

export default App;