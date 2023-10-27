'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
const NavBar = () => {
  const pathname = usePathname();
  const links = [
    {
      id: 1,
      href: '/',
      label: 'Dashboard',
    },
    {
      id: 2,
      href: '/issues/list',
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
            className={classnames({
              'text-zinc-950': link.href === pathname,
              'text-zinc-600': link.href !== pathname,
              'hover:text-zinc-800 transition-colors': true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
