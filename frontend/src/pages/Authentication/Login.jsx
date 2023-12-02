import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/Auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast("Logged in successfully!");
          navigate("/dashboard");
          setUser(userCredential.user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <div className="my-20">
      <h1>Login</h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col align-middle justify-center"
      >
        <div>
          <label htmlFor="Email">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border"
            type="email"
            placeholder="john@doe.com"
          />
        </div>

        <div>
          <label htmlFor="Password">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border"
            type="password"
            placeholder="**********"
          />
        </div>

        <Link to="/auth/recovery">Forgot Password?</Link>
        <button type="submit" className="bg-black text-white">
          Sign In
        </button>

        <p>
          Don&apos;t have an account? <Link to="/auth/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
