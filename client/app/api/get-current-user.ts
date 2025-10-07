import { cache } from 'react';
import { cookies } from 'next/headers';

import buildClient from './build-client'; 

const getCurrentUser = async () => {
  const cookieStore = await cookies(); 
  const sessionValue = cookieStore.get('session')?.value;

  let currentUser = null;
  if (sessionValue) {
    const client = buildClient(sessionValue);
  
    const { data } =  await client.get('/api/users/currentuser');
    currentUser = data.currentUser;
  }

  return currentUser;
};

export default getCurrentUser;