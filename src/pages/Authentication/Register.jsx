import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserRegistration = (e) => {
    e.preventDefault();

    if(password === confirmPassword){

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast("User Registered Successfully!")
          // navigate to dashboard
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          console.log(errorCode, errorMessage);
        });
    }else{
      toast.error("Password and Confirm didn't match!")
    }

  };
  return (
    <div className="my-20">
      <h1>Register</h1>

      <form onSubmit={handleUserRegistration} className="flex flex-col align-middle justify-center">
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

        <div>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <br />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border"
            type="password"
            placeholder="**********"
          />
        </div>

        <button type="submit" className="bg-black text-white">Sign Up</button>

        <p>
          Already have an account? <Link to="/auth/login">Login Instead</Link>
        </p>
      </form>
    </div>
  );
}
