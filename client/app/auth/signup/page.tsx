"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from "next/navigation";

import useRequest from '../../../hooks/use-request';

interface UserBody {
  email: string;
  password: string;
}

export default function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password } as UserBody,
    onSuccess: () => router.push('/')
  });
  
  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    await doRequest();
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
      
      {errors}
      
      <button className="btn btn-primary w-100">Submit</button>
    </form>
  );
}