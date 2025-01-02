import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ResumeChecker } from "./components/resume";
import { LoginDialog } from "./components/Logins/Login";
import { SignupDialog } from "./components/Logins/Signup";
import { ThemeProvider } from "./components/theme";
import Feedback from "./components/Feedback";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="m-0 p-0">
          <Routes>
            <Route path="/" element={<ResumeChecker />} />
            <Route path="/login" element={<LoginDialog />} />
            <Route path="/signup" element={<SignupDialog />} />
            <Route path="/feedback" element={<Feedback/>}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

