import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const isAuthenticated: boolean = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Creating account...");

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      const token: string | undefined = res.data?.token;

      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("No token received ❌");
        return;
      }

      // 🔥 Save token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.dismiss(loadingToast);
      toast.success("Account created 🎉");

      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Register failed ❌");
      } else {
        toast.error("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Create Account 🚀
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Join your app today
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Juan Dela Cruz"
              className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="test@email.com"
              className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2 text-gray-400 text-sm">
          <div className="flex-1 h-[1px] bg-white/10" />
          OR
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
