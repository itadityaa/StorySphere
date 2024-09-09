import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <div className="w-full mx-auto h-screen bg-bgPrimary">
      <h2 className="text-2xl font-semibold mx-auto w-full text-accentPrimary text-center">
        Login Here
      </h2>
      <form className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          type="email"
          value={email}
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Password"
          required
        />
        {message && <p className="text-accentSeconday">{message}</p>}
        <button
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
