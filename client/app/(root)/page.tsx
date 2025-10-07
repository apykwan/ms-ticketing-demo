import getCurrentUser from '../api/get-current-user';

export default async function LandingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <h1 className="text-primary">Landing Page</h1>
      {currentUser ? <h2>Welcome {currentUser.email}</h2> : 'unknown'}
    </div>
  );
}