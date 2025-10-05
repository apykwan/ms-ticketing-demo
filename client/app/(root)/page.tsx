import { cookies } from 'next/headers';

import buildClient from '../api/build-client';

export default async function LandingPage() {
  const cookieStore = await cookies(); 
  const sessionValue = cookieStore.get('session')?.value;
  
  const { data } =  await (await buildClient(sessionValue)).get('/api/users/currentuser');
  const currUser = data.currentUser;
  return (
    <div>
      <h1 className="text-primary">Landing Page</h1>
      <h2>User
        <span className="text-info mx-3">{currUser ? currUser.email : 'unknown'}</span>
      </h2>
    </div>
  );
}