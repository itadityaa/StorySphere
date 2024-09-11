import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div className="w-full mx-auto h-screen bg-bgPrimary">
      <h2 className="text-2xl font-semibold mx-auto w-full text-center pt-40 text-accentSecondary">
        Register Here
      </h2>
      <form className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          type="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the 'email' state when the input value changes
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-bgSecondary focus:outline-none px-4 py-2 rounded-sm"
          placeholder="Password"
          required
        />
        {message && <p className="text-accentSeconday">{message}</p>}
        <button type="submit" className="button-utility-class">
          Register
        </button>
      </form>
      <p className="text-center text-accentSecondary p-5">
        Already have an account?{" "}
        <Link to="/login" className="text-accentPrimary text-medium italic">
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default Register;
