import { cookies } from 'next/headers';
import axios from 'axios';

export default async function LandingPage() {
  const cookieStore = await cookies(); 
  const sessionValue = cookieStore.get('session')?.value;

  console.log('Session value:', sessionValue);

  if (!sessionValue) {
    return <h1>Hello Guest (No session cookie)</h1>;
  }

  try {
    const res = await axios.get('http://auth-srv:3000/api/users/currentuser', {
      headers: {
        Cookie: `session=${sessionValue}`, 
      },
    });

    const currentUser = res.data.currentUser;
    return <h1>Hello {currentUser?.email || 'Guest'}</h1>;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return <h1>Hello Guest (API Error)</h1>;
  }
}