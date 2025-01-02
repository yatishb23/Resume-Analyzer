import { useState } from "react";
import { Link ,useNavigate} from "react-router";
import { useTheme } from "../theme";

export function SignupDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false); 
  const { theme, toggleTheme } = useTheme();
  const navigate=useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call)
    console.log("Logging in with:", { email, password });
    navigate("/")
  };

  return (
      <div className={`inset-0 h-screen w-screen flex justify-center items-center 
    ${
      theme === "light"
        ? "bg-gradient-to-tl from-[#ebe6f8] to-[#fefefe] "
        : "bg-gradient-to-tl from-[#232238] to-[#3c3c4f]"
    }`}>
        <div className="max-w-7xl px-6 md:px-8 py-4 md:py-8 w-full">
          <div className={`${
            theme === "light" ? "bg-white" : "bg-black-500"
          } p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto`}>
            <div className="max-w-sm mx-auto">
              <h1 className="text-2xl font-semibold text-center mb-8">
                Create your account
              </h1>

              <div className="space-y-4 gap-2">
                <button className={`flex items-center justify-center gap-2 w-full border rounded-lg px-3 py-3 ${
                  theme === "dark" ? "border-purple-600" : ""
                } hover:bg-gray-50`}>
                  <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
                <button className={`flex items-center justify-center gap-2 w-full border rounded-lg px-3 py-3 ${
                  theme === "dark" ? "border-purple-600" : ""
                } hover:bg-gray-50`}>
                  <img src="/google.png" alt="Google" className="w-5 h-5" />
                  <span>Google</span>
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <input
                    type="Text"
                    placeholder="Your name"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    theme === "dark"
                      ? "border-black-400 bg-black-500 text-white"
                      : ""
                  }`}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    theme === "dark"
                      ? "border-black-400 bg-black-500 text-white"
                      : ""
                  }`}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    theme === "dark"
                      ? "border-black-400 bg-black-500 text-white"
                      : ""
                  }`}
                  />
                </div>

                {/* Checkbox for Terms and Privacy Policy */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="h-5 w-5"
                    required
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    I agree to{" "}
                    <a href="#" className="text-purple-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="button"
                  className={`w-full  text-white rounded-lg py-2 ${
                  theme==='dark'
                  ?"bg-black-700 border border-purple-600"
                  :"bg-black-600  hover:bg-black-500"
                }`}
                  onClick={handleLogin}
                  disabled={!agreed}
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center space-y-2">
                <p className={` ${
                theme==='dark'
                ?"text-white"
                :"text-gray-600"
              }`}>
                Already have an account?{" "}
                  <a href="#" className="text-purple-600 hover:underline">
                    <Link to="/login">Log In</Link>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
