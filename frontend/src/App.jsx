import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ResumeChecker } from "./components/resume";
import { LoginDialog } from "./components/Logins/Login";
import { SignupDialog } from "./components/Logins/Signup";
import { ThemeProvider } from "./components/theme";
import Feedback from "./components/Feedback";
import WritingResume from "./pages/WritingResume";
import ResumeSummary from "./pages/ResumeSummary";
import PageFitting from "./pages/PageFitting";
import { FileProvider } from "./File Provider/FileProvider";

function App() {
  return (
    <ThemeProvider>
      <FileProvider>
        <Router>
          <div className="m-0 p-0">
            <Routes>
              <Route path="/" element={<ResumeChecker />} />
              <Route path="/login" element={<LoginDialog />} />
              <Route path="/signup" element={<SignupDialog />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/writing" element={<WritingResume />} />
              <Route path="/summary" element={<ResumeSummary />} />
              <Route path="/fitting" element={<PageFitting />} />
            </Routes>
          </div>
        </Router>
      </FileProvider>
    </ThemeProvider>
  );
}

export default App;
