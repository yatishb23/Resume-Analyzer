import { useState } from "react";
import { Link ,useNavigate} from "react-router";
export function LoginDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    navigate("/")
  };

  return (
    <div className="inset-0 h-screen w-screen flex justify-center items-center bg-gradient-to-tl from-[#ebe6f8] to-[#fefefe]">
      <div className="max-w-7xl px-6 md:px-8 py-4 md:py-8 w-full">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-8">
              Sign in to your account
            </h1>
            <div className="space-y-2">
              <button className="flex items-center justify-center gap-2 w-full border rounded-lg px-3 py-3 hover:bg-gray-50">
                <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                <span>LinkedIn</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full border rounded-lg px-4 py-3 hover:bg-gray-50">
                <img src="/google.png" alt="Google" className="w-5 h-5" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full border rounded-lg px-4 py-3 hover:bg-gray-50">
                <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
                <span>Facebook</span>
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  or use your email
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="button"
                className="w-full bg-black-500 text-white rounded-lg py-2 hover:bg-black-600"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <a href="#" className="text-purple-600 hover:underline">
                Forgot your password?
              </a>
              <p className="text-gray-600">
                First time here?{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  <Link to="/signup">Create an account</Link>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
