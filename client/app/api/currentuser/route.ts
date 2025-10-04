// app/api/currentuser/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Forward the cookie from browser to auth service
  const res = await fetch('http://auth-srv:3000/api/users/currentuser', {
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}