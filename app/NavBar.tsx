import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
const NavBar = () => {
  const links = [
    {
      id: 1,
      href: '/',
      label: 'Dashboard',
    },
    {
      id: 2,
      href: '/issues',
      label: 'Issies',
    },
  ];
  return (
    <nav className="flex items-center h-14 border-b px-2 md:px-20 space-x-6 mb-5">
      <Link href="/">
        <AiFillBug className="text-2xl" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
