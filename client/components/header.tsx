'use client';

import Link from 'next/link';

import { useCurrUser } from '@/contexts/current-user-context';

export default function Header() {
  const { currUser } = useCurrUser();

  console.log('current user', currUser);
  const links = [
    !currUser && { label: 'Sign Up', href: '/auth/signup' },
    !currUser && { label: 'Sign In', href: '/auth/signin' },
    currUser && { label: 'Sign Out', href: '/auth/signout' },
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