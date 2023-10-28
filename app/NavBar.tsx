'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Flex, Container } from '@radix-ui/themes';
const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

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
    <nav className="py-3 border-b px-5 mb-5">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug className="text-2xl" />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={classnames({
                      'text-zinc-950': link.href === pathname,
                      'text-zinc-600': link.href !== pathname,
                      'hover:text-zinc-800 transition-colors': true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href="/api/auth/signout">Log out</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
