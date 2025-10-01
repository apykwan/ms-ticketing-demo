"use client";

export default function Signup() {
  return (
    <form className="p-5">
      <h1 className="mb-3">Sign up</h1>
      <div className="mb-3">
        <label>Email Address</label>
        <input className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}