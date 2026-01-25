'use client';

import Link from 'next/link';

import { useCurrUser } from '@/contexts/current-user-context';

export default function Header() {
  const { currUser } = useCurrUser();

  const links = [
    !currUser && { label: 'Sign Up', href: '/auth/signup' },
    !currUser && { label: 'Sign In', href: '/auth/signin' },
    currUser && { label: 'Sell Tickets', href: '/tickets/new'},
    currUser && { label: 'My Orders', href: '/orders'},
    currUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return <li key={href} className="mx-3">
        <Link href={href} className="nav-link">{label}</Link>
      </li>
    });
  return (
    <nav className="d-flex align-items-center justify-content-between navbar navbar-light bg-light p-2 mb-3">
      <Link href="/" className="navbar-brand text-success fw-bold">
        TICKET
      </Link>
      <div className="d-flex align-items-center justify-content-end">
        {currUser && <span className="text-info mx-3">{currUser.email.split('@')[0]}</span>}
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
}