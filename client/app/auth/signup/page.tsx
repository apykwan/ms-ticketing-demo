"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';

interface CustomErrors {
  errors: {
    message: string;
    field?: string;
  }[];
}

export default function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<CustomErrors['errors']>([]);

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email, password
      });

      console.log(response);
    } catch (err) {
      setErrors(err.response?.data.errors || []);
    }
  }

  return (
    <form 
      className="p-5 mx-auto bg-lite" 
      style={{ width: "500px" }}
      onSubmit={onSubmit}
    >
      <h1 className="mb-3">Sign up</h1>
      <div className="mb-3">
        <label>Email Address</label>
        <input value={email} onChange={handleEmail} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input value={password} onChange={handlePassword} type="password" className="form-control" />
      </div>
      
      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <h4>Ooops...</h4>
          <ul>
            {errors.map(err => (
              <li key={err.field || err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button className="btn btn-primary w-100">Submit</button>
    </form>
  );
}