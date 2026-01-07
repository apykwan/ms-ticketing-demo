'use client';

import { useCurrUser } from '@/contexts/current-user-context';

export default function LandingPage() {
  const { currUser: currentUser } = useCurrUser();

  return (
    <div>
      <h1 className="text-primary">Landing Page</h1>
      {currentUser ? <h2>Welcome {currentUser.email}</h2> : 'Not log in'}
    </div>
  );
}