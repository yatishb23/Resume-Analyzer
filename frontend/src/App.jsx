import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ResumeChecker } from "./components/resume";
import { LoginDialog } from "./components/Logins/Login";
import { SignupDialog } from "./components/Logins/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/" element={<ResumeChecker />} />
          <Route path="/login" element={<LoginDialog />} />
          <Route path="/signup" element={<SignupDialog />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
