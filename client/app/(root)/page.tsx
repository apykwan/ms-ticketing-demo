import { cookies } from 'next/headers';

import buildClient from '../api/build-client';

export default async function LandingPage() {
  const cookieStore = await cookies(); 
  const sessionValue = cookieStore.get('session')?.value;

  let currUser = null;
  if (sessionValue) {
    const client = buildClient(sessionValue);
  
    const { data } =  await client.get('/api/users/currentuser');
    currUser = data.currentUser;
  }
  
  if (!currUser) {
    return <h1 className="text-danger">You are not SIGN IN</h1>
  }
  return (
    <div>
      <h1 className="text-primary">Landing Page</h1>
      <h2>User
        <span className="text-info mx-3">{currUser ? currUser.email : 'unknown'}</span>
      </h2>
    </div>
  );
}