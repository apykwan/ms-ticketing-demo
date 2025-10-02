"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(email, password);
  }

  return (
    <form className="p-5 mx-auto" style={{ width: "500px" }}>
      <h1 className="mb-3">Sign up</h1>
      <div className="mb-3">
        <label>Email Address</label>
        <input value={email} onChange={handleEmail} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input value={password} onChange={handlePassword} type="password" className="form-control" />
      </div>
      <button className="btn btn-primary w-100">Sign Up</button>
    </form>
  );
}