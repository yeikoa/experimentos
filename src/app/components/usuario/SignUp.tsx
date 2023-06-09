'use client'
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/app";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, fbError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset the error before trying to submit the form
    if (error) setError("");

    // Check passwords match
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check password format
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$/gm;

    if (!passwordRegex.test(signUpForm.password)) {
      setError(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        name="email"
        placeholder="email"
        type="email"
        onChange={handleChange}
      />
      <input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={handleChange}
      />
      <input
        required
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading} //Cuando esta cargando se usa el disabled
      >
        Sign Up
      </button>
      {(error || fbError) && <text>{error || fbError?.message}</text>}
    </form>
  );
};

export default SignUp;
