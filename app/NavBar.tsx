'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Skeleton from '@/app/components/Skeleton';
import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from '@radix-ui/themes';
const NavBar = () => {
  return (
    <nav className="py-3 border-b px-5 mb-5">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug className="text-2xl" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;

const NavLinks = () => {
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
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.id}>
          <Link
            href={link.href}
            className={classnames({
              'nav-link': true,
              '!text-zinc-950': link.href === pathname,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="3"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
