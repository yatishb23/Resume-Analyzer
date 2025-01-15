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
<<<<<<< HEAD
import ResumeExamples from "./pages/ResumeExamples";
=======
import { FileProvider } from "./File Provider/FileProvider";
>>>>>>> 0882050735b8a77614d197b7005134fc8398c614

function App() {
  return (
    <ThemeProvider>
<<<<<<< HEAD
      <Router>
        <div className="m-0 p-0">
          <Routes>
            <Route path="/" element={<ResumeChecker />} />
            <Route path="/login" element={<LoginDialog />} />
            <Route path="/signup" element={<SignupDialog />} />
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/writing" element={<WritingResume/>}/>
            <Route path="/summary" element={<ResumeSummary/>}/>
            <Route path="/fitting" element={<PageFitting/>}/>
            <Route path="/examples" element={<ResumeExamples/>}/>
          </Routes>
        </div>
      </Router>
=======
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
>>>>>>> 0882050735b8a77614d197b7005134fc8398c614
    </ThemeProvider>
  );
}

export default App;
