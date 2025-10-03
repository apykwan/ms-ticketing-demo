'use client';

import { useCurrentUser } from '../hooks/use-current-user';

export default function LandingPage() {
  const currentUser = useCurrentUser();

  console.log(currentUser);
  return (
    <h1 className="text-success">Landing Page</h1>
  );
}