import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authAPI";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        userName,
        email,
        password,
      }).unwrap();

      alert("User registered successfully");
      setEmail("");
      setPassword("");
      setUserName("");
      navigate("/login");
    } catch (error) {
      console.error("Failed to register the user:", error);
    }
  };

  return (
    <div className="w-full mx-auto h-screen bg-bgPrimary">
      <h2 className="text-2xl font-semibold mx-auto w-full text-center pt-40 text-accentSecondary">
        Register Here
      </h2>
      <form
        onSubmit={handleRegister}
        className="space-y-5 max-w-sm mx-auto pt-8"
      >
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
