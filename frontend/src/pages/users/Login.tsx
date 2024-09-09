import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loginUser, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userDetails = { email, password };
    try {
      const response = await loginUser(userDetails).unwrap();
      console.log(response);

      const { token, user } = response;
      dispatch(setUser({ user }));
      alert(`Welcome back, ${user.userName}`);
      navigate("/");
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="w-full mx-auto h-screen bg-bgPrimary">
      <h2 className="text-2xl font-semibold mx-auto w-full text-accentPrimary text-center">
        Login Here
      </h2>
      <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          type="email"
          value={email}
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && (
          <p className="text-accentSecondary text-center font-medium text-xl">
            {message}
          </p>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-accentSecondary text-bgPrimary py-2 rounded-sm hover:rounded-md hover:text-bgSecondary transition-all ease-in-out duration-300"
        >
          Login
        </button>
      </form>
      <p className="text-center text-accentSecondary p-5">
        Don't have an account?{" "}
        <Link to="/register" className="text-accentPrimary text-medium italic">
          Register Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
