import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export default function AccountRecovery() {
  const [email, setEmail] = useState("");

  const handleAccountRecovery = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Password Reset Email Sent!");
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="my-20">
      <h1>Forgot Password</h1>

      <form
        onSubmit={handleAccountRecovery}
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
        <button type="submit" className="bg-black text-white">
          Recover Account
        </button>

        <p>
          Remember Password <Link to="/auth/login">Login Instead</Link>
        </p>
      </form>
    </div>
  );
}
