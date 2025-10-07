import Link from 'next/link';

interface CurrentUser {
  email: string;
  id: string;
}

export default function Header({ currentUser }: { currentUser: CurrentUser }) {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return <li key={href} className="mx-3">
        <Link href={href} className="nav-link">{label}</Link>
      </li>
    });
  return (
    <nav className="havbar navbar-light bg-light p-2">
      <Link href="/" className="navbar-brand">
        Ticket
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
}