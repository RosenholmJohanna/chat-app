import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Header from "./components/Header";
//import * as Sentry from "@sentry/react";
import Register from "./components/Register";
import Layout from "./components/Layout";

// response.set('Document-Policy', 'js-profiling')
// Sentry.init({

//   dsn: import.meta.env.SENTRY_DSN,
//   integrations: [
//     Sentry.browserTracingIntegration(),
//    // Sentry.replayIntegration(),
//   ],
//   // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/], // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });
// setTimeout(() => {
//   throw new Error("Sentry Test Error");
// });

function App() {
  const [sideNavWidth, setSideNavWidth] = useState("200px");

  const closeSidenav = () => {
    setSideNavWidth("0");
  };
  const openSidenav = () => {
    setSideNavWidth("200px");
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                openSidenav={openSidenav}
                closeSidenav={closeSidenav}
                sideNavWidth={sideNavWidth}
              />
            }
          >
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/messages" element={<Chat />} />

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;