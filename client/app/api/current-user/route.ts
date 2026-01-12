import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import buildClient from '../build-client'; 

export async function GET() {
  const cookieStore = await cookies(); 
  const sessionValue = cookieStore.get('session')?.value;

  interface CurrentUserResponse {
    currentUser: {
      id: string;
      email: string;
    } | null;
  }

  let currentUser = null;

  if (sessionValue) {
    const client = buildClient(sessionValue);
  
    const { data } = await client.get<CurrentUserResponse>('/api/users/currentuser');
    currentUser = data.currentUser;
  }

  return NextResponse.json({ currentUser });
}